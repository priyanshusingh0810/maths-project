import React, { useState } from 'react';
import { mathApi } from '../utils/api';
import type { PermCombResponse } from '../utils/api';
import { SolutionPanel } from '../components/SolutionPanel';
import { RealLifeApplications } from '../components/RealLifeApplications';
import { MathFormula } from '../components/MathFormula';
import { Play, RotateCcw, HelpCircle, ArrowRight, Loader2, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SimulationSegment } from '../components/SimulationSegment';

export const CombinationModule: React.FC = () => {
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

    if (n > 20) {
      setError('Please limit n to <= 20 to prevent huge factorial calculations.');
      return;
    }

    setLoading(true);
    try {
      const data = await mathApi.getCombination(n, r);
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

  // Helper to render combination grouping visualization and comparison
  const renderCombinationComparison = (n: number, r: number) => {
    // Letters representing items A, B, C, D, E...
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].slice(0, n);
    
    // Pick 3 sample items
    const sampleGroup = letters.slice(0, Math.min(r, letters.length));
    
    // Generate permutations of the sample group (up to length 3)
    let groupPermutations: string[] = [];
    if (sampleGroup.length === 3) {
      const [x, y, z] = sampleGroup;
      groupPermutations = [
        `${x}${y}${z}`, `${x}${z}${y}`,
        `${y}${x}${z}`, `${y}${z}${x}`,
        `${z}${x}${y}`, `${z}${y}${x}`
      ];
    } else if (sampleGroup.length === 2) {
      const [x, y] = sampleGroup;
      groupPermutations = [`${x}${y}`, `${y}${x}`];
    } else if (sampleGroup.length === 1) {
      groupPermutations = [`${sampleGroup[0]}`];
    }

    return (
      <div className="bg-slate-50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-850/60 space-y-6">
        {/* Selection Pool visual */}
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Selection Bag (Order Independent Grouping)
          </span>
          <div className="flex justify-center items-center">
            <div className="w-40 h-28 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500 border-dashed rounded-3xl flex flex-wrap gap-2 items-center justify-center p-3 relative shadow-inner">
              {sampleGroup.map((letter, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md transform hover:scale-105 transition-transform"
                >
                  {letter}
                </div>
              ))}
              {r === 0 && (
                <span className="text-xs text-slate-450 italic">Empty Bag</span>
              )}
            </div>
          </div>
        </div>

        {/* Permutation vs Combination Collapse illustration */}
        {groupPermutations.length > 1 && (
          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-850 space-y-4">
            <div className="text-center">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider block mb-2">
                Permutations vs Combination Collapse
              </span>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                Since order is irrelevant in combinations, all arrangements of selected elements collapse into a single combination.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {/* Left Box: Permutations */}
              <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px] border p-3 rounded-xl bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-850">
                <span className="text-[8px] font-extrabold uppercase tracking-wider text-indigo-500 block w-full text-center mb-1">
                  {groupPermutations.length} Distinct Permutations
                </span>
                {groupPermutations.map((p, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-indigo-50 dark:bg-slate-850 font-mono text-[10px] text-slate-700 dark:text-slate-350 border border-slate-100 rounded">
                    {p}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center text-slate-400">
                <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                <span className="text-[8px] font-bold uppercase mt-0.5">Collapse</span>
              </div>

              {/* Right Box: Combination */}
              <div className="border border-emerald-300 dark:border-emerald-900/60 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/15 text-center min-w-[120px]">
                <span className="text-[8px] font-extrabold uppercase tracking-wider text-emerald-650 dark:text-emerald-400 block mb-1">
                  1 Unique Combination
                </span>
                <span className="px-3 py-1 bg-emerald-500 text-white font-mono font-bold text-xs rounded-lg">
                  {`{` + sampleGroup.join(', ') + `}`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const apps = [
    { title: 'Committee Team Selection', description: 'Used to select panels (e.g. choosing a 5-person committee from 15 candidates, where roles are equal).' },
    { title: 'Lottery & Games of Chance', description: 'Used to compute lottery probabilities (e.g. choosing 6 random numbers out of 49, where draw order is irrelevant).' },
    { title: 'Statistical Quality Sampling', description: 'Determines sample size combinations for random quality testing in production lines without order considerations.' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="border-b pb-4 border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-indigo-55 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
          Unit II &bull; Combinatorics
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-850 dark:text-white">
          Combination Calculator (nCr)
        </h1>
        <p className="text-slate-655 dark:text-slate-400 text-sm max-w-2xl">
          Find the number of ways to select r elements from a pool of n, where the selection sequence/order is completely irrelevant.
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
                Selected Items (r)
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
              Calculate Combinations
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
                  Total Combinations (nCr)
                </span>
                <div className="text-5xl font-black text-indigo-650 dark:text-indigo-400">
                  {response.result.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  <MathFormula formula={`C(${nStr}, ${rStr}) = ${response.result}`} />
                </div>
              </div>

              {/* Simulation Visualizer */}
              <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <SimulationSegment 
                  title="Binomial Combination Distribution"
                  description={`Pascal's Triangle Row: Comparing nCr values for a fixed n = ${nStr}`}
                >
                  <div className="flex flex-col gap-6 w-full">
                    <div className="h-64 w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={(() => {
                          const n = parseInt(nStr, 10);
                          const fact = (num: number): number => num <= 1 ? 1 : num * fact(num - 1);
                          return Array.from({ length: n + 1 }).map((_, x) => ({
                            rVal: x,
                            combinations: fact(n) / (fact(x) * fact(n - x))
                          }));
                        })()}>
                          <XAxis dataKey="rVal" stroke="#10b981" tick={{ fill: '#10b981' }} />
                          <YAxis 
                            tickFormatter={(value) => value > 10000 ? value.toExponential(1) : value.toString()}
                            stroke="#10b981" 
                            tick={{ fill: '#10b981' }} 
                            width={60} 
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(16, 185, 129, 0.3)', borderRadius: '12px', color: '#fff' }}
                            itemStyle={{ color: '#a7f3d0' }}
                            formatter={(value: any) => [Number(value).toLocaleString(), 'Combinations (nCr)']}
                            labelFormatter={(label) => `Choosing r = ${label}`}
                          />
                          <Bar 
                            dataKey="combinations" 
                            fill="#10b981" 
                            radius={[4, 4, 0, 0]} 
                            animationDuration={1500}
                          >
                            {(() => {
                              const n = parseInt(nStr, 10);
                              const targetR = parseInt(rStr, 10);
                              return Array.from({ length: n + 1 }).map((_, index) => (
                                <Cell key={`cell-${index}`} fill={index === targetR ? '#8b5cf6' : '#10b981'} />
                              ));
                            })()}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="border-t border-slate-200/20 dark:border-slate-800 pt-4">
                      {renderCombinationComparison(parseInt(nStr, 10), parseInt(rStr, 10))}
                    </div>
                  </div>
                </SimulationSegment>
              </div>

              {/* Standard Educational Solution Panel */}
              <SolutionPanel
                given={`n = ${nStr}, \\quad r = ${rStr}`}
                formula={response.formula}
                substitution={response.substitution}
                calculationSteps={response.steps}
                finalAnswer={`nCr = ${response.result}`}
                explanation={response.explanation}
              />

              {/* Small comparison card */}
              <div className="bg-slate-50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-850/50 space-y-3">
                <h4 className="font-bold text-slate-850 dark:text-white text-xs flex items-center gap-1">
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                  Comparison: Permutation vs. Combination
                </h4>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed font-mono">
                  <div>Permutation (order matters): <span className="font-bold text-indigo-500">nPr = n! / (n-r)!</span></div>
                  <div>Combination (order doesn't matter): <span className="font-bold text-emerald-500">nCr = n! / [r! * (n-r)!] = nPr / r!</span></div>
                  <div className="font-sans text-[11px] mt-2 italic text-slate-500">
                    Because we divide by r! in combination, the number of combinations is always smaller than or equal to permutations: C(n, r) &le; P(n, r).
                  </div>
                </div>
              </div>

              {/* Real-Life System */}
              <RealLifeApplications applications={apps} />

            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 rounded-3xl p-12 text-center text-slate-500 space-y-4">
              <Layers className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto animate-pulse" />
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
