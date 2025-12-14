import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 md:px-12 glass sticky top-0 z-50">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          AI CV Generator
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="font-semibold text-slate-600 hover:text-indigo-600">Login</button>
          <button onClick={() => navigate('/editor')} className="btn-primary px-6 py-2 rounded-full shadow-lg hover:shadow-indigo-500/20">
            Start Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center overflow-hidden px-6">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900"
        >
          Create your Professional CV <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">in Seconds with AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed"
        >
          Impress recruiters with a resume optimized by artificial intelligence.
          Smart suggestions, ATS-friendly templates, and instant formatting.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/editor')}
          className="btn-primary text-xl px-10 py-4 rounded-full shadow-xl shadow-indigo-500/30 hover:scale-105 transition-transform"
        >
          Generate My CV Now
        </motion.button>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">
                  {step}
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {step === 1 && "Enter your Details"}
                  {step === 2 && "AI Enhances Content"}
                  {step === 3 && "Download PDF"}
                </h3>
                <p className="text-slate-500">
                  {step === 1 && "Simply input your experience and skills or start with a job title."}
                  {step === 2 && "Our AI rewrites your descriptions to sound professional and persuasive."}
                  {step === 3 && "Choose a template and export your polished CV in seconds."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Success Stories</h2>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
            <p className="text-xl italic text-slate-600 mb-6">"I got 3 interviews in my first week using this CV generator. The AI rewrites made my experience sound so much better!"</p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">JS</div>
              <div className="text-left">
                <div className="font-bold">John Smith</div>
                <div className="text-sm text-slate-500">Full Stack Developer</div>
              </div>
            </div>
          </div>
          <p className="mt-8 text-slate-500 font-medium">Trusted by 12,000+ professionals</p>
        </div>
      </section>

      {/* Expert Services */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Looking for a CV manually crafted by an expert, or need a developer to build an app like this for you?
          </p>
          <a href="mailto:contact@example.com" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
            Contact Me for Services
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
