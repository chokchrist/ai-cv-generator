import React from 'react';

const ClassicTemplate = ({ data, labels }) => {
  return (
    <div className="w-full bg-white text-black p-10 min-h-[11in] font-serif shadow-lg" id="cv-content">
      {/* Header */}
      <header className="border-b-2 border-black pb-4 mb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">{data.personalInfo.name}</h1>
        <p className="text-xl font-medium mb-3">{data.personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-2 uppercase tracking-wider">{labels?.sectionProfile || 'Profile'}</h2>
          <p className="text-sm leading-relaxed text-justify">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-4 uppercase tracking-wider">{labels?.sectionExperience || 'Professional Experience'}</h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold">
                  <h3 className="text-md">{exp.role}</h3>
                  <span className="text-sm">{exp.period}</span>
                </div>
                <div className="flex justify-between items-baseline mb-1 italic">
                  <span>{exp.company}</span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-4 uppercase tracking-wider">{labels?.sectionEducation || 'Education'}</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold">
                  <h3>{edu.school}</h3>
                  <span className="text-sm">{edu.period}</span>
                </div>
                <p className="text-sm italic">{edu.degree}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-black mb-3 uppercase tracking-wider">{labels?.sectionSkills || 'Skills'}</h2>
          <p className="text-sm leading-relaxed">
            {data.skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section>
          <h2 className="text-lg font-bold border-b border-black mb-3 uppercase tracking-wider">{labels?.sectionLanguages || 'Languages'}</h2>
          <p className="text-sm leading-relaxed">
            {data.languages.map((l, i) => (
              <span key={i}>
                <span className="font-bold">{l.language}</span> ({l.level}){i < data.languages.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </p>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
