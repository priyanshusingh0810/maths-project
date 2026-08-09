import React from 'react';
import { MathFormula } from '../components/MathFormula';
import { BookOpen, ArrowRight } from 'lucide-react';

interface ConceptsProps {
  setActivePage: (page: string) => void;
}

export const Concepts: React.FC<ConceptsProps> = ({ setActivePage }) => {
  const conceptsList = [
    {
      id: 'gcd',
      title: '1. Greatest Common Divisor (GCD) & Euclidean Algorithm',
      def: 'The Greatest Common Divisor of two integers a and b is the largest positive integer that divides both numbers without leaving a remainder. The Euclidean Algorithm is an extremely efficient iterative technique to compute the GCD based on the principle that the GCD of two numbers also divides their difference.',
      formula: '\\gcd(a, b) = \\gcd(b, a \\bmod b) \\quad \\text{until } b = 0',
      example: 'To find gcd(48, 18): \n48 = 18 * 2 + 12 \n18 = 12 * 1 + 6 \n12 = 6 * 2 + 0. \nThe last non-zero remainder is 6, so gcd(48, 18) = 6.',
      app: 'Simplifying fractions to lowest terms, cryptographic keys (RSA), and synchronizing periodic schedules.',
    },
    {
      id: 'congruence',
      title: '2. Modular Congruence',
      def: 'Two integers a and b are said to be congruent modulo m (where m is a positive integer) if their difference (a - b) is an integer multiple of m. In other terms, dividing a and b by modulus m results in the identical remainder.',
      formula: 'a \\equiv b \\pmod{m} \\iff m \\mid (a - b)',
      example: 'For 17 ≡ 5 (mod 12): \n17 mod 12 = 5 \n5 mod 12 = 5. \nSince both remainders are 5, 17 is congruent to 5 modulo 12.',
      app: 'Clock arithmetic, calendar computation cycles, hash table algorithms in computer science, and symmetric cryptography.',
    },
    {
      id: 'complex',
      title: '3. Complex Number Algebra',
      def: 'A complex number is a number that can be expressed in the form a + bi, where a and b are real numbers, and i represents the imaginary unit (i^2 = -1). Geometrically, complex numbers map to a 2D coordinate space called the Complex Plane, where the x-axis represents the real parts and the y-axis represents the imaginary parts.',
      formula: 'z = a + bi \\implies |z| = \\sqrt{a^2 + b^2}, \\quad \\theta = \\operatorname{atan2}(b, a)',
      example: 'For addition: (2 + 3i) + (1 + 4i) = (2 + 1) + (3 + 4)i = 3 + 7i.',
      app: 'AC electrical circuit design, audio signal processing (Fourier Transforms), quantum physics, and computer graphics pathfinder algorithms.',
    },
    {
      id: 'permutation',
      title: '4. Permutations (Order Matters)',
      def: 'A permutation is an arrangement of all or part of a set of objects in a specific sequence or order. In permutations, different orderings of the identical items are counted as distinct arrangements.',
      formula: 'nPr = P(n, r) = \\frac{n!}{(n - r)!}',
      example: 'To choose and arrange 3 items out of 5: \n5P3 = 5! / (5 - 3)! = 5! / 2! = 120 / 2 = 60.',
      app: 'Creating secure login passwords (where sequence matters), ranking lists, task scheduling queues, and database key arrangements.',
    },
    {
      id: 'combination',
      title: '5. Combinations (Order Does Not Matter)',
      def: 'A combination is a selection of items from a larger pool where the order of selection does not matter. Unlike permutations, choosing groups {A, B} and {B, A} represent the identical combination.',
      formula: 'nCr = C(n, r) = \\frac{n!}{r!(n - r)!}',
      example: 'To select a committee of 3 people out of 5: \n5C3 = 5! / [3!(5 - 3)!] = 120 / [6 * 2] = 10.',
      app: 'Forming sports teams or committees, selecting lottery number grids, random statistical sampling, and computing game probabilities.',
    },
    {
      id: 'limit',
      title: '6. Limits (Foundations of Calculus)',
      def: 'The limit of a function is a fundamental concept in calculus and analysis concerning the behavior of that function near a particular input point. It represents the value f(x) approaches as the variable x approaches a specific value a.',
      formula: '\\lim_{x \\to a^-} f(x) = L \\text{ and } \\lim_{x \\to a^+} f(x) = L \\iff \\lim_{x \\to a} f(x) = L',
      example: 'Evaluating the limit of (x^2 - 4)/(x - 2) as x approaches 2: \nSimplify the rational function: (x-2)(x+2)/(x-2) = x+2 for x != 2. \nDirectly substitute x = 2: 2 + 2 = 4.',
      app: 'Calculating instantaneous velocity in physics, optimization problems in economics, determining slope curvature in engineering, and machine learning gradients.',
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-indigo-55 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 rounded-2xl flex items-center justify-center text-indigo-650 dark:text-indigo-400 mx-auto shadow-sm">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Syllabus Concept Repository
        </h1>
        <p className="text-slate-655 dark:text-slate-400 text-sm max-w-xl mx-auto">
          Review core definitions, formulas, and examples mapping to Sem-V Basics of Mathematics in Real Life-IV syllabus.
        </p>
      </div>

      {/* Concept Cards */}
      <div className="space-y-8">
        {conceptsList.map((concept) => (
          <div
            key={concept.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-850 dark:text-slate-100">
                {concept.title}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                {concept.def}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
              {/* Formula Panel */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 block">
                  LaTeX Formula
                </span>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/50 rounded-xl p-3 inline-block font-medium">
                  <MathFormula formula={concept.formula} block />
                </div>
              </div>

              {/* Example Panel */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400 block">
                  Step Example
                </span>
                <pre className="text-xs text-slate-700 dark:text-slate-350 font-mono whitespace-pre-line leading-relaxed bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/50 p-3 rounded-xl">
                  {concept.example}
                </pre>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-slate-100 dark:border-slate-800 gap-4">
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                <strong>Real Life:</strong> {concept.app}
              </div>

              <button
                onClick={() => setActivePage(concept.id)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow hover:shadow-md transition-all self-end sm:self-auto cursor-pointer"
              >
                Try Interactive Calculator
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
