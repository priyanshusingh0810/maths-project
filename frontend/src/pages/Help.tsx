import React from 'react';
import { HelpCircle, Layers, Play, CheckCircle2, RefreshCw, Smartphone } from 'lucide-react';

export const Help: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 rounded-2xl flex items-center justify-center text-indigo-650 dark:text-indigo-400 mx-auto shadow-sm">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Help &amp; Documentation
        </h1>
        <p className="text-slate-655 dark:text-slate-400 text-sm max-w-xl mx-auto">
          Learn how to interact with calculators, adjust visualizations, and interpret mathematical solutions.
        </p>
      </div>

      {/* Guide Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Navigating the Explorer */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            1. Navigating the Mathematics Dashboard
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
            Use the top navigation bar to toggle between the <strong>Home Page</strong>, the <strong>All Modules Dashboard</strong>, 
            or specific Units. You can also view semantic concept formulations on the <strong>Concepts Page</strong>.
          </p>
        </div>

        {/* Demo Examples Set */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            2. Using "Demo Examples" Mode (Vivas &amp; Presentations)
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
            To show calculators immediately, we provide a <strong>"Try Example"</strong> preset button inside each calculator. 
            Clicking it pre-populates all inputs with optimal demonstration values (e.g. GCD of 48 &amp; 18, modular congruence modulus 12, limits of holes) to let you demo immediately.
          </p>
        </div>

        {/* Visualizations Walkthrough */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-500" />
            3. Interacting with Math Visualizations
          </h2>
          <div className="pl-7 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="bg-slate-50 dark:bg-slate-950/45 p-3 rounded-xl border border-slate-200/50 dark:border-slate-850">
              <strong className="text-slate-850 dark:text-slate-100">GCD Division timeline:</strong> Computes the quotients and remainders, stacking them as visual timeline cards. The final non-zero remainder card is highlighted.
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/45 p-3 rounded-xl border border-slate-200/50 dark:border-slate-855">
              <strong className="text-slate-850 dark:text-slate-100">Congruence remainder circle:</strong> Renders a circle divided into modulo-m parts (like a modular clock). Points represent the locations of inputs a and b, showing whether they occupy the identical dial sector.
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/45 p-3 rounded-xl border border-slate-200/50 dark:border-slate-855">
              <strong className="text-slate-850 dark:text-slate-100">Complex Vector Plane:</strong> Shows an interactive Cartesian plane. You can input values for z1 and z2, and watch the vectors shift immediately. The plot marks input vectors and the operation's resulting sum/product vector.
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/45 p-3 rounded-xl border border-slate-200/50 dark:border-slate-855">
              <strong className="text-slate-850 dark:text-slate-100">Combinatoric Slots:</strong> Renders slot boxes representing ordering (permutations) or grouping bags representing subsets (combinations) to illustrate order significance.
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/45 p-3 rounded-xl border border-slate-200/50 dark:border-slate-855">
              <strong className="text-slate-850 dark:text-slate-100">Limit graphs:</strong> Plots function f(x) and draws arrows from both the left-hand and right-hand directions towards the limit point, showing hole limits clearly.
            </div>
          </div>
        </div>

        {/* Input Validation */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
            4. Robust Input validations &amp; Error states
          </h2>
          <ul className="list-disc pl-12 text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
            <li>Modulo inputs: Modulus must be greater than zero.</li>
            <li>Combinatorics: Inputs n and r must be valid non-negative integers. Parameter r must be less than or equal to n.</li>
            <li>Complex Operations: Division by zero is detected and blocked with clear notices.</li>
            <li>Calculus limits: Functions must be mathematically evaluable. Vertical asymptotes are correctly identified and labeled.</li>
          </ul>
        </div>

        {/* Responsive Layout */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-rose-500" />
            5. Accessibility &amp; Responsiveness
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
            The application is completely responsive and is formatted to work on laptops, tablets, and phones. All interactive SVG graphs are scalable and resize to adapt to small layout widths.
          </p>
        </div>

      </div>
    </div>
  );
};
