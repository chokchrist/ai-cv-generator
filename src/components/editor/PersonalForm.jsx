import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { rewriteContent } from '../../lib/api';

const PersonalForm = ({ t, language }) => {
  const { cvData, updatePersonalInfo } = useCV();
  const { personalInfo } = cvData;
  const [isRewriting, setIsRewriting] = useState(false);

  // Fallback if t is not provided
  const labels = t || {
    personalDetails: "Personal Details",
    fullName: "Full Name",
    yourName: "Your Name",
    jobTitle: "Job Title",
    professionalTitle: "Professional Title",
    email: "Email",
    emailPlaceholder: "email@example.com",
    phone: "Phone",
    phonePlaceholder: "+1 234 567 890",
    location: "Location",
    locationPlaceholder: "City, Country",
    professionalSummary: "Professional Summary",
    aiRewrite: "AI Rewrite",
    summaryPlaceholder: "A brief summary of your professional background and goals.",
    analyzing: "Rewriting..."
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handleRewrite = async () => {
    if (!personalInfo.summary) return;
    setIsRewriting(true);
    try {
      // Pass language to API
      const res = await rewriteContent(personalInfo.summary, language);
      if (res.rewritten) {
        updatePersonalInfo({ summary: res.rewritten });
      }
    } catch (e) {
      console.error(e);
      alert("Rewrite failed");
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-xl font-bold text-slate-700 mb-4">{labels.personalDetails}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{labels.fullName}</label>
          <input
            type="text"
            name="name"
            value={personalInfo.name || ''}
            onChange={handleChange}
            className="input-field w-full"
            placeholder={labels.yourName}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{labels.jobTitle}</label>
          <input
            type="text"
            name="title"
            value={personalInfo.title || ''}
            onChange={handleChange}
            className="input-field w-full"
            placeholder={labels.professionalTitle}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{labels.email}</label>
          <input
            type="email"
            name="email"
            value={personalInfo.email || ''}
            onChange={handleChange}
            className="input-field w-full"
            placeholder={labels.emailPlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{labels.phone}</label>
          <input
            type="text"
            name="phone"
            value={personalInfo.phone || ''}
            onChange={handleChange}
            className="input-field w-full"
            placeholder={labels.phonePlaceholder}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">{labels.location}</label>
          <input
            type="text"
            name="location"
            value={personalInfo.location || ''}
            onChange={handleChange}
            className="input-field w-full"
            placeholder={labels.locationPlaceholder}
          />
        </div>
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-slate-700">{labels.professionalSummary}</label>
            <button
              onClick={handleRewrite}
              className={`text-xs font-bold flex items-center gap-1 transition-colors ${isRewriting ? 'text-slate-400 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-800'}`}
              disabled={isRewriting}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-3 h-3 ${isRewriting ? 'animate-spin' : ''}`}>
                {isRewriting ? (
                  <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 2.25a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm-3.75 7.5a3.75 3.75 0 003.75 3.75v-1.5a2.25 2.25 0 01-2.25-2.25h-1.5z" />
                ) : (
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM6 20.25a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75v-.75a.75.75 0 01.75-.75zM6 1.5a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75v-.75A.75.75 0 016 1.5z" clipRule="evenodd" />
                )}
              </svg>
              {isRewriting ? labels.analyzing : labels.aiRewrite}
            </button>
          </div>
          <textarea
            name="summary"
            value={personalInfo.summary || ''}
            onChange={handleChange}
            className="input-field w-full min-h-[100px]"
            placeholder={labels.summaryPlaceholder}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;
