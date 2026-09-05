import React, { useState } from 'react';
import { mathApi } from '../utils/api';
import type { CongruenceResponse } from '../utils/api';
import { SolutionPanel } from '../components/SolutionPanel';
import { RealLifeApplications } from '../components/RealLifeApplications';
import { MathFormula } from '../components/MathFormula';
import { Play, RotateCcw, HelpCircle, Loader2, CircleDot } from 'lucide-react';
import { SimulationSegment } from '../components/SimulationSegment';

export const CongruenceModule: React.FC = () => {
  const [aStr, setAStr] = useState<string>('');
  const [bStr, setBStr] = useState<string>('');
  const [mStr, setMStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<CongruenceResponse | null>(null);

  const handleCalculate = async (inputA: string, inputB: string, inputM: string) => {
    setError(null);
    if (!inputA.trim() || !inputB.trim() || !inputM.trim()) {
      setError('Please fill in all input fields.');
      return;
    }

    const a = parseInt(inputA, 10);
    const b = parseInt(inputB, 10);
    const m = parseInt(inputM, 10);

    if (isNaN(a) || isNaN(b) || isNaN(m)) {
      setError('Please enter valid integers.');
      return;
    }

    if (m <= 0) {
      setError('Modulus (m) must be a positive integer greater than zero.');
      return;
    }

    setLoading(true);
    try {
      const data = await mathApi.getCongruence(a, b, m);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setAStr('17');
    setBStr('5');
    setMStr('12');
    handleCalculate('17', '5', '12');
  };

  const handleReset = () => {
    setAStr('');
    setBStr('');
    setMStr('');
    setResponse(null);
    setError(null);
  };

  // Helper to generate coordinates for modular clock dial visualization
  const renderClockCircle = (modulus: number, remainderA: number, remainderB: number) => {
    if (modulus > 32) {
      return (
        <div className="p-4 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border text-center text-xs text-slate-500">
          Modulus modulus {modulus} is too large for circle dial indexing. Use m &le; 32 to see clock alignment.
        </div>
      );
    }

    const size = 200;
    const r = 80;
    const cx = size / 2;
    const cy = size / 2;
    
    // Generate tick points
    const ticks = [];
    for (let i = 0; i < modulus; i++) {
      const angle = (i * 360) / modulus - 90; // offset -90 to start from top
      const rad = (angle * Math.PI) / 180;
      const tx = cx + r * Math.cos(rad);
      const ty = cy + r * Math.sin(rad);
      const lx = cx + (r + 15) * Math.cos(rad);
      const ly = cy + (r + 15) * Math.sin(rad);
      ticks.push({ index: i, x: tx, y: ty, labelX: lx, labelY: ly });
    }

    const angleA = (remainderA * 360) / modulus - 90;
    const radA = (angleA * Math.PI) / 180;
    const ax = cx + r * Math.cos(radA);
    const ay = cy + r * Math.sin(radA);

    const angleB = (remainderB * 360) / modulus - 90;
    const radB = (angleB * Math.PI) / 180;
    const bx = cx + r * Math.cos(radB);
    const by = cy + r * Math.sin(radB);

    const isCongruent = remainderA === remainderB;

    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <svg width={size + 40} height={size + 40} className="overflow-visible select-none">
          {/* Main Dial Outer Circle */}
          <circle cx={cx} cy={cy} r={r} className="fill-slate-50 dark:fill-slate-950/20 stroke-slate-200 dark:stroke-slate-800" strokeWidth="2" />
          
          {/* Ticks & Labels */}
          {ticks.map((tick) => (
            <g key={tick.index}>
              <circle cx={tick.x} cy={tick.y} r="3" className="fill-slate-350 dark:fill-slate-700" />
              <text
                x={tick.labelX}
                y={tick.labelY}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="text-[10px] font-bold fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {tick.index}
              </text>
            </g>
          ))}

          {/* Lines from Origin */}
          {isCongruent ? (
            <line x1={cx} y1={cy} x2={ax} y2={ay} className="stroke-emerald-550 stroke-emerald-500 dark:stroke-emerald-400" strokeWidth="3" strokeDasharray="2" />
          ) : (
            <>
              <line x1={cx} y1={cy} x2={ax} y2={ay} className="stroke-blue-500 dark:stroke-blue-400" strokeWidth="2.5" />
              <line x1={cx} y1={cy} x2={bx} y2={by} className="stroke-pink-500 dark:stroke-pink-400" strokeWidth="2.5" />
            </>
          )}

          {/* Center Point */}
          <circle cx={cx} cy={cy} r="5" className="fill-slate-800 dark:fill-white" />

          {/* Remainder Markers */}
          {isCongruent ? (
            <g>
              <circle cx={ax} cy={ay} r="10" className="fill-emerald-500 stroke-white dark:stroke-slate-900 shadow-md" strokeWidth="2" />
              <circle cx={ax} cy={ay} r="4" className="fill-white" />
            </g>
          ) : (
            <>
              {/* Remainder a */}
              <g>
                <circle cx={ax} cy={ay} r="8" className="fill-blue-500 stroke-white dark:stroke-slate-900" strokeWidth="2" />
                <text x={ax} y={ay - 12} textAnchor="middle" className="text-[10px] font-black fill-blue-600 dark:fill-blue-400 font-sans">a</text>
              </g>
              {/* Remainder b */}
              <g>
                <circle cx={bx} cy={by} r="8" className="fill-pink-500 stroke-white dark:stroke-slate-900" strokeWidth="2" />
                <text x={bx} y={by + 18} textAnchor="middle" className="text-[10px] font-black fill-pink-600 dark:fill-pink-400 font-sans">b</text>
              </g>
            </>
          )}
        </svg>

        <div className="flex gap-4 text-xs font-semibold">
          {isCongruent ? (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-950">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Overlap at remainder {remainderA} (Congruent)
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-450 bg-blue-50 dark:bg-blue-950/20 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-950">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Remainder a: {remainderA}
              </div>
              <div className="flex items-center gap-1.5 text-pink-600 dark:text-pink-450 bg-pink-50 dark:bg-pink-950/20 px-3 py-1.5 rounded-full border border-pink-100 dark:border-pink-950">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                Remainder b: {remainderB}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const apps = [
    { title: 'Clock and Calendar Cycles', description: 'Used to calculate time transitions (e.g. 15 hours after 10:00 is 1:00, calculated as 25 mod 12 = 1) and days of the week.' },
    { title: 'Symmetric Cryptography', description: 'Forms the computational basis of cryptographic security protocols, including Diffie-Hellman Key Exchange and RSA cryptosystems.' },
    { title: 'Hash Map Allocations', description: 'Used to map keys to indexes in hash tables by calculating index = key mod capacity, ensuring even data distribution.' },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="animate-fade-up pb-6" style={{ borderBottom: '1px solid rgba(168,85,247,0.12)' }}>
        <span className="neon-pill neon-pill-purple mb-3 inline-flex">Unit I · Modular Arithmetic</span>
        <h1 className="section-heading text-3xl sm:text-4xl font-black mt-2" style={{ color: 'rgba(241,245,249,0.95)' }}>
          Congruence Calculator — <span className="gradient-text-static">Modular Arithmetic</span>
        </h1>
        <p className="text-sm mt-2 max-w-2xl" style={{ color: 'rgba(100,116,139,0.9)' }}>
          Evaluate modular congruence configurations and view clock division offsets using remainder clock rings.
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
                Integer a
              </label>
              <input
                id="input-a"
                type="number"
                value={aStr}
                onChange={(e) => setAStr(e.target.value)}
                placeholder="e.g. 17"
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="input-b" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Integer b
              </label>
              <input
                id="input-b"
                type="number"
                value={bStr}
                onChange={(e) => setBStr(e.target.value)}
                placeholder="e.g. 5"
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="input-m" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Modulus m
              </label>
              <input
                id="input-m"
                type="number"
                value={mStr}
                onChange={(e) => setMStr(e.target.value)}
                placeholder="e.g. 12"
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              onClick={() => handleCalculate(aStr, bStr, mStr)}
              disabled={loading}
              className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Check Congruence
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
              
              {/* Giant Congruent Status Conclusion */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start bg-slate-50 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850/60">
                <div className="text-center lg:text-left space-y-2 mt-4 lg:mt-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Conclusion Status
                  </span>
                  <div className={`text-3xl font-black ${
                    response.is_congruent
                      ? 'text-emerald-600 dark:text-emerald-450'
                      : 'text-rose-600 dark:text-rose-450'
                  }`}>
                    {response.is_congruent ? 'CONGRUENT' : 'NOT CONGRUENT'}
                  </div>
                  <div className="text-xs text-slate-500">
                    <MathFormula
                      formula={`${aStr} ${response.is_congruent ? '\\equiv' : '\\not\\equiv'} ${bStr} \\pmod{${mStr}}`}
                    />
                  </div>
                </div>

                {/* Draw modular remainder wheel visualization */}
                <div className="w-full">
                  <SimulationSegment
                    title="Modular Clock Arithmetic"
                    description={`Visualizing modulo ${mStr} remainders on a circular dial`}
                  >
                    <div className="flex flex-col items-center justify-center py-4">
                      {renderClockCircle(parseInt(mStr, 10), response.a_mod, response.b_mod)}
                    </div>
                  </SimulationSegment>
                </div>
              </div>

              {/* Step-by-Step Explanation */}
              <SolutionPanel
                given={`a = ${aStr}, \\quad b = ${bStr}, \\quad m = ${mStr}`}
                formula={response.formula}
                calculationSteps={response.steps}
                finalAnswer={response.is_congruent 
                  ? `Congruence holds (remainders match: ${response.a_mod} = ${response.b_mod})`
                  : `Congruence fails (remainders differ: ${response.a_mod} != ${response.b_mod})`
                }
                explanation={response.explanation}
              />

              {/* Real-Life System */}
              <RealLifeApplications applications={apps} />

              {/* Educative circular notes */}
              <div className="bg-slate-50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-850/50 space-y-3">
                <h4 className="font-bold text-slate-850 dark:text-white text-sm flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                  What is clock arithmetic?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Clock arithmetic is a visual metaphor for modular arithmetic. Think of standard modulo 12: 
                  If it is 10:00 o'clock now, 5 hours later it will be 3:00 o'clock, which is calculated as: 
                  <MathFormula className="mx-1" formula="(10 + 5) \bmod 12 = 15 \bmod 12 = 3" />. 
                  Geometrically, any values that result in the identical remainder occupy the same rotation sector on the circle, 
                  making them "congruent".
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 rounded-3xl p-12 text-center text-slate-500 space-y-4">
              <CircleDot className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto animate-pulse" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No Calculations Evaluated Yet
              </h3>
              <p className="text-sm max-w-sm mx-auto">
                Fill in the integer values for a, b, and modulus m in the left inputs panel, or click Try Example.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
