import React from 'react';
import { HelpCircle, Layers, Play, CheckCircle2, RefreshCw, Smartphone } from 'lucide-react';

const sections = [
  {
    icon: Layers,
    color: '#6C63FF',
    title: '1. Navigating the Mathematics Dashboard',
    content: (
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.9)' }}>
        Use the top navigation bar to toggle between the <strong style={{ color: '#a5b4fc' }}>Home Page</strong>, the{' '}
        <strong style={{ color: '#a5b4fc' }}>All Modules Dashboard</strong>, or specific Units. You can also view
        semantic concept formulations on the <strong style={{ color: '#a5b4fc' }}>Concepts Page</strong>.
      </p>
    ),
  },
  {
    icon: Play,
    color: '#10B981',
    title: '2. Using "Demo Examples" Mode',
    content: (
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.9)' }}>
        Each calculator has a <strong style={{ color: '#34d399' }}>"Try Example"</strong> preset button that
        pre-populates all inputs with optimal demonstration values — e.g., GCD of 48 & 18, modular congruence
        modulus 12, limits of holes — to demo immediately during vivas or presentations.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    color: '#A855F7',
    title: '3. Interacting with Math Visualizations',
    content: (
      <div className="space-y-3">
        {[
          { title: 'GCD Division Timeline', desc: 'Computes quotients and remainders stacked as visual timeline cards. The final non-zero remainder is highlighted.' },
          { title: 'Congruence Remainder Circle', desc: 'Renders a circle divided into modulo-m parts like a clock. Points show whether a and b share the same sector.' },
          { title: 'Complex Vector Plane', desc: 'Interactive Cartesian plane. Input z₁ and z₂ to watch vectors shift. Plots the resulting sum/product vector.' },
          { title: 'Combinatoric Slots', desc: 'Slot boxes for permutations and grouping bags for combinations — illustrating when order matters.' },
          { title: 'Limit Graphs', desc: 'Plots f(x) with approach arrows from both left and right, clearly showing holes and limit behavior.' },
        ].map((item, i) => (
          <div
            key={i}
            className="p-3 rounded-xl text-sm"
            style={{
              background: 'rgba(168,85,247,0.05)',
              border: '1px solid rgba(168,85,247,0.12)',
            }}
          >
            <strong style={{ color: '#c084fc' }}>{item.title}:</strong>{' '}
            <span style={{ color: 'rgba(148,163,184,0.9)' }}>{item.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: CheckCircle2,
    color: '#06B6D4',
    title: '4. Robust Input Validations & Error States',
    content: (
      <ul className="space-y-2">
        {[
          'Modulo inputs: Modulus must be greater than zero.',
          'Combinatorics: n and r must be non-negative integers; r ≤ n.',
          'Complex Operations: Division by zero is detected and blocked with clear notices.',
          'Calculus limits: Functions must be mathematically evaluable. Asymptotes are identified and labelled.',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(148,163,184,0.9)' }}>
            <span style={{ color: '#67e8f9', marginTop: '2px', flexShrink: 0 }}>→</span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: Smartphone,
    color: '#F59E0B',
    title: '5. Accessibility & Responsiveness',
    content: (
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.9)' }}>
        The application is fully responsive for laptops, tablets, and phones. All interactive SVG graphs are
        scalable and adapt to small layout widths automatically.
      </p>
    ),
  },
];

export const Help: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">

      {/* Page Header */}
      <div className="text-center space-y-4 animate-fade-up">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(168,85,247,0.15))',
            border: '1px solid rgba(108,99,255,0.3)',
            boxShadow: '0 8px 30px rgba(108,99,255,0.2)',
          }}
        >
          <HelpCircle className="w-7 h-7" style={{ color: '#a5b4fc' }} />
        </div>
        <h1
          className="section-heading text-4xl sm:text-5xl font-black"
          style={{ color: 'rgba(241,245,249,0.95)' }}
        >
          Help & <span className="gradient-text-static">Documentation</span>
        </h1>
        <p className="text-sm max-w-xl mx-auto" style={{ color: 'rgba(100,116,139,0.9)' }}>
          Learn how to interact with calculators, adjust visualizations, and interpret mathematical solutions.
        </p>
      </div>

      {/* Guide Sections */}
      <div className="space-y-5">
        {sections.map((section, idx) => {
          const IconComponent = section.icon;
          return (
            <div
              key={idx}
              className={`concept-card animate-fade-up delay-${Math.min((idx + 1) * 100, 600)} p-6 sm:p-8 space-y-4`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${section.color}18`,
                    border: `1px solid ${section.color}30`,
                  }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: section.color }} />
                </div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: 'rgba(241,245,249,0.95)', fontFamily: "'Outfit', sans-serif" }}
                >
                  {section.title}
                </h2>
              </div>
              <div className="pl-13">{section.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
