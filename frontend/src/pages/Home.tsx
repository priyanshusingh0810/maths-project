import React from 'react';
import { ArrowRight, Binary, CircleDot, Compass, Shuffle, Layers, Activity, Sparkles, Zap, BookOpen, BarChart3, Eye, CheckCircle } from 'lucide-react';

interface HomeProps {
  setActivePage: (page: string) => void;
  setUnitFilter: (unit: 'all' | 'unit1' | 'unit2') => void;
}

export const Home: React.FC<HomeProps> = ({ setActivePage, setUnitFilter }) => {
  const exploreAllModules = () => {
    setUnitFilter('all');
    setActivePage('dashboard');
  };

  const modules = [
    {
      id: 'gcd',
      name: 'GCD Calculator',
      desc: 'Euclidean Algorithm visualizer with step-by-step division breakdown.',
      unit: 'Unit I',
      tag: 'Number Theory',
      icon: Binary,
      gradient: 'linear-gradient(135deg, #3B82F6, #6C63FF)',
      glow: 'rgba(108,99,255,0.3)',
      pillClass: 'neon-pill-indigo',
    },
    {
      id: 'congruence',
      name: 'Congruence Calculator',
      desc: 'Evaluate a ≡ b (mod m) with an interactive modular clock-dial visualizer.',
      unit: 'Unit I',
      tag: 'Modular Arithmetic',
      icon: CircleDot,
      gradient: 'linear-gradient(135deg, #6C63FF, #A855F7)',
      glow: 'rgba(168,85,247,0.3)',
      pillClass: 'neon-pill-purple',
    },
    {
      id: 'complex',
      name: 'Complex Number Explorer',
      desc: 'Arithmetic & Cartesian-polar translations on an interactive complex plane.',
      unit: 'Unit I',
      tag: 'Algebra',
      icon: Compass,
      gradient: 'linear-gradient(135deg, #A855F7, #EC4899)',
      glow: 'rgba(236,72,153,0.3)',
      pillClass: 'neon-pill-rose',
    },
    {
      id: 'permutation',
      name: 'Permutation Calculator',
      desc: 'Determine nPr with step-by-step factorial expansions and slot animations.',
      unit: 'Unit II',
      tag: 'Combinatorics',
      icon: Shuffle,
      gradient: 'linear-gradient(135deg, #14B8A6, #10B981)',
      glow: 'rgba(16,185,129,0.3)',
      pillClass: 'neon-pill-teal',
    },
    {
      id: 'combination',
      name: 'Combination Calculator',
      desc: 'Calculate nCr where order doesn\'t matter and compare outcomes vs. nPr.',
      unit: 'Unit II',
      tag: 'Combinatorics',
      icon: Layers,
      gradient: 'linear-gradient(135deg, #10B981, #06B6D4)',
      glow: 'rgba(6,182,212,0.3)',
      pillClass: 'neon-pill-emerald',
    },
    {
      id: 'limit',
      name: 'Limit Calculator',
      desc: 'Compute left/right/two-sided limits via SymPy with an animated graph.',
      unit: 'Unit II',
      tag: 'Calculus',
      icon: Activity,
      gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
      glow: 'rgba(239,68,68,0.3)',
      pillClass: 'neon-pill-amber',
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Interactive Learning',
      desc: 'Adjust parameters dynamically and observe real-time computational responses.',
      color: '#6C63FF',
    },
    {
      icon: BookOpen,
      title: 'Step-by-Step Solutions',
      desc: 'Every algebraic substitution, division, and simplification explained clearly.',
      color: '#A855F7',
    },
    {
      icon: Eye,
      title: 'Visual Understanding',
      desc: 'Modular wheels, complex planes, combinatoric grids — geometry made tangible.',
      color: '#EC4899',
    },
    {
      icon: BarChart3,
      title: 'Real-Life Context',
      desc: 'Number theory, cryptography, signal processing, and ML gradients explained.',
      color: '#10B981',
    },
    {
      icon: CheckCircle,
      title: 'Error-Free Validation',
      desc: 'Catches invalid entries instantly — negative modulus, zero denominators, and more.',
      color: '#06B6D4',
    },
    {
      icon: Sparkles,
      title: 'Report-Ready Displays',
      desc: 'Clean KaTeX-rendered formulas designed for sharp academic report screenshots.',
      color: '#F59E0B',
    },
  ];

  // Floating math particles
  const particles = ['∑', 'π', '∞', '∫', 'Δ', '√', 'λ', '∂', 'φ', 'θ', 'ε', 'σ'];

  return (
    <div className="relative overflow-hidden">

      {/* Floating Math Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((sym, i) => (
          <span
            key={i}
            className="math-particle"
            style={{
              left: `${(i * 8.5 + 3) % 100}%`,
              top: `${(i * 11 + 5) % 80}%`,
              fontSize: `${24 + (i % 4) * 16}px`,
              animationDuration: `${8 + (i % 5) * 3}s`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      {/* ── HERO SECTION ── */}
      <section className="hero-gradient relative pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          {/* Badge */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 neon-pill neon-pill-indigo"
            style={{ fontSize: '11px' }}
          >
            <Sparkles className="w-3 h-3" />
            Smt. CHM College (Autonomous) · T.Y.B.Sc. Data Science
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-100 section-heading leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            <span style={{ color: 'rgba(241,245,249,0.95)' }}>
              Math in Action
            </span>
            <br />
            <span className="gradient-text">
              Interactive Mathematics Explorer
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up delay-200 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'rgba(148,163,184,0.85)' }}
          >
            Explore 6 mathematical concepts through calculations, step-by-step solutions,
            interactive visualizations, and real-world applications.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <button
              onClick={exploreAllModules}
              className="btn-glow w-full sm:w-auto flex items-center justify-center gap-2 text-base"
              id="cta-explore"
            >
              <Sparkles className="w-4 h-4" />
              Explore Modules
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('concepts')}
              className="btn-outline-glow w-full sm:w-auto flex items-center justify-center gap-2 text-base"
              id="cta-concepts"
            >
              <BookOpen className="w-4 h-4" />
              Review Concepts
            </button>
          </div>

          {/* Stats Row */}
          <div
            className="animate-fade-up delay-400 flex flex-wrap justify-center gap-8 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            {[
              { label: 'Syllabus Units', value: '2' },
              { label: 'Math Modules', value: '6' },
              { label: 'Visualizations', value: '6' },
              { label: 'Learning Steps', value: '∞' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="section-heading text-3xl font-black gradient-text-static"
                >
                  {s.value}
                </div>
                <div className="text-xs mt-1" style={{ color: 'rgba(100,116,139,0.8)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULE GRID ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14 animate-fade-up">
          <span className="neon-pill neon-pill-purple">Core Modules</span>
          <h2
            className="section-heading text-4xl font-extrabold mt-3"
            style={{ color: 'rgba(241,245,249,0.95)' }}
          >
            Choose Your Calculator
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgba(100,116,139,0.9)' }}>
            Select a topic to open its calculator, step-by-step solver, and interactive visualizer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, idx) => {
            const IconComponent = mod.icon;
            return (
              <div
                key={mod.id}
                className={`glass-card animate-fade-up delay-${Math.min((idx + 1) * 100, 600)} flex flex-col`}
                style={{ padding: '28px', minHeight: '260px' }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`neon-pill ${mod.pillClass} text-[10px]`}>{mod.unit}</span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: 'rgba(100,116,139,0.8)' }}
                  >
                    {mod.tag}
                  </span>
                </div>

                {/* Icon + Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center icon-glow shrink-0"
                    style={{
                      background: mod.gradient,
                      boxShadow: `0 8px 24px ${mod.glow}`,
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3
                    className="font-bold text-lg leading-tight"
                    style={{ color: 'rgba(241,245,249,0.95)', fontFamily: "'Outfit', sans-serif" }}
                  >
                    {mod.name}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-6"
                  style={{ color: 'rgba(100,116,139,0.9)' }}
                >
                  {mod.desc}
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => setActivePage(mod.id)}
                  id={`module-btn-${mod.id}`}
                  className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 group"
                  style={{
                    background: 'rgba(108,99,255,0.1)',
                    border: '1px solid rgba(108,99,255,0.25)',
                    color: '#a5b4fc',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(168,85,247,0.2))';
                    el.style.borderColor = 'rgba(108,99,255,0.5)';
                    el.style.color = 'white';
                    el.style.boxShadow = `0 8px 24px ${mod.glow}`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(108,99,255,0.1)';
                    el.style.borderColor = 'rgba(108,99,255,0.25)';
                    el.style.color = '#a5b4fc';
                    el.style.boxShadow = 'none';
                  }}
                >
                  Open Calculator
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'rgba(6,9,20,0.6)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-14 animate-fade-up">
            <span className="neon-pill neon-pill-emerald">Why This App?</span>
            <h2
              className="section-heading text-4xl font-extrabold mt-3"
              style={{ color: 'rgba(241,245,249,0.95)' }}
            >
              Engineered to Teach Mathematics
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgba(100,116,139,0.9)' }}>
              Linking mathematical theory to computational workflows for intuitive learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <div
                  key={idx}
                  className={`animate-fade-up delay-${Math.min((idx + 1) * 100, 600)} p-6 rounded-2xl transition-all duration-300 group`}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(108,99,255,0.05)';
                    el.style.borderColor = 'rgba(108,99,255,0.2)';
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.02)';
                    el.style.borderColor = 'rgba(255,255,255,0.05)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `${feat.color}20`,
                      border: `1px solid ${feat.color}40`,
                    }}
                  >
                    <IconComponent className="w-5 h-5" style={{ color: feat.color }} />
                  </div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: 'rgba(226,232,240,0.95)', fontFamily: "'Outfit', sans-serif" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(100,116,139,0.9)' }}>
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BOTTOM ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-up">
          <h2
            className="section-heading text-3xl font-extrabold"
            style={{ color: 'rgba(241,245,249,0.95)' }}
          >
            Ready to Explore?
          </h2>
          <p style={{ color: 'rgba(100,116,139,0.9)' }} className="text-sm">
            Jump into any calculator and start solving problems step-by-step.
          </p>
          <button
            onClick={exploreAllModules}
            className="btn-glow mx-auto flex items-center gap-2"
            id="cta-bottom"
          >
            View All Modules
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
