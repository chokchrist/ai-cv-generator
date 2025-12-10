import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const db = new Database('database.sqlite');
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeKey);

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  generationConfig: { responseMimeType: "application/json" }
});

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(cors());
app.use(express.json());

// --- Database Setup ---
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS cvs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    name TEXT NOT NULL,
    data TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id)
  );
`);

// --- Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- Auth Endpoints ---
app.post('/auth/social-login', async (req, res) => {
  const { provider, token } = req.body;
  
  try {
    let email;
    
    if (provider === 'Google') {
      // Verify Google Access Token
      const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const googleData = await googleRes.json();
      if (!googleData.email) throw new Error('Failed to verify Google Token');
      email = googleData.email;
    } else {
      return res.status(400).json({ error: 'Unsupported provider' });
    }

    // Check if user exists, else create
    let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
       const insert = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
       insert.run(email, 'social_login_google_' + Date.now()); // random password
       user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    }
    
    const jwtToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token: jwtToken, email: user.email });
    
  } catch (error) {
    console.error("Social login error:", error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const insert = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    insert.run(email, hashedPassword);
    res.status(201).send({ message: 'User registered' });
  } catch (error) {
    res.status(400).send({ error: 'Email already exists' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, email: user.email });
});

// --- CV Endpoints ---
app.get('/cvs', authenticateToken, (req, res) => {
  const cvs = db.prepare('SELECT * FROM cvs WHERE userId = ? ORDER BY createdAt DESC').all(req.user.id);
  // Parse data string back to JSON
  const parsedCvs = cvs.map(cv => ({ ...cv, data: JSON.parse(cv.data) }));
  res.json(parsedCvs);
});

app.post('/cvs', authenticateToken, (req, res) => {
  const { name, data } = req.body;
  const insert = db.prepare('INSERT INTO cvs (userId, name, data) VALUES (?, ?, ?)');
  const result = insert.run(req.user.id, name, JSON.stringify(data));
  res.json({ id: result.lastInsertRowid });
});

app.delete('/cvs/:id', authenticateToken, (req, res) => {
  const del = db.prepare('DELETE FROM cvs WHERE id = ? AND userId = ?');
  const result = del.run(req.params.id, req.user.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

// --- Serve Static Files (Production) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

// SPA Fallback: Send index.html for any other route
app.get(/.*/, (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/auth') || req.path.startsWith('/cvs') || req.path.startsWith('/generate-cv') || req.path.startsWith('/create-payment-intent')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- Existing API Endpoints ---
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).send({ error: error.message });
  }
});

app.post('/generate-cv', async (req, res) => {
  try {
    const { text, language = 'en' } = req.body;
    
    let langInstruction = "";
    if (language === 'es') langInstruction = "Output MUST be in Spanish (Español). Translate any roles/descriptions.";
    if (language === 'fr') langInstruction = "Output MUST be in French (Français). Translate any roles/descriptions.";
    if (language === 'de') langInstruction = "Output MUST be in German (Deutsch). Translate any roles/descriptions.";
    if (language === 'en') langInstruction = "Output MUST be in English.";

    const prompt = `
    You are an expert CV writer. Extract information and write a professional CV based on the text below.
    ${langInstruction}
    
    Return strict JSON with this schema:
    {
      "personalInfo": {
        "name": "Full Name",
        "title": "Professional Title (Translated)",
        "email": "Email",
        "phone": "Phone",
        "location": "City, Country",
        "summary": "Professional summary (Translated)"
      },
      "experience": [{ "id": 1, "role": "Role (Translated)", "company": "Company", "period": "Period", "description": "Details (Translated)" }],
      "education": [{ "id": 1, "degree": "Degree (Translated)", "school": "School", "period": "Period" }],
      "skills": ["Skill 1 (Translated)"]
    }
    Raw Text: "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cvData = JSON.parse(response.text());
    res.json(cvData);
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
