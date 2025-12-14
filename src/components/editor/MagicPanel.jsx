import React, { useState } from 'react';
import { generateCVFromAPI } from '../../lib/api';
import { useCV } from '../../context/CVContext';

const MagicPanel = ({ t, language, onGenerateComplete }) => {
  const { setCV } = useCV();
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);
    try {
      const data = await generateCVFromAPI(inputText, language);
      setCV(data); // Update Context
      if (onGenerateComplete) onGenerateComplete();
    } catch (error) {
      console.error(error);
      alert("Failed to generate CV. Please check backend logs.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold mb-2">{t.magicTitle}</h3>
        <p className="opacity-90 text-sm mb-4">{t.magicDesc}</p>
        <textarea
          className="w-full h-40 bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
          placeholder={t.magicPlaceholder}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !inputText}
          className="w-full mt-4 bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isGenerating ? t.analyzing : t.magicAction}
        </button>
      </div>
    </div>
  );
};

export default MagicPanel;
