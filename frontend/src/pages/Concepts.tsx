import React from 'react';
import { MathFormula } from '../components/MathFormula';
import { BookOpen, ArrowRight, Binary, CircleDot, Compass, Shuffle, Layers, Activity } from 'lucide-react';

interface ConceptsProps {
  setActivePage: (page: string) => void;
}

export const Concepts: React.FC<ConceptsProps> = ({ setActivePage }) => {
  const conceptsList = [
    {
      id: 'gcd',
      title: 'Greatest Common Divisor (GCD) & Euclidean Algorithm',
      unit: 'Unit I',
      icon: Binary,
      color: '#6C63FF',
      glow: 'rgba(108,99,255,0.3)',
      def: 'The Greatest Common Divisor of two integers a and b is the largest positive integer that divides both numbers without leaving a remainder. The Euclidean Algorithm is an extremely efficient iterative technique to compute the GCD based on the principle that the GCD of two numbers also divides their difference.',
      formula: '\\gcd(a, b) = \\gcd(b,\\; a \\bmod b) \\quad \\text{until } b = 0',
      example: 'gcd(48, 18):\n48 = 18 × 2 + 12\n18 = 12 × 1 + 6\n12 = 6 × 2 + 0\n→ gcd = 6',
      app: 'Simplifying fractions, RSA cryptography, and synchronizing periodic schedules.',
    },
    {
      id: 'congruence',
      title: 'Modular Congruence',
      unit: 'Unit I',
      icon: CircleDot,
      color: '#A855F7',
      glow: 'rgba(168,85,247,0.3)',
      def: 'Two integers a and b are congruent modulo m if their difference (a − b) is an integer multiple of m. Equivalently, dividing a and b by m yields the same remainder.',
      formula: 'a \\equiv b \\pmod{m} \\iff m \\mid (a - b)',
      example: '17 ≡ 5 (mod 12):\n17 mod 12 = 5\n5 mod 12 = 5\n→ Both have remainder 5',
      app: 'Clock arithmetic, calendar computations, hash tables, and symmetric cryptography.',
    },
    {
      id: 'complex',
      title: 'Complex Number Algebra',
      unit: 'Unit I',
      icon: Compass,
      color: '#EC4899',
      glow: 'rgba(236,72,153,0.3)',
      def: 'A complex number has the form z = a + bi where a, b ∈ ℝ and i² = -1. Geometrically, complex numbers are points on the 2D complex plane — real on x-axis, imaginary on y-axis.',
      formula: 'z = a + bi \\implies |z| = \\sqrt{a^2 + b^2},\\quad \\theta = \\operatorname{atan2}(b, a)',
      example: 'Addition: (2 + 3i) + (1 + 4i)\n= (2+1) + (3+4)i\n= 3 + 7i',
      app: 'AC circuits, Fourier transforms, quantum physics, and computer graphics.',
    },
    {
      id: 'permutation',
      title: 'Permutations (Order Matters)',
      unit: 'Unit II',
      icon: Shuffle,
      color: '#10B981',
      glow: 'rgba(16,185,129,0.3)',
      def: 'A permutation is an ordered arrangement of r items chosen from n distinct items. Different orderings of the same items are counted as distinct arrangements.',
      formula: 'P(n, r) = nPr = \\dfrac{n!}{(n - r)!}',
      example: '5P3 = 5!/(5-3)!\n= 5!/2!\n= 120/2 = 60',
      app: 'Secure passwords, ranking lists, task scheduling queues.',
    },
    {
      id: 'combination',
      title: 'Combinations (Order Does Not Matter)',
      unit: 'Unit II',
      icon: Layers,
      color: '#06B6D4',
      glow: 'rgba(6,182,212,0.3)',
      def: 'A combination is an unordered selection of r items from n distinct items. Unlike permutations, {A, B} and {B, A} represent the same combination.',
      formula: 'C(n, r) = nCr = \\dfrac{n!}{r!\\,(n - r)!}',
      example: '5C3 = 5!/[3!(5-3)!]\n= 120/[6 × 2]\n= 10',
      app: 'Sports teams, lottery grids, statistical sampling, and game probabilities.',
    },
    {
      id: 'limit',
      title: 'Limits (Foundations of Calculus)',
      unit: 'Unit II',
      icon: Activity,
      color: '#F59E0B',
      glow: 'rgba(245,158,11,0.3)',
      def: 'The limit of a function describes the value f(x) approaches as x approaches a specific point. The two-sided limit exists only when both left and right limits agree at that point.',
      formula: '\\lim_{x \\to a^-}f(x) = L \\text{ and } \\lim_{x \\to a^+}f(x) = L \\iff \\lim_{x \\to a}f(x) = L',
      example: 'lim(x→2) of (x²-4)/(x-2):\nFactor: (x-2)(x+2)/(x-2) = x+2\nSubstitute: 2+2 = 4',
      app: 'Instantaneous velocity, optimization, engineering curvature, and ML gradients.',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">

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
          <BookOpen className="w-7 h-7" style={{ color: '#a5b4fc' }} />
        </div>
        <h1
          className="section-heading text-4xl sm:text-5xl font-black"
          style={{ color: 'rgba(241,245,249,0.95)' }}
        >
          Syllabus <span className="gradient-text-static">Concept Repository</span>
        </h1>
        <p className="text-sm max-w-xl mx-auto" style={{ color: 'rgba(100,116,139,0.9)' }}>
          Review core definitions, formulas, and examples from Sem-V Basics of Mathematics in Real Life-IV.
        </p>
      </div>

      {/* Concept Cards */}
      <div className="space-y-6">
        {conceptsList.map((concept, idx) => {
          const IconComponent = concept.icon;
          return (
            <div
              key={concept.id}
              className={`concept-card animate-fade-up delay-${Math.min((idx + 1) * 100, 600)}`}
            >
              {/* Top accent line */}
              <div className="concept-card-accent" />

              <div className="p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${concept.color}18`,
                      border: `1px solid ${concept.color}35`,
                      boxShadow: `0 6px 20px ${concept.glow}`,
                    }}
                  >
                    <IconComponent className="w-6 h-6" style={{ color: concept.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                          background: `${concept.color}18`,
                          border: `1px solid ${concept.color}30`,
                          color: concept.color,
                        }}
                      >
                        {concept.unit}
                      </span>
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-extrabold"
                      style={{ color: 'rgba(241,245,249,0.95)', fontFamily: "'Outfit', sans-serif" }}
                    >
                      {concept.title}
                    </h2>
                  </div>
                </div>

                {/* Definition */}
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: 'rgba(148,163,184,0.9)' }}
                >
                  {concept.def}
                </p>

                {/* Formula + Example Grid */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {/* Formula */}
                  <div className="space-y-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest block"
                      style={{ color: '#a5b4fc' }}
                    >
                      LaTeX Formula
                    </span>
                    <div className="math-display-block">
                      <MathFormula formula={concept.formula} block />
                    </div>
                  </div>

                  {/* Example */}
                  <div className="space-y-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest block"
                      style={{ color: '#34d399' }}
                    >
                      Step Example
                    </span>
                    <pre
                      className="text-xs font-mono whitespace-pre-line leading-relaxed p-4 rounded-xl"
                      style={{
                        background: 'rgba(16,185,129,0.05)',
                        border: '1px solid rgba(16,185,129,0.15)',
                        color: 'rgba(203,213,225,0.9)',
                      }}
                    >
                      {concept.example}
                    </pre>
                  </div>
                </div>

                {/* Footer Row */}
                <div
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div className="text-xs sm:text-sm leading-relaxed" style={{ color: 'rgba(100,116,139,0.85)' }}>
                    <span
                      className="font-bold mr-1"
                      style={{ color: concept.color }}
                    >
                      Real Life:
                    </span>
                    {concept.app}
                  </div>
                  <button
                    onClick={() => setActivePage(concept.id)}
                    id={`concept-btn-${concept.id}`}
                    className="btn-glow flex items-center gap-2 text-xs sm:text-sm py-2.5 px-5 shrink-0"
                  >
                    Try Calculator
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
