import React, { useState, useEffect } from 'react';
import { Menu, X, Sigma, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

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

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4 pointer-events-none"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-2xl border",
          scrolled
            ? "w-full max-w-5xl bg-[var(--bg-surface)] backdrop-blur-xl border-[var(--border-glow)] shadow-[var(--shadow-lg)] shadow-[var(--glow-primary)]"
            : "w-full max-w-7xl bg-[var(--bg-card)] backdrop-blur-md border-[var(--border-card)] shadow-[var(--shadow-sm)]"
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--accent-primary)] shadow-[0_0_15px_var(--glow-primary)] transition-transform duration-300 group-hover:scale-110">
                <Sigma className="w-5 h-5 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <span className="font-bold tracking-tight text-[15px] leading-none block text-[var(--text-primary)] font-sans">
                  Math Explorer
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] block mt-0.5 text-[var(--accent-secondary)]">
                  Interactive
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[var(--border-subtle)]">
              {navItems.map((item, idx) => {
                const active = isActive(item);
                return (
                  <button
                    key={idx}
                    onClick={item.action}
                    className="relative px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-200"
                    style={{
                      color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                    }}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[var(--bg-card)] rounded-lg shadow-[var(--shadow-sm)] border border-[var(--border-card)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side Tools */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider hidden md:block border border-[var(--border-default)] text-[var(--text-muted)]">
                T.Y.B.Sc. DS
              </span>

              {toggleTheme && theme && (
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl border border-[var(--border-default)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-glow)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-[var(--border-default)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] transition-all focus:outline-none"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-[var(--border-default)]"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.action}
                    className={cn(
                      "block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                      isActive(item)
                        ? "bg-[var(--glow-primary)] text-[var(--accent-primary)] border border-[var(--border-glow)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
};
