import React from 'react';
import { ArrowRight, Binary, CircleDot, Compass, Shuffle, Layers, Activity, Sparkles, Zap, BookOpen, BarChart3, Eye, CheckCircle } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface HomeProps {
  setActivePage: (page: string) => void;
  setUnitFilter: (unit: 'all' | 'unit1' | 'unit2') => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

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
      glow: 'var(--glow-primary)',
    },
    {
      id: 'congruence',
      name: 'Congruence Calculator',
      desc: 'Evaluate a ≡ b (mod m) with an interactive modular clock-dial visualizer.',
      unit: 'Unit I',
      tag: 'Modular Arithmetic',
      icon: CircleDot,
      glow: 'var(--glow-secondary)',
    },
    {
      id: 'complex',
      name: 'Complex Number Explorer',
      desc: 'Arithmetic & Cartesian-polar translations on an interactive complex plane.',
      unit: 'Unit I',
      tag: 'Algebra',
      icon: Compass,
      glow: 'var(--glow-tertiary)',
    },
    {
      id: 'permutation',
      name: 'Permutation Calculator',
      desc: 'Determine nPr with step-by-step factorial expansions and slot animations.',
      unit: 'Unit II',
      tag: 'Combinatorics',
      icon: Shuffle,
      glow: 'var(--glow-emerald)',
    },
    {
      id: 'combination',
      name: 'Combination Calculator',
      desc: 'Calculate nCr where order doesn\'t matter and compare outcomes vs. nPr.',
      unit: 'Unit II',
      tag: 'Combinatorics',
      icon: Layers,
      glow: 'var(--glow-cyan)',
    },
    {
      id: 'limit',
      name: 'Limit Calculator',
      desc: 'Compute left/right/two-sided limits via SymPy with an animated graph.',
      unit: 'Unit II',
      tag: 'Calculus',
      icon: Activity,
      glow: 'var(--glow-amber)',
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
      <section className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8 glass-card px-4 py-2 rounded-full border border-[var(--border-glow)] text-[var(--accent-primary)] text-xs font-bold uppercase tracking-widest shadow-[var(--shadow-glow)]">
            <Sparkles className="w-4 h-4" />
            Smt. CHM College · T.Y.B.Sc. Data Science
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="section-heading mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
          >
            <span className="text-[var(--text-primary)]">Math in Action —</span>
            <br />
            <span className="gradient-text">Interactive Explorer</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12 text-[var(--text-muted)]"
          >
            Explore 6 mathematical concepts through calculations, step-by-step solutions,
            interactive visualizations, and real-world applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exploreAllModules}
              className="btn-glow flex items-center gap-2 text-lg px-8 py-4"
            >
              Explore Modules
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePage('simulations')}
              className="btn-outline-glow flex items-center gap-2 text-lg px-8 py-4"
            >
              <Activity className="w-5 h-5 text-[var(--accent-emerald)]" />
              Live Simulations
            </motion.button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-12 pt-12 border-t border-[var(--border-default)]"
          >
            {[
              { label: 'Syllabus Units', value: '2' },
              { label: 'Math Modules', value: '6' },
              { label: 'Visualizations', value: '6' },
              { label: 'Learning Steps', value: '∞' },
            ].map((s, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="text-4xl font-black gradient-text-static mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_var(--glow-primary)]">{s.value}</div>
                <div className="text-sm font-semibold text-[var(--text-faint)] uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── MODULE GRID ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-2 rounded-lg bg-[var(--glow-primary)] text-[var(--accent-primary)] border border-[var(--border-glow)]">
            Core Modules
          </div>
          <h2 className="section-heading text-4xl sm:text-5xl mb-4">
            Choose Your Calculator
          </h2>
          <p className="text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            Select a topic to open its calculator, step-by-step solver, and interactive visualizer.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {modules.map((mod) => {
            const IconComponent = mod.icon;
            return (
              <motion.div
                key={mod.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="mouse-glow-container glass-card flex flex-col p-8 cursor-pointer group"
                onClick={() => setActivePage(mod.id)}
              >
                {/* Top row: Unit tag + Topic tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-muted)]">
                    {mod.unit}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-primary)] opacity-80 group-hover:opacity-100 transition-opacity">
                    {mod.tag}
                  </span>
                </div>

                {/* Icon + Name */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-default)] group-hover:border-[var(--accent-primary)] group-hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="font-extrabold text-xl leading-tight text-[var(--text-primary)]">
                    {mod.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base leading-relaxed flex-1 mb-8 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                  {mod.desc}
                </p>

                {/* CTA */}
                <div className="mt-auto flex items-center justify-between text-sm font-bold text-[var(--accent-primary)]">
                  <span>Open Calculator</span>
                  <div className="w-8 h-8 rounded-full bg-[var(--glow-primary)] flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Accent for Features */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--glow-primary)] to-transparent opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-2 rounded-lg bg-[var(--glow-emerald)] text-[var(--accent-emerald)] border border-[var(--border-glow)]">
              Why This App?
            </div>
            <h2 className="section-heading text-4xl sm:text-5xl mb-4">
              Engineered to Teach Mathematics
            </h2>
            <p className="text-base text-[var(--text-muted)] max-w-2xl mx-auto">
              Linking mathematical theory to computational workflows for intuitive learning.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-8 rounded-2xl glass-card group hover:border-[var(--accent-secondary)]"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[var(--bg-secondary)] border border-[var(--border-default)] group-hover:bg-[var(--glow-primary)] transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-[var(--accent-primary)] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-[var(--text-primary)]">
                    {feat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring" }}
          className="max-w-4xl mx-auto text-center p-16 rounded-[2rem] glass-card border-[var(--border-glow)] relative overflow-hidden group"
        >
          {/* Animated gradient background inside CTA */}
          <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
          
          <h2 className="section-heading text-4xl sm:text-5xl mb-6 relative z-10">
            Ready to Begin?
          </h2>
          <p className="text-lg mb-10 text-[var(--text-muted)] max-w-2xl mx-auto relative z-10">
            Jump into any calculator and start solving problems step-by-step with interactive visualizations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exploreAllModules}
            className="btn-glow inline-flex items-center gap-3 text-lg px-10 py-5 relative z-10"
          >
            Start Exploring Now
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};
