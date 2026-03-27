import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PortalPage from './pages/PortalPage';
import PocDetailsPage from './pages/PocDetailsPage';
import AllPocsPage from './pages/AllPocsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/poc/:id" element={<PocDetailsPage />} />
        <Route path="/pocs" element={<AllPocsPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
