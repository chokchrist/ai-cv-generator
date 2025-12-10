import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { createPaymentIntent } from '../lib/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PricingModal = ({ onClose, onCheckout }) => {
  const [selectedPlan, setSelectedPlan] = useState('one-time');
  const [clientSecret, setClientSecret] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  // Prices in cents
  const prices = {
    'subscription': 499,
    'one-time': 999
  };

  const handleProceedToPayment = async () => {
    // Determine amount based on selection
    const amount = prices[selectedPlan];

    // Call backend to get clientSecret
    try {
      const data = await createPaymentIntent(amount);
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setShowPayment(true);
      } else {
        console.error("No client secret returned", data);
        alert("Payment initialization failed. See console.");
      }
    } catch (err) {
      console.error("Failed to init payment", err);
      alert("Backend connection failed. Check console. Ensuring backend is running on port 4242.");
    }
  };

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#4f46e5',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '12px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 font-sans">
      <div className="glass-dark bg-white/80 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh] border border-white/20">

        {/* Header */}
        <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/30 to-transparent"></div>
          <h2 className="text-2xl font-bold mb-2 relative z-10 font-display">Upgrade to Premium</h2>
          <p className="text-indigo-100 text-sm relative z-10 opacity-90">Unlock PDF downloads & remove watermarks.</p>
        </div>

        <div className="p-8 overflow-y-auto bg-white backdrop-blur-md flex-1">
          {!showPayment ? (
            <div className="space-y-4">
              {/* Plan Selection UI */}
              <div
                onClick={() => setSelectedPlan('subscription')}
                className={`cursor-pointer border-2 rounded-xl p-5 flex items-center justify-between transition-all group relative overflow-hidden
                  ${selectedPlan === 'subscription'
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-md transform scale-[1.02]'
                    : 'border-white/30 bg-white/60 hover:border-indigo-200 hover:shadow-sm'
                  }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPlan === 'subscription' ? 'border-indigo-600' : 'border-slate-300'}`}>
                    {selectedPlan === 'subscription' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800">Monthly</p>
                    <p className="text-xs text-slate-500">Cancel anytime</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xl text-slate-800">4.99€</span>
                  <span className="text-xs text-slate-500 block">/mo</span>
                </div>
              </div>

              <div
                onClick={() => setSelectedPlan('one-time')}
                className={`cursor-pointer border-2 rounded-xl p-5 flex items-center justify-between transition-all group relative overflow-hidden
                  ${selectedPlan === 'one-time'
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-md transform scale-[1.02]'
                    : 'border-white bg-white/60 hover:border-indigo-200 hover:shadow-sm'
                  }`}
              >
                <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">BEST VALUE</div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPlan === 'one-time' ? 'border-indigo-600' : 'border-slate-300'}`}>
                    {selectedPlan === 'one-time' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800">One-time</p>
                    <p className="text-xs text-slate-500">Lifetime access</p>
                  </div>
                </div>
                <span className="font-bold text-xl text-slate-800">9.99€</span>
              </div>

              <div className="pt-6 mt-2 border-t border-slate-200/50">
                <div className="flex justify-between text-sm text-slate-600 mb-6 px-1">
                  <span>Total due today</span>
                  <span className="font-bold text-2xl text-slate-900 tracking-tight">{selectedPlan === 'one-time' ? '9.99€' : '4.99€'}</span>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  className="btn-primary w-full py-4 text-lg shadow-xl shadow-indigo-500/20"
                >
                  Continue to Checkout
                </button>
                <button onClick={onClose} className="w-full py-3 text-slate-500 text-sm font-medium hover:text-slate-800 mt-2 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* Stripe Elements UI */
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => setShowPayment(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to plans
              </div>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm onSuccess={onCheckout} onCancel={() => setShowPayment(false)} />
                </Elements>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
