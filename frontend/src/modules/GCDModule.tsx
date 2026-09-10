import React, { useState } from 'react';
import { mathApi } from '../utils/api';
import type { GCDResponse } from '../utils/api';
import { SolutionPanel } from '../components/SolutionPanel';
import { RealLifeApplications } from '../components/RealLifeApplications';
import { MathFormula } from '../components/MathFormula';
import { Play, RotateCcw, HelpCircle, Check, Loader2, Binary } from 'lucide-react';
import { SimulationSegment } from '../components/SimulationSegment';


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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">

      {/* Module Title Header */}
      <div
        className="animate-fade-up pb-6"
        style={{ borderBottom: '1px solid var(--border-default)' }}
      >
        <span className="neon-pill neon-pill-indigo mb-3 inline-flex">Unit I · Number Theory</span>
        <h1
          className="section-heading text-3xl sm:text-4xl font-black mt-2"
          style={{ color: 'var(--text-primary)' }}
        >
          GCD Calculator —{' '}
          <span className="gradient-text-static">Euclidean Algorithm</span>
        </h1>
        <p className="text-sm mt-2 max-w-2xl" style={{ color: 'var(--text-muted)' }}>
          Find the Greatest Common Divisor using the classical Euclidean division remainder method, illustrated through modular step progression.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Input Panel */}
        <div className="lg:col-span-1 self-start animate-fade-up delay-100 glass-card p-6">
          <h2
            className="font-extrabold text-base mb-5"
            style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}
          >
            Calculator Inputs
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="gcd-input-a"
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                First Integer (a)
              </label>
              <input
                id="gcd-input-a"
                type="number"
                value={aStr}
                onChange={(e) => setAStr(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate(aStr, bStr)}
                placeholder="e.g. 48"
                className="input-glow w-full px-4 py-3 text-sm font-semibold"
              />
            </div>
            <div>
              <label
                htmlFor="gcd-input-b"
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Second Integer (b)
              </label>
              <input
                id="gcd-input-b"
                type="number"
                value={bStr}
                onChange={(e) => setBStr(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate(aStr, bStr)}
                placeholder="e.g. 18"
                className="input-glow w-full px-4 py-3 text-sm font-semibold"
              />
            </div>
          </div>

          {error && (
            <div
              className="mt-4 p-3 text-xs font-semibold rounded-xl leading-snug"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: 'var(--accent-emerald)',
              }}
            >
              {error}
            </div>
          )}

          <div className="space-y-3 pt-5">
            <button
              id="gcd-calculate"
              onClick={() => handleCalculate(aStr, bStr)}
              disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2 text-sm py-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Calculate GCD
            </button>
            <div className="flex gap-2">
              <button
                id="gcd-example"
                onClick={loadExample}
                className="btn-outline-glow flex-1 flex items-center justify-center gap-1 cursor-pointer py-2"
              >
                <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                Try Example
              </button>
              <button
                id="gcd-reset"
                onClick={handleReset}
                className="btn-outline-glow px-3 py-2 flex items-center justify-center cursor-pointer"
                title="Reset Inputs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2 space-y-8">
          {response ? (
            <div className="animate-fade-up space-y-8 glass-card p-8">

              {/* Result */}
              <div className="text-center space-y-2 glass-card-inner p-6">
                <span
                  className="text-[10px] font-black uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Greatest Common Divisor
                </span>
                <div
                  className="section-heading text-5xl font-black"
                  style={{
                    color: 'var(--accent-secondary)',
                    textShadow: '0 0 30px rgba(16,185,129,0.4)',
                  }}
                >
                  {response.result}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  <MathFormula formula={`\\gcd(${aStr}, ${bStr}) = ${response.result}`} />
                </div>
              </div>

              {/* Euclidean Division Cards */}
              <div className="space-y-3">
                <SimulationSegment
                  title="Euclidean Division Pipeline"
                  description="Visualizing the step-by-step modulo reduction"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-2">
                    {response.steps.map((step, index) => {
                    const isLast = index === response.steps.length - 1;
                    return (
                      <div
                        key={step.step_num}
                        className="p-4 rounded-2xl transition-all duration-200"
                        style={{
                          background: isLast
                            ? 'var(--glow-secondary)'
                            : 'var(--bg-card)',
                          border: isLast
                            ? '1px solid var(--accent-secondary)'
                            : '1px solid var(--border-default)',
                          boxShadow: isLast ? '0 4px 20px rgba(16,185,129,0.1)' : 'none',
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                              background: isLast ? 'var(--glow-secondary)' : 'var(--bg-card)',
                              color: isLast ? 'var(--accent-secondary)' : 'var(--text-muted)',
                              border: isLast ? '1px solid var(--accent-secondary)' : '1px solid var(--border-default)',
                            }}
                          >
                            Step {step.step_num}
                          </span>
                          {isLast && (
                            <span
                              className="text-[10px] font-bold flex items-center gap-0.5"
                              style={{ color: 'var(--accent-secondary)' }}
                            >
                              <Check className="w-3 h-3" />
                              GCD Found
                            </span>
                          )}
                        </div>
                        <div
                          className="font-mono text-base font-bold my-2"
                          style={{ color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {step.equation}
                        </div>
                        <div
                          className="flex justify-between text-xs pt-2"
                          style={{
                            borderTop: '1px solid var(--border-default)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <span>Quotient: <strong style={{ color: 'var(--text-primary)' }}>{step.quotient}</strong></span>
                          <span>
                            Remainder:{' '}
                            <strong
                              style={{
                                color: isLast ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                                fontFamily: "'JetBrains Mono', monospace",
                              }}
                            >
                              {step.remainder}
                            </strong>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </SimulationSegment>
              </div>

              {/* Solution Panel */}
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
              <div className="glass-card-inner p-5 space-y-3">
                <h4
                  className="font-bold text-sm flex items-center gap-1.5"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  <HelpCircle className="w-4 h-4" />
                  What did we learn?
                </h4>
                <ul className="space-y-2">
                  {[
                    <>The Euclidean algorithm operates on the recurrence: <MathFormula formula="\\gcd(a, b) = \\gcd(b, a \\bmod b)" /></>,
                    'Each iteration replaces the larger number with the modulus remainder of the two numbers.',
                    'The iteration terminates when the remainder becomes 0. The divisor of this final step is the GCD.',
                    "The algorithm's complexity is O(log min(a,b)), making it extremely fast even for huge numbers.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <span style={{ color: 'var(--accent-primary)', marginTop: '2px', flexShrink: 0 }}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="animate-fade-up glass-card p-12 text-center">
              <Binary
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: 'var(--glow-primary)', animation: 'float 4s ease-in-out infinite' }}
              />
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}
              >
                No Calculations Yet
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Enter two integers in the input panel or click{' '}
                <span style={{ color: 'var(--accent-secondary)' }}>Try Example</span> to start.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
