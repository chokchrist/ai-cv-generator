import React, { useState, useEffect } from 'react';
import { generateCVFromAPI, saveCV, getCVs, deleteCV } from './lib/api';
import { downloadPDF } from './lib/pdf';
import ModernTemplate from './components/templates/ModernTemplate';
import CreativeTemplate from './components/templates/CreativeTemplate';
import PricingModal from './components/PricingModal';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { translations } from './lib/translations';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [language, setLanguage] = useState('en'); // Default Language
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = translations[language];

  const [inputText, setInputText] = useState('');
  const [generatedData, setGeneratedData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [savedCVs, setSavedCVs] = useState([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadSavedCVs();
    }
  }, [isAuthenticated]);

  const loadSavedCVs = async () => {
    try {
      const cvs = await getCVs();
      setSavedCVs(cvs);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);
    try {
      // Pass language to API
      const data = await generateCVFromAPI(inputText, language);
      setGeneratedData(data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate CV. Please check backend logs.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    if (!generatedData) return;
    const name = generatedData.personalInfo.name + " - " + new Date().toLocaleDateString();
    try {
      await saveCV(name, generatedData);
      alert(t.saveBtn + " Success!");
      loadSavedCVs();
    } catch (e) {
      alert("Failed to save.");
    }
  };

  const handleLoad = (cv) => {
    setGeneratedData(cv.data);
    setShowSavedList(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteCV(id);
      loadSavedCVs();
    } catch (e) {
      alert("Failed to delete");
    }
  };

  const handleDownloadClick = () => {
    if (!isPro) {
      setShowPricing(true);
    } else {
      downloadPDF(generatedData, selectedTemplate, userPhoto, t);
    }
  };

  const handleCheckoutSuccess = () => {
    setIsPro(true);
    setShowPricing(false);
    setTimeout(() => downloadPDF(generatedData, selectedTemplate, userPhoto, t), 500);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans text-slate-800 bg-slate-50 transition-colors duration-300">

      {/* Sidebar: Glassmorphism */}
      <aside className="w-full md:w-[400px] p-6 md:p-8 glass border-r-0 md:h-screen md:sticky md:top-0 overflow-y-auto z-20 flex flex-col gap-6 transition-all duration-300">

        {/* Header */}
        <header className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {t.appTitle}
              </h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">{t.tagline}</p>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-indigo-600 uppercase transition-colors"
            >
              {language}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {isLangMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>
                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  {['en', 'es', 'fr', 'de'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 ${language === lang ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'}`}
                    >
                      {lang === 'en' && '🇺🇸 English'}
                      {lang === 'es' && '🇪🇸 Español'}
                      {lang === 'fr' && '🇫🇷 Français'}
                      {lang === 'de' && '🇩🇪 Deutsch'}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* User Auth Status */}
        <div className="p-4 bg-white/60 backdrop-blur rounded-2xl border border-white/50 shadow-sm transition-all hover:shadow-md">
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 text-sm truncate">{user?.email}</span>
                <button onClick={logout} className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors">{t.logout}</button>
              </div>
              <button
                onClick={() => setShowSavedList(!showSavedList)}
                className="w-full mt-1 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.viewSaved}</span>
                <span className="bg-indigo-200 text-indigo-700 px-1.5 rounded-full text-[10px]">{savedCVs.length}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="w-full py-2.5 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 group"
            >
              <span>{t.loginToSave}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          )}
        </div>

        {/* Saved CVs List (Animated) */}
        {showSavedList && isAuthenticated && (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 mt-2 shrink-0 border-b border-slate-100 pb-4">
            {savedCVs.map(cv => (
              <div key={cv.id} className="group flex justify-between items-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer" onClick={() => handleLoad(cv)}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-700 truncate">{cv.name}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(cv.id); }}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Input */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">{t.workHistoryLabel}</label>
          <div className="relative flex-1">
            <textarea
              className="w-full h-full min-h-[150px] md:min-h-[200px] input-field resize-none leading-relaxed text-sm"
              placeholder={t.placeholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium bg-white/80 px-2 py-1 rounded-md backdrop-blur">
              {t.aiPowered}
            </div>
          </div>
        </div>

        {/* Photo Upload for Creative Template */}
        {selectedTemplate === 'creative' && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <label className="text-sm font-semibold text-slate-700 ml-1 mb-1 block">{t.profilePhoto}</label>
            <div className="flex items-center gap-3 p-3 bg-white/50 border border-slate-200 rounded-xl">
              {userPhoto ? (
                <img src={userPhoto} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.007 3h3.986a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7.75a2 2 0 01-1.352 1.89h-.002a2.001 2.001 0 01-.646.109H3a2 2 0 01-2-2V8zm9-3a1 1 0 00-.707.293l-1 1a1 1 0 000 1.414l1 1A1 1 0 0010 8.414V7h.01a1 1 0 001-1V5a1 1 0 00-1-1zm-4 7a4 4 0 118 0 4 4 0 01-8 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !inputText}
            className="btn-primary py-3.5 flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t.magicBtn}</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 00-1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                <span>{t.generateBtn}</span>
              </>
            )}
          </button>

          <button
            onClick={handleSave}
            disabled={!generatedData || !isAuthenticated}
            className="py-3.5 rounded-xl font-bold border-2 border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 bg-white/50 hover:bg-white transition-all disabled:opacity-50 disabled:hover:border-slate-200"
          >
            {t.saveBtn}
          </button>
        </div>

        {generatedData && (
          <div className="pt-6 border-t border-slate-200/50 animate-in fade-in slide-in-from-bottom-2">
            <label className="text-xs font-bold uppercase text-slate-400 mb-3 block tracking-wider">{t.templateLabel}</label>
            <div className="grid grid-cols-2 gap-3">
              {['modern', 'creative'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedTemplate(type)}
                  className={`
                      relative p-3 rounded-xl border-2 text-sm font-bold capitalize transition-all overflow-hidden group
                      ${selectedTemplate === type
                      ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50 shadow-sm'
                      : 'border-white bg-white/50 text-slate-500 hover:border-slate-200'
                    }
                    `}
                >
                  <span className="relative z-10">{t[type]}</span>
                  {selectedTemplate === type && (
                    <div className="absolute inset-0 bg-indigo-500/5 -z-0"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Preview Area */}
      <main className="flex-1 p-4 md:p-12 overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start min-h-screen relative">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {generatedData ? (
          <div className="w-full max-w-[8.5in] animate-in fade-in zoom-in-95 duration-700 mx-auto">
            <div className="flex justify-between items-center mb-8 sticky top-4 z-10 py-3 glass px-4 md:px-6 rounded-2xl w-full">
              <h2 className="text-sm md:text-lg font-bold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {t.livePreview}
              </h2>
              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={handleDownloadClick}
                  className="bg-slate-900 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-sm md:text-base font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  {t.downloadBtn}
                </button>
              </div>
            </div>

            {/* Paper Effect with Mobile Scaling */}
            <div className="pb-8 md:pb-0 md:overflow-visible flex justify-center w-full">
              <div id="cv-content" className="bg-white shadow-2xl shadow-slate-300/50 mb-20 origin-top transform transition-transform duration-500 print:shadow-none min-w-[800px] md:min-w-0 md:transform-none scale-[0.38] xs:scale-[0.45] sm:scale-[0.6] md:scale-100 h-[11in] md:h-auto" style={{ minHeight: '11in' }}>
                {selectedTemplate === 'modern' ? (
                  <ModernTemplate data={generatedData} labels={t} />
                ) : (
                  <CreativeTemplate data={generatedData} photo={userPhoto} labels={t} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 p-10 text-center max-w-md mt-20">
            <div className="w-32 h-32 glass rounded-full flex items-center justify-center mb-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-xl"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-indigo-500/80 group-hover:scale-110 transition-transform duration-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500">
              {t.emptyStateTitle}
            </h3>
            <p className="text-slate-500 leading-relaxed">
              {t.emptyStateDesc}
            </p>
          </div>
        )}
      </main>

      {showPricing && (
        <PricingModal
          onClose={() => setShowPricing(false)}
          onCheckout={handleCheckoutSuccess}
        />
      )}

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} />
      )}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Dashboard />
  </AuthProvider>
);

export default App;
