import React from 'react';
import { HelpCircle, Layers, Play, CheckCircle2, RefreshCw, Smartphone } from 'lucide-react';

const sections = [
  {
    icon: Layers,
    colorVar: 'accent-primary',
    title: '1. Navigating the Mathematics Dashboard',
    content: (
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
        Use the top navigation bar to toggle between the <strong className="text-[var(--accent-primary)]">Home Page</strong>, the{' '}
        <strong className="text-[var(--accent-primary)]">All Modules Dashboard</strong>, or specific Units. You can also view
        semantic concept formulations on the <strong className="text-[var(--accent-primary)]">Concepts Page</strong>.
      </p>
    ),
  },
  {
    icon: Play,
    colorVar: 'accent-secondary',
    title: '2. Using "Demo Examples" Mode',
    content: (
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
        Each calculator has a <strong className="text-[var(--accent-secondary)]">"Try Example"</strong> preset button that
        pre-populates all inputs with optimal demonstration values — e.g., GCD of 48 & 18, modular congruence
        modulus 12, limits of holes — to demo immediately during vivas or presentations.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    colorVar: 'accent-tertiary',
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
            className="p-3 rounded-xl text-sm bg-[var(--bg-surface)] border border-[var(--border-default)]"
          >
            <strong className="text-[var(--accent-tertiary)]">{item.title}:</strong>{' '}
            <span className="text-[var(--text-secondary)]">{item.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: CheckCircle2,
    colorVar: 'accent-cyan',
    title: '4. Robust Input Validations & Error States',
    content: (
      <ul className="space-y-2">
        {[
          'Modulo inputs: Modulus must be greater than zero.',
          'Combinatorics: n and r must be non-negative integers; r ≤ n.',
          'Complex Operations: Division by zero is detected and blocked with clear notices.',
          'Calculus limits: Functions must be mathematically evaluable. Asymptotes are identified and labelled.',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <span className="text-[var(--accent-cyan)] mt-[2px] shrink-0">→</span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: Smartphone,
    colorVar: 'accent-amber',
    title: '5. Accessibility & Responsiveness',
    content: (
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
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
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto bg-[var(--glow-primary)] border border-[var(--border-glow)]"
          style={{
            boxShadow: '0 8px 30px var(--glow-primary)',
          }}
        >
          <HelpCircle className="w-7 h-7 text-[var(--accent-primary)]" />
        </div>
        <h1
          className="section-heading text-4xl sm:text-5xl font-black text-[var(--text-primary)]"
        >
          Help & <span className="gradient-text-static">Documentation</span>
        </h1>
        <p className="text-sm max-w-xl mx-auto text-[var(--text-muted)]">
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
                    background: `color-mix(in srgb, var(--${section.colorVar}) 15%, transparent)`,
                    border: `1px solid color-mix(in srgb, var(--${section.colorVar}) 30%, transparent)`,
                  }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: `var(--${section.colorVar})` }} />
                </div>
                <h2
                  className="text-lg font-bold text-[var(--text-primary)]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
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

