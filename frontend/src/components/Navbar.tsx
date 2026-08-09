import React, { useState } from 'react';
import { Menu, X, Landmark, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  setUnitFilter: (unit: 'all' | 'unit1' | 'unit2') => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  setUnitFilter,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
    { label: 'Home', action: () => navigateTo('home') },
    { label: 'All Modules', action: () => navigateToDashboard('all') },
    { label: 'Unit I', action: () => navigateToDashboard('unit1') },
    { label: 'Unit II', action: () => navigateToDashboard('unit2') },
    { label: 'Concepts', action: () => navigateTo('concepts') },
    { label: 'Help', action: () => navigateTo('help') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-lg leading-none block">
                Math in Action
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-450 uppercase tracking-widest font-semibold block mt-0.5">
                Interactive Explorer
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  (activePage === 'dashboard' && item.label.includes('Unit') && item.label.includes('I')) || 
                  (activePage === 'dashboard' && item.label === 'All Modules') || 
                  (activePage === 'home' && item.label === 'Home') || 
                  (activePage === 'concepts' && item.label === 'Concepts') || 
                  (activePage === 'help' && item.label === 'Help')
                    ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-655 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-4 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
