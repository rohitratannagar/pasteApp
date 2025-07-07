import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, ClipboardPaste } from 'lucide-react';

const Navbar = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-1 rounded-md text-base font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-700 text-white'
        : 'text-slate-200 hover:bg-slate-700 hover:text-white'
    }`;

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo / Brand */}
        <div className="text-xl font-bold flex items-center gap-2 text-blue-400">
          <ClipboardPaste size={24} />
          <span>PasteVault</span>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <NavLink to="/" className={linkStyle}>
            <Home size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/pastes" className={linkStyle}>
            <FileText size={18} />
            <span>Pastes</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
