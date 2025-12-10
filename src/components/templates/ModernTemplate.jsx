import React from 'react';

const ModernTemplate = ({ data, labels }) => {
  return (
    <div className="w-full bg-white text-slate-800 p-8 min-h-[11in] shadow-lg" id="cv-content">
      <header className="border-b-2 border-slate-900 pb-6 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900">{data.personalInfo.name}</h1>
        <p className="text-xl text-slate-600 font-medium mt-2">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">{labels?.sectionExperience || 'Experience'}</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                    <span className="text-sm text-slate-500 font-medium">{exp.period}</span>
                  </div>
                  <p className="text-slate-700 font-semibold mb-2">{exp.company}</p>
                  <p className="text-slate-600 leading-relaxed text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">{labels?.sectionEducation || 'Education'}</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-800">{edu.school}</h3>
                    <span className="text-sm text-slate-500">{edu.period}</span>
                  </div>
                  <p className="text-slate-600">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-1 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">{labels?.sectionAbout || 'About'}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">{labels?.sectionSkills || 'Skills'}</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
