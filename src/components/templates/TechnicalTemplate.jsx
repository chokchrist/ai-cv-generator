import React from 'react';

const TechnicalTemplate = ({ data, labels }) => {
  return (
    <div className="w-full bg-white p-0 min-h-[11in] shadow-lg flex text-slate-800" id="cv-content">
      {/* Sidebar */}
      <aside className="w-1/3 bg-slate-100 p-8 border-r border-slate-200">
        {/* Contact Info */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-4 border-b-2 border-indigo-500 pb-1">{labels?.sectionContact || 'Contact'}</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <div className="font-medium text-slate-800">{data.personalInfo.email}</div>
            <div>{data.personalInfo.phone}</div>
            <div>{data.personalInfo.location}</div>
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-4 border-b-2 border-indigo-500 pb-1">{labels?.sectionSkills || 'Skills'}</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-white border border-slate-300 px-2 py-1 rounded text-xs font-mono text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-4 border-b-2 border-indigo-500 pb-1">{labels?.sectionLanguages || 'Languages'}</h3>
            <div className="space-y-2">
              {data.languages.map((l, index) => (
                <div key={index} className="text-sm">
                  <div className="font-bold text-slate-800">{l.language}</div>
                  <div className="text-xs text-slate-500">{l.level}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-4 border-b-2 border-indigo-500 pb-1">{labels?.sectionEducation || 'Education'}</h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-800">{edu.school}</div>
                  <div className="text-xs text-slate-500 mb-1">{edu.period}</div>
                  <div className="text-sm font-medium text-indigo-900">{edu.degree}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-2">{data.personalInfo.name}</h1>
          <p className="text-lg text-indigo-600 font-mono font-medium">{data.personalInfo.title}</p>
        </header>

        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-8 bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500">
            {/* <h2 className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-3">{labels?.sectionProfile || 'Profile'}</h2> */}
            <p className="text-sm leading-relaxed text-slate-700 font-medium">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              {labels?.sectionExperience || 'Experience'}
            </h2>
            <div className="space-y-8 pl-2 border-l border-slate-200 ml-1">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6">
                  {/* Timeline dot */}
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-white border-2 border-indigo-500 rounded-full"></div>

                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-xl text-slate-900">{exp.role}</h3>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-indigo-700 font-semibold text-sm">{exp.company}</span>
                    <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">{exp.period}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default TechnicalTemplate;
