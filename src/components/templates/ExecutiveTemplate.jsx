import React from 'react';

const ExecutiveTemplate = ({ data, labels }) => {
  return (
    <div className="w-full bg-white text-slate-900 p-12 min-h-[11in] shadow-lg font-sans" id="cv-content">
      {/* Header - Centered & Premium */}
      <header className="border-b border-slate-300 pb-8 mb-10 text-center">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-slate-900 mb-2">{data.personalInfo.name}</h1>
        <p className="text-lg text-slate-600 uppercase tracking-widest text-xs font-bold mb-6">{data.personalInfo.title}</p>

        <div className="flex justify-center gap-6 text-sm font-medium text-slate-500">
          {data.personalInfo.email && <span className="flex items-center gap-1">{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="flex items-center gap-1">• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="flex items-center gap-1">• {data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Impact Summary */}
      {data.personalInfo.summary && (
        <section className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-md leading-relaxed text-slate-700 italic">
            "{data.personalInfo.summary}"
          </p>
        </section>
      )}

      {/* Experience - Focus on Leadership */}
      {data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">{labels?.sectionExperience || 'Professional History'}</h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-2">
                  <h3 className="font-serif text-xl font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm text-slate-500 font-medium">{exp.period}</span>
                </div>
                <div className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">{exp.company}</div>
                <p className="text-sm leading-7 text-slate-600 text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-12">
        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">{labels?.sectionEducation || 'Education'}</h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-serif font-bold text-slate-900 text-lg">{edu.school}</div>
                  <div className="text-sm text-slate-600 mb-1">{edu.degree}</div>
                  <div className="text-xs text-slate-400">{edu.period}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills/Expertise */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">{labels?.sectionSkills || 'Core Competencies'}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="text-sm font-medium text-slate-700 border-b border-slate-100 pb-0.5">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section className="col-span-2 mt-4 border-t border-slate-100 pt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{labels?.sectionLanguages || 'Global Communication'}</h2>
            <div className="flex gap-8">
              {data.languages.map((l, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-slate-900">{l.language}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
