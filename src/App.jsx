import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import PricingPage from './pages/PricingPage';
import PublicCVPage from './pages/PublicCVPage';
import LoginPage from './pages/LoginPage';

import { CVProvider } from './context/CVContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CVProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/share/:token" element={<PublicCVPage />} />
            {/* Fallback to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CVProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
