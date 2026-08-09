import React, { useState } from 'react';
import { mathApi } from '../utils/api';
import type { GCDResponse } from '../utils/api';
import { SolutionPanel } from '../components/SolutionPanel';
import { RealLifeApplications } from '../components/RealLifeApplications';
import { MathFormula } from '../components/MathFormula';
import { Play, RotateCcw, HelpCircle, Check, Loader2, Binary } from 'lucide-react';

export const GCDModule: React.FC = () => {
  const [aStr, setAStr] = useState<string>('');
  const [bStr, setBStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<GCDResponse | null>(null);

  const handleCalculate = async (inputA: string, inputB: string) => {
    setError(null);
    if (!inputA.trim() || !inputB.trim()) {
      setError('Please enter both integer values.');
      return;
    }

    const a = parseInt(inputA, 10);
    const b = parseInt(inputB, 10);

    if (isNaN(a) || isNaN(b)) {
      setError('Please enter valid integers.');
      return;
    }

    setLoading(true);
    try {
      const data = await mathApi.getGCD(a, b);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during calculation.');
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setAStr('48');
    setBStr('18');
    handleCalculate('48', '18');
  };

  const handleReset = () => {
    setAStr('');
    setBStr('');
    setResponse(null);
    setError(null);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="border-b pb-4 border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
          Unit I &bull; Number Theory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-850 dark:text-white">
          GCD Calculator — Euclidean Algorithm
        </h1>
        <p className="text-slate-655 dark:text-slate-400 text-sm max-w-2xl">
          Find the Greatest Common Divisor using the classical Euclidean division remainder method, illustrated through modular step progression.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6 self-start">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Calculator Inputs
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="input-a" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                First Integer (a)
              </label>
              <input
                id="input-a"
                type="number"
                value={aStr}
                onChange={(e) => setAStr(e.target.value)}
                placeholder="e.g. 48"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="input-b" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Second Integer (b)
              </label>
              <input
                id="input-b"
                type="number"
                value={bStr}
                onChange={(e) => setBStr(e.target.value)}
                placeholder="e.g. 18"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-955/20 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-600 dark:text-rose-450 rounded-xl leading-snug">
              {error}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleCalculate(aStr, bStr)}
              disabled={loading}
              className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Calculate GCD
            </button>

            <div className="flex gap-2">
              <button
                onClick={loadExample}
                className="flex-1 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                Try Example
              </button>
              <button
                onClick={handleReset}
                className="py-2.5 px-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl font-semibold text-xs transition-all flex items-center justify-center cursor-pointer"
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
              
              {/* Giant Result Display */}
              <div className="text-center bg-slate-50 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850/60 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Greatest Common Divisor
                </span>
                <div className="text-5xl font-black text-indigo-650 dark:text-indigo-400">
                  {response.result}
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  <MathFormula formula={`\\gcd(${aStr}, ${bStr}) = ${response.result}`} />
                </div>
              </div>

              {/* Euclidean Algorithm Cards Visualization */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Euclidean Division Pipeline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {response.steps.map((step, index) => {
                    const isLast = index === response.steps.length - 1;
                    return (
                      <div
                        key={step.step_num}
                        className={`p-4 rounded-2xl border relative flex flex-col justify-between overflow-hidden group transition-all duration-200 ${
                          isLast
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/15 border-emerald-300 dark:border-emerald-900 shadow-md shadow-emerald-500/5'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isLast
                              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}>
                            Step {step.step_num}
                          </span>
                          {isLast && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                              <Check className="w-3 h-3" />
                              GCD Found
                            </span>
                          )}
                        </div>

                        <div className="font-mono text-base font-bold text-slate-850 dark:text-slate-105 my-2">
                          {step.equation}
                        </div>

                        <div className="flex justify-between text-xs text-slate-500 mt-2 border-t pt-2 border-slate-100 dark:border-slate-850/80">
                          <div>
                            Quotient: <span className="font-bold text-slate-700 dark:text-slate-300">{step.quotient}</span>
                          </div>
                          <div>
                            Remainder: <span className={`font-mono font-bold ${
                              isLast
                                ? 'text-emerald-600 dark:text-emerald-400 text-sm'
                                : 'text-indigo-600 dark:text-indigo-400'
                            }`}>{step.remainder}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Standard Educational Solution Panel */}
              <SolutionPanel
                given={`a = ${aStr}, \\quad b = ${bStr}`}
                formula={response.formula}
                calculationSteps={response.steps.map(s => 
                  `Divide ${s.a} by ${s.b}: quotient is ${s.quotient}, remainder is ${s.remainder}. Equation: ${s.equation}`
                )}
                finalAnswer={`GCD(${aStr}, ${bStr}) = ${response.result}`}
                explanation={response.explanation}
              />

              {/* Real Life Applications */}
              <RealLifeApplications applications={response.real_life_applications} />

              {/* What did we learn? */}
              <div className="bg-slate-50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-850/50 space-y-3">
                <h4 className="font-bold text-slate-850 dark:text-white text-sm flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                  What did we learn?
                </h4>
                <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
                  <li>The Euclidean algorithm operates on the recurrence: <MathFormula formula="\gcd(a, b) = \gcd(b, a \bmod b)" />.</li>
                  <li>Each iteration replaces the larger number with the modulus remainder of the two numbers.</li>
                  <li>The iteration terminates when the remainder becomes 0. The divisor of this final step is the greatest common factor of the initial inputs.</li>
                  <li>The algorithm's computational complexity is logarithmic, making it exceptionally fast even for huge numbers.</li>
                </ul>
              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 rounded-3xl p-12 text-center text-slate-500 space-y-4">
              <Binary className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto animate-pulse" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No Calculations Evaluated Yet
              </h3>
              <p className="text-sm max-w-sm mx-auto">
                Fill in the integer parameter values in the left side input panel or try the ready preset example.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
