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
      accentColor: 'var(--accent-primary)',
      bgColor: 'var(--glow-primary)',
    },
    {
      id: 'congruence',
      name: 'Congruence Calculator',
      desc: 'Evaluate a ≡ b (mod m) with an interactive modular clock-dial visualizer.',
      unit: 'Unit I',
      tag: 'Modular Arithmetic',
      icon: CircleDot,
      accentColor: 'var(--accent-secondary)',
      bgColor: 'var(--glow-secondary)',
    },
    {
      id: 'complex',
      name: 'Complex Number Explorer',
      desc: 'Arithmetic & Cartesian-polar translations on an interactive complex plane.',
      unit: 'Unit I',
      tag: 'Algebra',
      icon: Compass,
      accentColor: 'var(--accent-tertiary)',
      bgColor: 'rgba(14,165,233,0.10)',
    },
    {
      id: 'permutation',
      name: 'Permutation Calculator',
      desc: 'Determine nPr with step-by-step factorial expansions and slot animations.',
      unit: 'Unit II',
      tag: 'Combinatorics',
      icon: Shuffle,
      accentColor: 'var(--accent-emerald)',
      bgColor: 'var(--glow-emerald)',
    },
    {
      id: 'combination',
      name: 'Combination Calculator',
      desc: 'Calculate nCr where order doesn\'t matter and compare outcomes vs. nPr.',
      unit: 'Unit II',
      tag: 'Combinatorics',
      icon: Layers,
      accentColor: 'var(--accent-cyan)',
      bgColor: 'rgba(2,132,199,0.10)',
    },
    {
      id: 'limit',
      name: 'Limit Calculator',
      desc: 'Compute left/right/two-sided limits via SymPy with an animated graph.',
      unit: 'Unit II',
      tag: 'Calculus',
      icon: Activity,
      accentColor: 'var(--accent-amber)',
      bgColor: 'rgba(180,83,9,0.08)',
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Interactive Learning',
      desc: 'Adjust parameters dynamically and observe real-time computational responses.',
    },
    {
      icon: BookOpen,
      title: 'Step-by-Step Solutions',
      desc: 'Every algebraic substitution, division, and simplification explained clearly.',
    },
    {
      icon: Eye,
      title: 'Visual Understanding',
      desc: 'Modular wheels, complex planes, combinatoric grids — geometry made tangible.',
    },
    {
      icon: BarChart3,
      title: 'Real-Life Context',
      desc: 'Number theory, cryptography, signal processing, and ML gradients explained.',
    },
    {
      icon: CheckCircle,
      title: 'Error-Free Validation',
      desc: 'Catches invalid entries instantly — negative modulus, zero denominators, and more.',
    },
    {
      icon: Sparkles,
      title: 'Report-Ready Displays',
      desc: 'Clean KaTeX-rendered formulas designed for sharp academic report screenshots.',
    },
  ];

  return (
    <div className="relative overflow-hidden">

      {/* ── HERO ── */}
      <section className="hero-gradient relative pt-24 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">

          {/* Eyebrow Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 mb-6"
            style={{
              background: 'var(--glow-primary)',
              border: '1px solid var(--border-glow)',
              color: 'var(--accent-primary)',
              borderRadius: '6px',
              padding: '5px 14px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
            <Sparkles className="w-3 h-3" />
            Smt. CHM College (Autonomous) · T.Y.B.Sc. Data Science
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-100 section-heading mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)', lineHeight: 1.1 }}
          >
            <span style={{ color: 'var(--text-primary)' }}>Math in Action —</span>
            <br />
            <span className="gradient-text">Interactive Mathematics Explorer</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up delay-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--text-muted)' }}
          >
            Explore 6 mathematical concepts through calculations, step-by-step solutions,
            interactive visualizations, and real-world applications.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 justify-center items-center mb-14">
            <button
              onClick={exploreAllModules}
              className="btn-glow flex items-center gap-2"
              id="cta-explore"
            >
              Explore All Modules
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('simulations')}
              className="btn-glow flex items-center gap-2"
              id="cta-simulations"
              style={{ background: 'var(--accent-emerald)' }}
            >
              <Activity className="w-4 h-4" />
              Live Simulations
            </button>
            <button
              onClick={() => setActivePage('concepts')}
              className="btn-outline-glow flex items-center gap-2"
              id="cta-concepts"
            >
              <BookOpen className="w-4 h-4" />
              Review Concepts
            </button>
          </div>

          {/* Stats Row */}
          <div
            className="animate-fade-up delay-400 flex flex-wrap justify-center gap-10 pt-10"
            style={{ borderTop: '1px solid var(--border-default)' }}
          >
            {[
              { label: 'Syllabus Units', value: '2' },
              { label: 'Math Modules', value: '6' },
              { label: 'Visualizations', value: '6' },
              { label: 'Learning Steps', value: '∞' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black gradient-text-static mb-1">{s.value}</div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <hr className="gradient-divider" />

      {/* ── MODULE GRID ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 animate-fade-up">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1.5 rounded-md"
            style={{
              background: 'var(--glow-primary)',
              border: '1px solid var(--border-glow)',
              color: 'var(--accent-primary)',
              borderRadius: '6px',
            }}
          >
            Core Modules
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl mb-3">
            Choose Your Calculator
          </h2>
          <p className="text-sm max-w-lg" style={{ color: 'var(--text-muted)' }}>
            Select a topic to open its calculator, step-by-step solver, and interactive visualizer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, idx) => {
            const IconComponent = mod.icon;
            return (
              <div
                key={mod.id}
                className={`glass-card animate-fade-up delay-${Math.min((idx + 1) * 100, 600)} flex flex-col`}
                style={{ padding: '24px' }}
              >
                {/* Top row: Unit tag + Topic tag */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {mod.unit}
                  </span>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-faint)' }}
                  >
                    {mod.tag}
                  </span>
                </div>

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center icon-glow shrink-0"
                    style={{
                      background: mod.bgColor,
                      border: `1px solid ${mod.accentColor}30`,
                    }}
                  >
                    <IconComponent className="w-5 h-5" style={{ color: mod.accentColor }} />
                  </div>
                  <h3
                    className="font-bold text-base leading-tight"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {mod.name}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {mod.desc}
                </p>

                {/* CTA */}
                <button
                  onClick={() => setActivePage(mod.id)}
                  id={`module-btn-${mod.id}`}
                  className="btn-outline-glow text-sm flex items-center justify-center gap-2 group w-full"
                  style={{ padding: '10px 16px' }}
                >
                  Open Calculator
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <hr className="gradient-divider" />

      {/* ── FEATURES ── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-fade-up">
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1.5"
              style={{
                background: 'var(--glow-emerald)',
                border: '1px solid rgba(5,150,105,0.25)',
                color: 'var(--accent-emerald)',
                borderRadius: '6px',
              }}
            >
              Why This App?
            </div>
            <h2 className="section-heading text-3xl sm:text-4xl mb-3">
              Engineered to Teach Mathematics
            </h2>
            <p className="text-sm max-w-lg" style={{ color: 'var(--text-muted)' }}>
              Linking mathematical theory to computational workflows for intuitive learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <div
                  key={idx}
                  className={`animate-fade-up delay-${Math.min((idx + 1) * 100, 600)} p-5 rounded-xl group`}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glow)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)';
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-default)',
                    }}
                  >
                    <IconComponent className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h3
                    className="font-semibold text-sm mb-2"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-2xl mx-auto text-center p-10 rounded-2xl animate-fade-up"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <h2 className="section-heading text-2xl sm:text-3xl mb-3">
            Ready to Begin?
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            Jump into any calculator and start solving problems step-by-step with SymPy-powered computations.
          </p>
          <button
            onClick={exploreAllModules}
            className="btn-glow inline-flex items-center gap-2"
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
