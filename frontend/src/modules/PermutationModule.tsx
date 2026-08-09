import React, { useState } from 'react';
import { mathApi } from '../utils/api';
import type { PermCombResponse } from '../utils/api';
import { SolutionPanel } from '../components/SolutionPanel';
import { RealLifeApplications } from '../components/RealLifeApplications';
import { MathFormula } from '../components/MathFormula';
import { Play, RotateCcw, HelpCircle, Loader2, Shuffle } from 'lucide-react';

export const PermutationModule: React.FC = () => {
  const [nStr, setNStr] = useState<string>('');
  const [rStr, setRStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<PermCombResponse | null>(null);

  const handleCalculate = async (inputN: string, inputR: string) => {
    setError(null);
    if (!inputN.trim() || !inputR.trim()) {
      setError('Please fill in both n and r parameters.');
      return;
    }

    const n = parseInt(inputN, 10);
    const r = parseInt(inputR, 10);

    if (isNaN(n) || isNaN(r)) {
      setError('Please enter valid integers.');
      return;
    }

    if (n < 0 || r < 0) {
      setError('Values of n and r must be non-negative integers.');
      return;
    }

    if (r > n) {
      setError('Value of r cannot be greater than n.');
      return;
    }

    // Limit inputs for demo safety so we do not cause heap crash (n <= 20)
    if (n > 20) {
      setError('Please limit n to <= 20 to prevent huge factorial calculations.');
      return;
    }

    setLoading(true);
    try {
      const data = await mathApi.getPermutation(n, r);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'Operation failed.');
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setNStr('5');
    setRStr('3');
    handleCalculate('5', '3');
  };

  const handleReset = () => {
    setNStr('');
    setRStr('');
    setResponse(null);
    setError(null);
  };

  // Helper to generate slot visualization
  const renderArrangementSlots = (n: number, r: number) => {
    // Letters representing items A, B, C, D, E...
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].slice(0, n);
    
    // Pick 3 sample arrangements if n >= 3, r >= 3
    let sampleArrangements: string[] = [];
    if (r === 0) {
      sampleArrangements = ["(Empty selection - 1 way)"];
    } else if (n >= 3 && r >= 3) {
      const l1 = letters[0];
      const l2 = letters[1];
      const l3 = letters[2];
      sampleArrangements = [
        `${l1}${l2}${l3}`,
        `${l1}${l3}${l2}`,
        `${l2}${l1}${l3}`,
        `${l2}${l3}${l1}`
      ];
    } else if (n >= 2 && r >= 2) {
      const l1 = letters[0];
      const l2 = letters[1];
      sampleArrangements = [
        `${l1}${l2}`,
        `${l2}${l1}`
      ];
    } else if (r === 1) {
      sampleArrangements = letters.map(l => `${l}`);
    }

    return (
      <div className="bg-slate-50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-850/60 space-y-5">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Arrangement Slots ({r} chosen slots out of {n} pool items)
          </span>
          <div className="flex gap-3 justify-center items-center mt-3">
            {Array.from({ length: r }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-500 border-dashed flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-black text-lg">
                  Slot {idx + 1}
                </div>
                <span className="text-[9px] font-semibold text-slate-500 font-mono">
                  {n - idx} choices
                </span>
              </div>
            ))}
            {r === 0 && (
              <div className="text-sm font-semibold text-slate-500 italic p-2">
                No slots chosen (1 empty configuration)
              </div>
            )}
          </div>
        </div>

        {sampleArrangements.length > 0 && (
          <div className="pt-3 border-t border-slate-200/50 dark:border-slate-850 text-center">
            <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider block mb-2">
              Order Matters &bull; Distinct Arrangement Examples
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {sampleArrangements.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-white dark:bg-slate-900 border font-mono font-bold text-slate-750 dark:text-slate-200 text-xs rounded-lg">
                  {item}
                </span>
              ))}
            </div>
            {n >= 2 && r >= 2 && (
              <p className="text-[10px] text-slate-400 mt-2">
                Notice that changing the order of the chosen characters creates distinct arrangements.
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const apps = [
    { title: 'Password Permutations', description: 'Used to calculate total passcode combinations (e.g. setting an 8-character passcode where characters cannot be repeated).' },
    { title: 'Leaderboards & Rankings', description: 'Computes potential permutations for Podium Finish positions (e.g. 1st, 2nd, and 3rd rank orders from a pool of competitors).' },
    { title: 'Task Scheduling Queues', description: 'Evaluates the permutation configurations of executing sequential tasks where execution priority dictates results.' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="border-b pb-4 border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
          Unit II &bull; Combinatorics
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-850 dark:text-white">
          Permutation Calculator (nPr)
        </h1>
        <p className="text-slate-655 dark:text-slate-400 text-sm max-w-2xl">
          Find the number of ways to arrange r unique items selected from a pool of n, where order of arrangement is critical.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6 self-start">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Calculator Parameters
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="n-input" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Total Pool Items (n)
              </label>
              <input
                id="n-input"
                type="number"
                value={nStr}
                onChange={(e) => setNStr(e.target.value)}
                placeholder="e.g. 5"
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="r-input" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Arranged Items (r)
              </label>
              <input
                id="r-input"
                type="number"
                value={rStr}
                onChange={(e) => setRStr(e.target.value)}
                placeholder="e.g. 3"
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-955/20 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-600 dark:text-rose-455 rounded-xl leading-snug">
              {error}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleCalculate(nStr, rStr)}
              disabled={loading}
              className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Calculate Permutations
            </button>

            <div className="flex gap-2">
              <button
                onClick={loadExample}
                className="flex-1 py-2.5 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                Try Example
              </button>
              <button
                onClick={handleReset}
                className="py-2.5 px-3 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl font-semibold text-xs transition-all flex items-center justify-center cursor-pointer"
                title="Reset Inputs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel / Visualization */}
        <div className="lg:col-span-2 space-y-8">
          {response ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
              
              {/* Giant Result Card */}
              <div className="text-center bg-slate-50 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850/60 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Total Permutations (nPr)
                </span>
                <div className="text-5xl font-black text-indigo-650 dark:text-indigo-400">
                  {response.result.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  <MathFormula formula={`P(${nStr}, ${rStr}) = ${response.result}`} />
                </div>
              </div>

              {/* Slot Visualizer */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Arrangement Space Visualization
                </h3>
                {renderArrangementSlots(parseInt(nStr, 10), parseInt(rStr, 10))}
              </div>

              {/* Standard Educational Solution Panel */}
              <SolutionPanel
                given={`n = ${nStr}, \\quad r = ${rStr}`}
                formula={response.formula}
                substitution={response.substitution}
                calculationSteps={response.steps}
                finalAnswer={`nPr = ${response.result}`}
                explanation={response.explanation}
              />

              {/* Real-Life System */}
              <RealLifeApplications applications={apps} />

              {/* Educational Distinction Box */}
              <div className="bg-amber-50/50 dark:bg-amber-950/15 p-5 rounded-2xl border border-amber-250/60 dark:border-amber-900/50 space-y-2">
                <h4 className="font-bold text-amber-800 dark:text-amber-400 text-sm flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  Key Combinatorics Distinction: Order Matters!
                </h4>
                <p className="text-xs text-amber-900 dark:text-slate-400 leading-relaxed">
                  In permutations, the sequence of selection determines the arrangement's identity. 
                  Selecting person A first, then B, and then C is a <strong>distinct permutation</strong> from 
                  selecting B first, then A, and then C (i.e. ABC &ne; BAC). For selections where order is irrelevant, 
                  refer to combinations (nCr).
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 rounded-3xl p-12 text-center text-slate-500 space-y-4">
              <Shuffle className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto animate-pulse" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No Calculations Evaluated Yet
              </h3>
              <p className="text-sm max-w-sm mx-auto">
                Fill in the integer values for n and r inside the parameters panel, or try the preset example.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
