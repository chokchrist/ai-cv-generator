import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicCV } from '../lib/api';
import ModernTemplate from '../components/templates/ModernTemplate';

const PublicCVPage = () => {
  const { token } = useParams();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const data = await getPublicCV(token);
        if (data.error) throw new Error(data.error);
        setCv(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, [token]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-slate-100 py-10 flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center gap-4">
        <span className="font-bold text-slate-700">Shared CV: {cv.name}</span>
        <a href="/" className="text-indigo-600 font-bold hover:underline text-sm">Create your own</a>
      </div>
      <div className="w-[8.5in] bg-white shadow-2xl min-h-[11in]">
        <ModernTemplate data={cv.data} labels={{}} />
        {/* Note: Labels might be missing if we don't pass them, defaulting to English fallback inside template or empty */}
      </div>
    </div>
  );
};

export default PublicCVPage;
