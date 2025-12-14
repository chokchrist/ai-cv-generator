import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { rewriteContent } from '../../lib/api';

const ExperienceForm = ({ t, language }) => {
  const { cvData, updateExperience } = useCV();
  const { experience = [] } = cvData; // Default to empty array

  // Fallback labels if t is missing
  const labels = t || {
    experienceTitle: "Experience",
    addRole: "+ Add Role",
    roleLabel: "Role #",
    jobTitlePlaceholder: "Job Title",
    companyPlaceholder: "Company",
    periodPlaceholder: "Period (e.g. 2020 - Present)",
    descPlaceholder: "Describe your responsibilities and achievements...",
    rewriteBtn: "Rewrite",
    noExperience: "No experience added yet."
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      role: '',
      company: '',
      period: '',
      description: ''
    };
    updateExperience([...experience, newExp]);
  };

  const removeExperience = (id) => {
    updateExperience(experience.filter(e => e.id !== id));
  };

  const updateItem = (id, field, value) => {
    const newExp = experience.map(e => e.id === id ? { ...e, [field]: value } : e);
    updateExperience(newExp);
  };

  const handleRewrite = async (id, text) => {
    if (!text) return;
    try {
      const res = await rewriteContent(text, language);
      if (res.rewritten) {
        updateItem(id, 'description', res.rewritten);
      }
    } catch (e) {
      console.error(e);
      alert("Rewrite failed");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-700">{labels.experienceTitle}</h3>
        <button onClick={addExperience} className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
          {labels.addRole}
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div key={exp.id || index} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm group hover:border-indigo-200 transition-all">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-slate-700">{labels.roleLabel}{index + 1}</h4>
              <button onClick={() => removeExperience(exp.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input type="text" placeholder={labels.jobTitlePlaceholder} className="input-field" value={exp.role || ''} onChange={(e) => updateItem(exp.id, 'role', e.target.value)} />
              <input type="text" placeholder={labels.companyPlaceholder} className="input-field" value={exp.company || ''} onChange={(e) => updateItem(exp.id, 'company', e.target.value)} />
              <input type="text" placeholder={labels.periodPlaceholder} className="input-field md:col-span-2" value={exp.period || ''} onChange={(e) => updateItem(exp.id, 'period', e.target.value)} />
            </div>
            <div className="relative">
              <textarea
                placeholder={labels.descPlaceholder}
                className="input-field w-full min-h-[80px]"
                value={exp.description || ''}
                onChange={(e) => updateItem(exp.id, 'description', e.target.value)}
              />
              <button
                onClick={() => handleRewrite(exp.id, exp.description)}
                className="absolute bottom-3 right-3 text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM6 20.25a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75v-.75a.75.75 0 01.75-.75zM6 1.5a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75v-.75A.75.75 0 016 1.5z" clipRule="evenodd" />
                </svg>
                {labels.rewriteBtn}
              </button>
            </div>
          </div>
        ))}
      </div>
      {experience.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
          {labels.noExperience}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
