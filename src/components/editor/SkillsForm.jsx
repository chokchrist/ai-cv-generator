import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { suggestSkills } from '../../lib/api';

const SkillsForm = ({ t, language }) => {
  const { cvData, updateSkills } = useCV();
  const { skills = [], personalInfo } = cvData;
  const [newSkill, setNewSkill] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  const labels = t || {
    skillsTitle: "Skills",
    aiSuggest: "AI Suggest",
    skillPlaceholder: "Add a specific skill (e.g. React.js)",
    addSkillBtn: "Add",
    jobTitleRequired: "Please enter a Job Title in Personal Details first.",
    suggestionFail: "Suggestion failed",
    suggesting: "Suggesting..."
  };

  const addSkill = (skillToAdd) => {
    const skill = skillToAdd || newSkill;
    if (skill.trim() && !skills.includes(skill)) {
      updateSkills([...skills, skill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    updateSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSuggest = async () => {
    if (!personalInfo.title) {
      alert(labels.jobTitleRequired);
      return;
    }
    setIsSuggesting(true);
    try {
      const res = await suggestSkills(personalInfo.title, language);
      if (res.skills) {
        // Merge unique skills
        const merged = [...new Set([...skills, ...res.skills])];
        updateSkills(merged);
      }
    } catch (e) {
      console.error(e);
      alert(labels.suggestionFail);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-700">{labels.skillsTitle}</h3>
        <button
          onClick={handleSuggest}
          disabled={isSuggesting}
          className={`text-sm font-bold bg-purple-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${isSuggesting ? 'text-slate-400 cursor-not-allowed' : 'text-purple-600 hover:bg-purple-100'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-3 h-3 ${isSuggesting ? 'animate-spin' : ''}`}>
            {isSuggesting ? (
              <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 2.25a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm-3.75 7.5a3.75 3.75 0 003.75 3.75v-1.5a2.25 2.25 0 01-2.25-2.25h-1.5z" />
            ) : (
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM6 20.25a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75v-.75a.75.75 0 01.75-.75zM6 1.5a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75v-.75A.75.75 0 016 1.5z" clipRule="evenodd" />
            )}
          </svg>
          {isSuggesting ? labels.suggesting : labels.aiSuggest}
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder={labels.skillPlaceholder}
          className="input-field flex-1"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => addSkill()} className="btn-primary py-2 px-4 shadow-none">{labels.addSkillBtn}</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div key={index} className="bg-white border boundary-slate-200 px-3 py-1.5 rounded-lg text-slate-700 font-medium text-sm flex items-center gap-2 shadow-sm">
            {skill}
            <button onClick={() => removeSkill(skill)} className="text-slate-400 hover:text-red-500">×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
