import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { v4 as uuidv4 } from 'uuid';

const LanguagesForm = ({ t, language }) => {
  const { cvData, updateLanguages } = useCV();
  const [newLang, setNewLang] = useState('');
  const [newLevel, setNewLevel] = useState('');

  const handleAdd = () => {
    if (newLang.trim() && newLevel.trim()) {
      updateLanguages([...(cvData.languages || []), { id: uuidv4(), language: newLang, level: newLevel }]);
      setNewLang('');
      setNewLevel('');
    }
  };

  const handleRemove = (id) => {
    updateLanguages(cvData.languages.filter(l => l.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center border-b border-indigo-100 pb-2">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="text-2xl">🌍</span> {t.languagesTitle}
        </h2>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={newLang}
            onChange={(e) => setNewLang(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.languagePlaceholder}
            className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700 bg-slate-50 focus:bg-white"
          />
          <input
            type="text"
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.levelPlaceholder}
            className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700 bg-slate-50 focus:bg-white"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!newLang.trim() || !newLevel.trim()}
          className="w-full py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
          {t.addLanguage}
        </button>
      </div>

      <div className="space-y-3">
        {(!cvData.languages || cvData.languages.length === 0) && (
          <div className="text-center py-8 text-slate-400 bg-slate-50/50 rounded-xl border-dashed border-2 border-slate-200">
            {t.noLanguages}
          </div>
        )}
        {cvData.languages && cvData.languages.map((item) => (
          <div key={item.id} className="group bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center hover:shadow-md transition-all hover:border-indigo-200">
            <div>
              <span className="font-bold text-slate-800">{item.language}</span>
              <span className="text-slate-400 mx-2">•</span>
              <span className="text-slate-500 text-sm font-medium bg-slate-100 px-2 py-0.5 rounded">{item.level}</span>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesForm;
