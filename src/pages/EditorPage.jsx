import React, { useState, useEffect } from 'react';
import { saveCV, getCVs, deleteCV, publishCV } from '../lib/api';
import { downloadPDF } from '../lib/pdf';
import { downloadDOCX } from '../lib/docx';
import ModernTemplate from '../components/templates/ModernTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import TechnicalTemplate from '../components/templates/TechnicalTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import PricingModal from '../components/PricingModal';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useCV } from '../context/CVContext';
import { translations } from '../lib/translations';

// Forms
import PersonalForm from '../components/editor/PersonalForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';
import LanguagesForm from '../components/editor/LanguagesForm';
import MagicPanel from '../components/editor/MagicPanel';
import { useNavigate } from 'react-router-dom';

const EditorPage = () => {
  const { isAuthenticated, logout } = useAuth(); // Import logout
  const { cvData, setCV, updateTemplate } = useCV();
  const navigate = useNavigate();

  const [language, setLanguage] = useState('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = translations[language];

  // UI State
  const [activeTab, setActiveTab] = useState('personal');
  // const [selectedTemplate, setSelectedTemplate] = useState('modern'); // Removed local state
  const [showPricing, setShowPricing] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [savedCVs, setSavedCVs] = useState([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [currentCvId, setCurrentCvId] = useState(null);
  const [shareLink, setShareLink] = useState('');

  // New UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [zoom, setZoom] = useState(0.55); // Default zoom

  useEffect(() => {
    if (isAuthenticated) {
      loadSavedCVs();
    }
    // Responsive initial zoom
    const handleResize = () => {
      if (window.innerWidth < 640) setZoom(0.45);
      else if (window.innerWidth < 1024) setZoom(0.55);
      else setZoom(0.6);
    };
    handleResize(); // Set initial
    // We don't attach listener to avoid fighting user manual zoom
  }, [isAuthenticated]);

  const loadSavedCVs = async () => {
    try {
      const cvs = await getCVs();
      setSavedCVs(cvs);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    const name = cvData.personalInfo.name + " - " + new Date().toLocaleDateString();
    try {
      const res = await saveCV(name, cvData);
      alert(t.saveSuccess);
      setCurrentCvId(res.id);
      loadSavedCVs();
    } catch (e) {
      alert(t.saveFail);
    }
  };

  const handleLoad = (cv) => {
    setCV(cv.data);
    setCurrentCvId(cv.id);
    if (cv.publicToken) {
      setShareLink(`${window.location.origin}/share/${cv.publicToken}`);
    } else {
      setShareLink('');
    }
    setShowSavedList(false);
  };

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await deleteCV(id);
      loadSavedCVs();
      if (currentCvId === id) setCurrentCvId(null);
    } catch (e) {
      alert(t.deleteFail);
    }
  };

  const handleShare = async () => {
    if (!currentCvId) {
      alert(t.loginRequired);
      return;
    }
    try {
      const res = await publishCV(currentCvId);
      const link = `${window.location.origin}/share/${res.token}`;
      setShareLink(link);
      alert(t.publishSuccess + `\n${link}`);
      navigator.clipboard.writeText(link);
      loadSavedCVs();
    } catch (e) {
      alert(t.publishFail);
    }
  };

  const handleDownloadPDF = () => {
    if (!isPro) {
      setShowPricing(true);
    } else {
      downloadPDF(cvData, cvData.template, userPhoto, t);
    }
  };

  const handleDownloadDOCX = () => {
    if (!isPro) {
      setShowPricing(true);
    } else {
      downloadDOCX(cvData, cvData.template);
    }
  };

  const handleCheckoutSuccess = () => {
    setIsPro(true);
    setShowPricing(false);
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'personal', label: t.tabPersonal, icon: '👤' },
    { id: 'experience', label: t.tabExperience, icon: '💼' },
    { id: 'education', label: t.tabEducation, icon: '🎓' },
    { id: 'skills', label: t.tabSkills, icon: '🚀' },
    { id: 'languages', label: t.tabLanguages, icon: '🌍' },
    { id: 'magic', label: t.tabMagic, icon: '✨' },
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row font-sans text-slate-800 bg-slate-50 relative overflow-hidden">

      {/* Sidebar Toggle Button - Fixed Position */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 left-6 z-50 bg-slate-800 text-white p-3 rounded-full shadow-xl hover:bg-slate-700 transition-all hover:scale-105 active:scale-95"
        title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
      >
        {isSidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Sidebar - Refactored for content-based height and sticky header */}
      <aside
        className={`
            fixed inset-y-0 left-0 z-40 bg-white border-r border-slate-200 shadow-2xl shadow-slate-200/50 transition-all duration-300 ease-in-out
            md:relative md:translate-x-0 md:h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200
            ${isSidebarOpen ? 'w-full md:w-[450px] translate-x-0 opacity-100' : '-translate-x-full w-0 opacity-0 md:w-0 overflow-hidden'}
        `}
      >

        {/* Top Bar - Sticky */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-20 p-4 border-b border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <span className="font-bold text-slate-700">{t.appTitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="text-xs font-bold text-slate-500 hover:text-indigo-600 uppercase border px-2 py-1 rounded"
                >
                  {language}
                </button>
                {isLangMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                      {['en', 'es', 'fr', 'de'].map(lang => (
                        <button key={lang} onClick={() => { setLanguage(lang); setIsLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-rose-500 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
                  title={t.logout}
                >
                  {t.logout}
                </button>
              )}
            </div>
          </div>

          {/* Tabs - Added extra padding to prevent focus ring overlapping/clipping */}
          <div className="flex gap-2 overflow-x-auto p-2 -mx-2 scrollbar-none">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                            px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5
                            ${activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200 z-10'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }
                        `}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content - Removed fixed height/overflow constraints */}
        <div className="p-3 md:p-4 bg-slate-50/50 min-h-[300px]">
          {activeTab === 'magic' && (
            <MagicPanel t={t} language={language} onGenerateComplete={() => setActiveTab('personal')} />
          )}

          {activeTab === 'personal' && <PersonalForm t={t} language={language} />}
          {activeTab === 'experience' && <ExperienceForm t={t} language={language} />}
          {activeTab === 'education' && <EducationForm t={t} language={language} />}
          {activeTab === 'skills' && <SkillsForm t={t} language={language} />}
          {activeTab === 'languages' && <LanguagesForm t={t} language={language} />}
        </div>

        {/* Bottom Actions - Now flows naturally below content */}
        <div className="p-4 border-t border-slate-200 bg-white z-10 space-y-3 relative mt-auto">
          {cvData.template === 'creative' && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-2">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                {userPhoto ? <img src={userPhoto} className="w-full h-full object-cover" /> : <span className="flex items-center justify-center h-full text-xs">📷</span>}
              </div>
              <div className="flex-1">
                <input type="file" onChange={handlePhotoUpload} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-indigo-50 file:text-indigo-700" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 pb-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">{t.templateLabel}</label>
              <div className="flex flex-wrap justify-center gap-2">
                {['classic', 'modern', 'technical', 'creative', 'executive'].map((type) => (
                  <button
                    key={type}
                    onClick={() => updateTemplate(type)}
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize border transition-all ${cvData.template === type ? 'bg-slate-800 text-white border-slate-800 scale-105' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                  >
                    {t[type]}
                  </button>
                ))}
              </div>
              {cvData.template === 'creative' && (
                <div className="mt-2 text-[10px] text-amber-600 bg-amber-50 p-2 rounded border border-amber-200 text-center leading-tight">
                  ⚠️ {t.creativeWarning}
                </div>
              )}
            </div>

            <div className="col-span-2 flex gap-2">
              <button onClick={handleSave} className="flex-1 py-3 rounded-xl font-bold border-2 border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                {t.saveDraft}
              </button>
              {currentCvId && (
                <button onClick={handleShare} className="flex-1 py-3 rounded-xl font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                  {t.sharePool}
                </button>
              )}
            </div>

            <div onClick={() => !isAuthenticated && setShowAuth(true)} className="flex-1 col-span-2">
              <button
                onClick={() => setShowSavedList(!showSavedList)}
                className="w-full h-full py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                disabled={!isAuthenticated}
              >
                {t.loadBtn} ({savedCVs.length})
              </button>
            </div>
          </div>
          {showSavedList && (
            <div className="absolute bottom-full left-0 w-full bg-white border-t border-slate-200 shadow-xl max-h-60 overflow-y-auto p-2">
              {savedCVs.map(cv => (
                <div key={cv.id} className="p-2 hover:bg-slate-50 flex justify-between cursor-pointer" onClick={() => handleLoad(cv)}>
                  <span className="text-sm font-medium">{cv.name}</span>
                  <span onClick={(e) => { e.stopPropagation(); handleDelete(cv.id) }} className="text-red-500">×</span>
                </div>
              ))}
            </div>
          )}
          {shareLink && (
            <div className="text-xs text-center text-indigo-600 truncate px-2 bg-indigo-50 py-1 rounded">
              Public: {shareLink}
            </div>
          )}
        </div>
      </aside>

      {/* Preview Area - Fixed scale behavior (lg changed from 0.65 to 0.55) */}
      <main className="flex-1 p-4 overflow-hidden flex flex-col items-center justify-start h-screen relative bg-slate-100 transition-all duration-300">

        {/* Toolbar: Zoom + Export - Added gap-2 and margin-bottom for spacing */}
        <div className="w-full max-w-[800px] flex justify-between items-center mb-8 gap-4 sticky top-4 z-20">

          {/* Zoom Controls */}
          <div className="bg-white/90 backdrop-blur rounded-xl shadow-sm border border-slate-200 p-1 flex items-center gap-1">
            <button
              onClick={() => setZoom(z => Math.max(0.2, z - 0.1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600"
            >
              -
            </button>
            <span className="text-xs font-bold text-slate-600 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(z => Math.min(1.5, z + 0.1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600"
            >
              +
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDownloadDOCX}
              className="bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2 text-sm"
            >
              {t.docxBtn}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:bg-slate-800 flex items-center gap-2 text-sm"
            >
              {t.pdfBtn}
            </button>
          </div>
        </div>

        {/* Responsive container that enables scrolling if screen is too small, OR scales down */}
        <div className="w-full flex-1 flex items-start overflow-auto pb-20">
          {/* Wrapper that scales physically with the content to force scrollbars */}
          <div className="m-auto transition-all duration-200 ease-out" style={{ width: `${816 * zoom}px`, height: `${1056 * zoom}px` }}> {/* 8.5in * 96dpi = 816px, 11in = 1056px */}
            <div
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
              className="min-w-[8.5in] min-h-[11in] bg-white shadow-2xl relative"
            >
              {
                {
                  'modern': <ModernTemplate data={cvData} labels={t} />,
                  'classic': <ClassicTemplate data={cvData} labels={t} />,
                  'technical': <TechnicalTemplate data={cvData} labels={t} />,
                  'creative': <CreativeTemplate data={cvData} photo={userPhoto} labels={t} />,
                  'executive': <ExecutiveTemplate data={cvData} labels={t} />
                }[cvData.template || 'modern']
              }
            </div>
          </div>
        </div>
      </main>

      {showPricing && <PricingModal onClose={() => setShowPricing(false)} onCheckout={handleCheckoutSuccess} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default EditorPage;
