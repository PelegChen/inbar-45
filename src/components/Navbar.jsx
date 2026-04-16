import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: '🎈 Balloons', end: true },
  { to: '/greeting2', label: '🎉 Confetti' },
  { to: '/greeting3', label: '🌅 Sunrise' },
  { to: '/greeting4', label: '✈️ Plane' },
  { to: '/greeting5', label: '☁️ Clouds' },
  { to: '/greeting6', label: '🌃 City Lights' },
  { to: '/greeting7', label: '🎆 Fireworks' },
  { to: '/greeting8', label: '🐠 Ocean' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-white no-underline font-bold p-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] ${isActive ? 'text-[#646cff] border-b-2 border-[#646cff]' : ''}`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      {/* Desktop nav */}
      <ul className="hidden md:flex list-none p-4 m-0 justify-center gap-8">
        {NAV_LINKS.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger button */}
      <div className="md:hidden flex justify-end p-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <line x1="4" y1="4" x2="24" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="24" y1="4" x2="4" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <line x1="4" y1="7" x2="24" y2="7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="4" y1="14" x2="24" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="4" y1="21" x2="24" y2="21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="md:hidden list-none p-0 m-0 flex flex-col items-end gap-2 px-4 pb-4">
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={linkClass} onClick={closeMenu}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
