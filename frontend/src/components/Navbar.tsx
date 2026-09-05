import React, { useState, useEffect } from 'react';
import { Menu, X, Sigma, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  setUnitFilter: (unit: 'all' | 'unit1' | 'unit2') => void;
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  setUnitFilter,
  theme,
  toggleTheme,
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
    { label: 'Simulations', action: () => navigateTo('simulations'), page: 'simulations' },
    { label: 'Concepts', action: () => navigateTo('concepts'), page: 'concepts' },
    { label: 'Help', action: () => navigateTo('help'), page: 'help' },
  ];

  const isActive = (item: { page: string }) => {
    if (item.page === 'home' && activePage === 'home') return true;
    if (item.page === 'dashboard' && activePage === 'dashboard') return true;
    if (item.page === 'simulations' && activePage === 'simulations') return true;
    if (item.page === 'concepts' && activePage === 'concepts') return true;
    if (item.page === 'help' && activePage === 'help') return true;
    return false;
  };

  const navBg = theme === 'dark'
    ? scrolled ? 'rgba(10,15,26,0.97)' : 'rgba(10,15,26,0.85)'
    : scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)';

  const borderColor = theme === 'dark'
    ? 'rgba(255,255,255,0.07)'
    : 'rgba(0,0,0,0.07)';

  const shadowVal = scrolled
    ? theme === 'dark'
      ? '0 4px 24px rgba(0,0,0,0.5)'
      : '0 4px 24px rgba(0,0,0,0.08)'
    : 'none';

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: navBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${borderColor}`,
        boxShadow: shadowVal,
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
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'var(--accent-primary)',
                boxShadow: '0 2px 8px var(--glow-primary)',
              }}
            >
              <Sigma className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <span
                className="font-bold tracking-tight text-sm leading-none block"
                style={{ color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}
              >
                Math in Action
              </span>
              <span
                className="text-[10px] font-medium uppercase tracking-widest block mt-0.5"
                style={{ color: 'var(--text-faint)' }}
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
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer"
                style={{
                  color: isActive(item) ? 'var(--accent-primary)' : 'var(--text-muted)',
                  background: isActive(item) ? 'var(--glow-primary)' : 'transparent',
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={e => {
                  if (!isActive(item)) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-secondary)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(item)) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Divider */}
            <div
              className="w-px h-5 mx-2"
              style={{ background: 'var(--border-default)' }}
            />

            {/* College Badge */}
            <span
              className="px-3 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-wider hidden lg:block"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-muted)',
              }}
            >
              T.Y.B.Sc. DS
            </span>

            {/* Theme Toggle */}
            {toggleTheme && theme && (
              <button
                onClick={toggleTheme}
                className="ml-1 p-2 rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  border: '1px solid var(--border-default)',
                }}
                aria-label="Toggle Theme"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-secondary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {toggleTheme && theme && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-all cursor-pointer"
                style={{
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-default)',
                  background: 'transparent',
                }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-all cursor-pointer"
              style={{
                color: 'var(--text-muted)',
                background: isOpen ? 'var(--bg-secondary)' : 'transparent',
                border: '1px solid var(--border-default)',
              }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden px-4 pt-1 pb-4 space-y-1"
          style={{
            borderTop: `1px solid var(--border-default)`,
            background: navBg,
            backdropFilter: 'blur(20px)',
          }}
        >
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer"
              style={{
                color: isActive(item) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                background: isActive(item) ? 'var(--glow-primary)' : 'transparent',
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
