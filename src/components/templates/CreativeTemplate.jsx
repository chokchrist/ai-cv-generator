import React from 'react';

const CreativeTemplate = ({ data, photo, labels }) => {
  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-[11in] grid grid-cols-12 shadow-lg overflow-hidden" id="cv-content">
      <aside className="col-span-4 bg-slate-900 text-white p-8 flex flex-col h-full">
        <div className="mb-10 text-center">
          {photo ? (
            <img
              src={photo}
              alt={data.personalInfo.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-indigo-500 shadow-xl"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-6 mx-auto shadow-lg flex items-center justify-center font-bold text-2xl text-white/50">
              {data.personalInfo.name.charAt(0)}
            </div>
          )}
          <h1 className="text-3xl font-bold text-center leading-tight">{data.personalInfo.name}</h1>
          <p className="text-indigo-400 text-center mt-2 font-medium">{data.personalInfo.title}</p>
        </div>

        <div className="space-y-8 flex-1">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">{labels?.sectionContact || 'Contact'}</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>{data.personalInfo.email}</li>
              <li>{data.personalInfo.phone}</li>
              <li>{data.personalInfo.location}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">{labels?.sectionSkills || 'Skills'}</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="border border-slate-700 px-2 py-1 rounded text-xs text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="col-span-8 p-10 bg-white">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            {labels?.sectionProfile || 'Profile'}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {data.personalInfo.summary}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            {labels?.sectionExperience || 'Experience'}
          </h2>
          <div className="space-y-8 relative border-l-2 border-slate-100 ml-3 pl-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative">
                <span className="absolute -left-[37px] top-2 w-4 h-4 rounded-full border-4 border-white bg-indigo-500"></span>
                <h3 className="font-bold text-lg text-slate-900">{exp.role}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-indigo-600 font-medium">{exp.company}</span>
                  <span className="text-sm text-slate-400">{exp.period}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            {labels?.sectionEducation || 'Education'}
          </h2>
          <div className="grid grid-cols-1 gap-4 text-sm">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">{edu.school}</h3>
                <p className="text-slate-600">{edu.degree}</p>
                <span className="text-xs text-slate-400 mt-2 block">{edu.period}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreativeTemplate;
