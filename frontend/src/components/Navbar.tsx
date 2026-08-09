import React, { useState, useEffect } from 'react';
import { Menu, X, Sigma } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  setUnitFilter: (unit: 'all' | 'unit1' | 'unit2') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  setUnitFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToDashboard = (unit: 'all' | 'unit1' | 'unit2') => {
    setUnitFilter(unit);
    setActivePage('dashboard');
    setIsOpen(false);
  };

  const navigateTo = (page: string) => {
    setActivePage(page);
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', action: () => navigateTo('home'), page: 'home' },
    { label: 'All Modules', action: () => navigateToDashboard('all'), page: 'dashboard' },
    { label: 'Unit I', action: () => navigateToDashboard('unit1'), page: 'unit1' },
    { label: 'Unit II', action: () => navigateToDashboard('unit2'), page: 'unit2' },
    { label: 'Concepts', action: () => navigateTo('concepts'), page: 'concepts' },
    { label: 'Help', action: () => navigateTo('help'), page: 'help' },
  ];

  const isActive = (item: { page: string }) => {
    if (item.page === 'home' && activePage === 'home') return true;
    if (item.page === 'dashboard' && activePage === 'dashboard') return true;
    if (item.page === 'concepts' && activePage === 'concepts') return true;
    if (item.page === 'help' && activePage === 'help') return true;
    return false;
  };

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? 'rgba(10, 15, 30, 0.92)'
          : 'rgba(10, 15, 30, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(108, 99, 255, 0.12)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 group cursor-pointer"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, #6C63FF, #A855F7)',
                boxShadow: '0 4px 15px rgba(108,99,255,0.4)',
              }}
            >
              <Sigma className="w-5 h-5 text-white" />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)',
                }}
              />
            </div>
            <div className="text-left">
              <span
                className="font-extrabold tracking-tight text-base leading-none block"
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #a5b4fc)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Math in Action
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-widest block mt-0.5"
                style={{ color: 'rgba(148,163,184,0.7)' }}
              >
                Interactive Explorer
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer group"
                style={{
                  color: isActive(item) ? '#a5b4fc' : 'rgba(148,163,184,0.85)',
                  background: isActive(item)
                    ? 'rgba(108,99,255,0.15)'
                    : 'transparent',
                  border: isActive(item)
                    ? '1px solid rgba(108,99,255,0.3)'
                    : '1px solid transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive(item)) {
                    (e.currentTarget as HTMLElement).style.color = 'white';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(item)) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(148,163,184,0.85)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                {item.label}
                {isActive(item) && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #6C63FF, #A855F7)' }}
                  />
                )}
              </button>
            ))}

            {/* University Badge */}
            <div
              className="ml-3 neon-pill neon-pill-indigo hidden lg:flex"
            >
              T.Y.B.Sc. DS
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl transition-all cursor-pointer"
              style={{
                color: 'rgba(148,163,184,0.8)',
                background: isOpen ? 'rgba(108,99,255,0.15)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isOpen && (
        <div
          className="md:hidden px-4 pt-2 pb-4 space-y-1 animate-fade-up"
          style={{
            borderTop: '1px solid rgba(108,99,255,0.1)',
            background: 'rgba(10,15,30,0.95)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer"
              style={{
                color: isActive(item) ? '#a5b4fc' : 'rgba(148,163,184,0.85)',
                background: isActive(item) ? 'rgba(108,99,255,0.15)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
