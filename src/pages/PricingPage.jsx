import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-6 flex flex-col items-center">
      <nav className="w-full max-w-6xl flex justify-between items-center mb-20">
        <h1 onClick={() => navigate('/')} className="text-2xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          AI CV Generator
        </h1>
        <button onClick={() => navigate('/editor')} className="font-semibold text-slate-600 hover:text-indigo-600">
          Back to Editor
        </button>
      </nav>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-slate-500 text-lg">Invest in your career for less than the price of a coffee.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Free Plan */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-2xl font-bold mb-2">Free</h3>
          <div className="text-4xl font-bold mb-6">$0</div>
          <ul className="space-y-4 mb-8 flex-1 text-slate-600">
            <li className="flex gap-2">✓ Create 1 CV</li>
            <li className="flex gap-2">✓ Basic Modern Template</li>
            <li className="flex gap-2">✓ PDF Download (Watermarked)</li>
          </ul>
          <button onClick={() => navigate('/editor')} className="w-full py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
            Start Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-500 text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <div className="text-4xl font-bold mb-6">€5<span className="text-lg font-normal text-slate-400">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1 text-slate-300">
            <li className="flex gap-2 text-white">✓ Unlimited CVs</li>
            <li className="flex gap-2 text-white">✓ All Premium Templates (Creative, etc)</li>
            <li className="flex gap-2 text-white">✓ No Watermarks</li>
            <li className="flex gap-2 text-white">✓ Advanced AI Rewrite</li>
            <li className="flex gap-2 text-white">✓ Priority Support</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-bold hover:shadow-lg hover:scale-105 transition-all">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
