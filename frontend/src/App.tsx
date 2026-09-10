import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ModulesDashboard } from './pages/ModulesDashboard';
import { Concepts } from './pages/Concepts';
import { Help } from './pages/Help';
import { SimulationsPage } from './pages/SimulationsPage';
import { ParticlesBackground } from './components/ParticlesBackground';

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
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  // Apply theme to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Global mouse tracking for dynamic lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Scroll to top & trigger page animation on navigation
  const navigateTo = (page: string) => {
    if (page !== activePage) {
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Page switcher mapping
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={navigateTo} setUnitFilter={setUnitFilter} />;
      case 'dashboard':
        return (
          <ModulesDashboard
            setActivePage={navigateTo}
            unitFilter={unitFilter}
            setUnitFilter={setUnitFilter}
          />
        );
      case 'concepts':
        return <Concepts setActivePage={navigateTo} />;
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
      case 'simulations':
        return <SimulationsPage />;
      case 'limit':
        return <LimitModule />;
      default:
        return <Home setActivePage={navigateTo} setUnitFilter={setUnitFilter} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative font-sans text-[color:var(--text-primary)]" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Animated background layer */}
      <ParticlesBackground />

      <Navbar 
        activePage={activePage} 
        setActivePage={navigateTo} 
        setUnitFilter={setUnitFilter}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main page content container */}
      <main className="flex-grow pt-24 pb-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent footer */}
      <Footer setActivePage={navigateTo} />
    </div>
  );
}

export default App;
