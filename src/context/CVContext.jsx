import React, { createContext, useContext, useState } from 'react';

const CVContext = createContext();

export const useCV = () => useContext(CVContext);

export const CVProvider = ({ children }) => {
  const [cvData, setCvData] = useState({
    personalInfo: {
      name: 'Your Name',
      title: 'Professional Title',
      email: 'email@example.com',
      phone: '+1 234 567 890',
      location: 'City, Country',
      summary: 'A brief summary of your professional background and goals.'
    },
    experience: [],
    education: [],
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    languages: [],
    template: 'modern'
  });

  const updatePersonalInfo = (info) => {
    setCvData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
  };

  const updateExperience = (experiences) => {
    setCvData(prev => ({ ...prev, experience: experiences }));
  };

  const updateEducation = (education) => {
    setCvData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills) => {
    setCvData(prev => ({ ...prev, skills }));
  };

  const updateLanguages = (languages) => {
    setCvData(prev => ({ ...prev, languages }));
  };

  const updateTemplate = (template) => {
    setCvData(prev => ({ ...prev, template }));
  };

  const setCV = (data) => {
    setCvData(data);
  };

  return (
    <CVContext.Provider value={{ cvData, updatePersonalInfo, updateExperience, updateEducation, updateSkills, updateLanguages, updateTemplate, setCV }}>
      {children}
    </CVContext.Provider>
  );
};
