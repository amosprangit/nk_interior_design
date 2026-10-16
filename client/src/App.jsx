import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader.jsx';
import Landing from './pages/Landing.jsx';
import SectionPage from './pages/SectionPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:section" element={<SectionPage />} />
        <Route path="/:section/:category" element={<ProjectsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
