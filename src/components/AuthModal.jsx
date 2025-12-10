import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    try {
      const res = await fetch(`http://localhost:4242${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      if (isLogin) {
        login(data.token, data.email);
        onClose();
      } else {
        setIsLogin(true);
        setError('Account created! Please log in.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('http://localhost:4242/auth/social-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: 'Google',
            token: tokenResponse.access_token
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        login(data.token, data.email);
        onClose();
      } catch (err) {
        setError("Failed to verify Google login.");
        console.error(err);
      }
    },
    onError: () => setError("Google Login Failed"),
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in duration-300">
        <div className="p-6 pb-0">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 text-center text-sm mb-6">
            {isLogin ? 'Enter your details to sign in' : 'Start your professional journey'}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700 text-sm shadow-sm"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-medium tracking-wider">Or with email</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
          {error && <div className="text-red-500 text-xs text-center bg-red-50 p-2 rounded">{error}</div>}

          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email address"
              required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-sm text-slate-500 hover:text-indigo-600 font-medium"
              onClick={() => { setError(''); setIsLogin(!isLogin); }}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>

          <button onClick={onClose} className="w-full mt-2 text-xs text-slate-400 hover:text-slate-600">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
