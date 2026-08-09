import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ModulesDashboard } from './pages/ModulesDashboard';
import { Concepts } from './pages/Concepts';
import { Help } from './pages/Help';

// Mathematical Modules
import { GCDModule } from './modules/GCDModule';
import { CongruenceModule } from './modules/CongruenceModule';
import { ComplexNumberModule } from './modules/ComplexNumberModule';
import { PermutationModule } from './modules/PermutationModule';
import { CombinationModule } from './modules/CombinationModule';
import { LimitModule } from './modules/LimitModule';

function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [unitFilter, setUnitFilter] = useState<'all' | 'unit1' | 'unit2'>('all');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sync dark class on the HTML document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Scroll to top of the page when navigating to a new tab/module
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Page switcher mapping
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} setUnitFilter={setUnitFilter} />;
      case 'dashboard':
        return (
          <ModulesDashboard
            setActivePage={setActivePage}
            unitFilter={unitFilter}
            setUnitFilter={setUnitFilter}
          />
        );
      case 'concepts':
        return <Concepts setActivePage={setActivePage} />;
      case 'help':
        return <Help />;
      case 'gcd':
        return <GCDModule />;
      case 'congruence':
        return <CongruenceModule />;
      case 'complex':
        return <ComplexNumberModule />;
      case 'permutation':
        return <PermutationModule />;
      case 'combination':
        return <CombinationModule />;
      case 'limit':
        return <LimitModule />;
      default:
        return <Home setActivePage={setActivePage} setUnitFilter={setUnitFilter} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        setUnitFilter={setUnitFilter}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main page content container */}
      <main className="flex-grow pb-16">
        <div className="animate-fade-in duration-200">
          {renderActivePage()}
        </div>
      </main>

      {/* Persistent footer */}
      <Footer />
    </div>
  );
}

export default App;
