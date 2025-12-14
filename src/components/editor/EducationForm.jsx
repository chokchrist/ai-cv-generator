import React from 'react';
import { useCV } from '../../context/CVContext';

const EducationForm = ({ t }) => {
  const { cvData, updateEducation } = useCV();
  const { education = [] } = cvData;

  const labels = t || {
    educationTitle: "Education",
    addSchool: "+ Add School",
    schoolLabel: "School #",
    schoolPlaceholder: "School / University",
    degreePlaceholder: "Degree / Certificate",
    eduPeriodPlaceholder: "Period (e.g. 2016 - 2020)",
    noEducation: "No education added yet."
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      school: '',
      degree: '',
      period: ''
    };
    updateEducation([...education, newEdu]);
  };

  const removeEducation = (id) => {
    updateEducation(education.filter(e => e.id !== id));
  };

  const updateItem = (id, field, value) => {
    const newEdu = education.map(e => e.id === id ? { ...e, [field]: value } : e);
    updateEducation(newEdu);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-700">{labels.educationTitle}</h3>
        <button onClick={addEducation} className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
          {labels.addSchool}
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={edu.id || index} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm group hover:border-indigo-200 transition-all">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-slate-700">{labels.schoolLabel}{index + 1}</h4>
              <button onClick={() => removeEducation(edu.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder={labels.schoolPlaceholder} className="input-field w-full" value={edu.school || ''} onChange={(e) => updateItem(edu.id, 'school', e.target.value)} />
              <input type="text" placeholder={labels.degreePlaceholder} className="input-field w-full" value={edu.degree || ''} onChange={(e) => updateItem(edu.id, 'degree', e.target.value)} />
              <input type="text" placeholder={labels.eduPeriodPlaceholder} className="input-field w-full" value={edu.period || ''} onChange={(e) => updateItem(edu.id, 'period', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
      {education.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
          {labels.noEducation}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
