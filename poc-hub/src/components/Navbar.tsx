import { useHideyNavbar } from '../hooks/useHideyNavbar';
import { useNavigate } from 'react-router-dom';

const KANINI_LOGO = 'https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg';

export default function Navbar() {
  const { hidden, scrolled } = useHideyNavbar();
  const navigate = useNavigate();

  return (
    <header
      className={`navbar fixed top-0 left-0 right-0 z-50 px-6 lg:px-20 py-4 flex items-center justify-between
        ${hidden ? 'navbar--hidden' : ''}
        ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white'}
      `}
    >
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/portal')}>
        <img src={KANINI_LOGO} alt="Kanini" className="h-8" />
        <span className="text-gray-300 font-light">|</span>
        <h1 className="text-xl font-bold tracking-tight text-black">POC Hub</h1>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a className="nav-link text-sm font-medium text-gray-700 hover:text-black transition-colors" href="#hero">
          Dashboard
        </a>
        <a className="nav-link text-sm font-medium text-gray-700 hover:text-black transition-colors" href="#pocs">
          Projects
        </a>
        <a className="nav-link text-sm font-medium text-gray-700 hover:text-black transition-colors" href="#featured">
          Teams
        </a>
        <a className="nav-link text-sm font-medium text-gray-700 hover:text-black transition-colors" href="#stats">
          Reports
        </a>
        <button className="btn-press bg-black text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all">
          Submit POC
        </button>
        <div className="w-10 h-10 rounded-full border-2 border-gray-100 bg-gradient-to-br from-secondary/40 to-secondary/80 flex items-center justify-center text-white text-sm font-bold">
          AK
        </div>
      </nav>
    </header>
  );
}
