import React, { useState } from 'react';
import { mathApi } from '../utils/api';
import type { GCDResponse } from '../utils/api';
import { SolutionPanel } from '../components/SolutionPanel';
import { RealLifeApplications } from '../components/RealLifeApplications';
import { MathFormula } from '../components/MathFormula';
import { Play, RotateCcw, HelpCircle, Check, Loader2, Binary } from 'lucide-react';

// Shared dark-theme module styles
const moduleStyles = {
  page: { backgroundColor: 'transparent', color: 'var(--text-primary)' },
  inputCard: {
    background: 'rgba(15, 22, 45, 0.8)',
    border: '1px solid rgba(108,99,255,0.15)',
    borderRadius: '20px',
    padding: '24px',
  },
  outputCard: {
    background: 'rgba(15, 22, 45, 0.8)',
    border: '1px solid rgba(108,99,255,0.15)',
    borderRadius: '20px',
    padding: '32px',
  },
  resultBox: {
    background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.06))',
    border: '1px solid rgba(16,185,129,0.25)',
    borderRadius: '16px',
    padding: '24px',
  },
  emptyCard: {
    background: 'rgba(15, 22, 45, 0.6)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '20px',
    padding: '48px 24px',
    textAlign: 'center' as const,
  },
};

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
        style={{ borderBottom: '1px solid rgba(108,99,255,0.12)' }}
      >
        <span className="neon-pill neon-pill-indigo mb-3 inline-flex">Unit I · Number Theory</span>
        <h1
          className="section-heading text-3xl sm:text-4xl font-black mt-2"
          style={{ color: 'rgba(241,245,249,0.95)' }}
        >
          GCD Calculator —{' '}
          <span className="gradient-text-static">Euclidean Algorithm</span>
        </h1>
        <p className="text-sm mt-2 max-w-2xl" style={{ color: 'rgba(100,116,139,0.9)' }}>
          Find the Greatest Common Divisor using the classical Euclidean division remainder method, illustrated through modular step progression.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Input Panel */}
        <div className="lg:col-span-1 self-start animate-fade-up delay-100" style={moduleStyles.inputCard}>
          <h2
            className="font-extrabold text-base mb-5"
            style={{ color: 'rgba(241,245,249,0.95)', fontFamily: "'Outfit', sans-serif" }}
          >
            Calculator Inputs
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="gcd-input-a"
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'rgba(100,116,139,0.9)' }}
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
                style={{ color: 'rgba(100,116,139,0.9)' }}
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
                color: '#fca5a5',
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
                className="flex-1 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  color: '#6ee7b7',
                }}
              >
                <Play className="w-3 h-3 fill-current" />
                Try Example
              </button>
              <button
                id="gcd-reset"
                onClick={handleReset}
                className="py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center cursor-pointer transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(100,116,139,0.8)',
                }}
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
            <div className="animate-fade-up space-y-8" style={moduleStyles.outputCard}>

              {/* Result */}
              <div className="text-center space-y-2" style={moduleStyles.resultBox}>
                <span
                  className="text-[10px] font-black uppercase tracking-wider"
                  style={{ color: 'rgba(100,116,139,0.8)' }}
                >
                  Greatest Common Divisor
                </span>
                <div
                  className="section-heading text-5xl font-black"
                  style={{
                    color: '#34d399',
                    textShadow: '0 0 30px rgba(16,185,129,0.4)',
                  }}
                >
                  {response.result}
                </div>
                <div className="text-xs" style={{ color: 'rgba(100,116,139,0.7)' }}>
                  <MathFormula formula={`\\gcd(${aStr}, ${bStr}) = ${response.result}`} />
                </div>
              </div>

              {/* Euclidean Division Cards */}
              <div className="space-y-3">
                <h3
                  className="font-bold text-base"
                  style={{ color: 'rgba(226,232,240,0.95)', fontFamily: "'Outfit', sans-serif" }}
                >
                  Euclidean Division Pipeline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {response.steps.map((step, index) => {
                    const isLast = index === response.steps.length - 1;
                    return (
                      <div
                        key={step.step_num}
                        className="p-4 rounded-2xl transition-all duration-200"
                        style={{
                          background: isLast
                            ? 'rgba(16,185,129,0.08)'
                            : 'rgba(255,255,255,0.02)',
                          border: isLast
                            ? '1px solid rgba(16,185,129,0.3)'
                            : '1px solid rgba(255,255,255,0.05)',
                          boxShadow: isLast ? '0 4px 20px rgba(16,185,129,0.1)' : 'none',
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                              background: isLast ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)',
                              color: isLast ? '#34d399' : 'rgba(100,116,139,0.8)',
                              border: isLast ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.06)',
                            }}
                          >
                            Step {step.step_num}
                          </span>
                          {isLast && (
                            <span
                              className="text-[10px] font-bold flex items-center gap-0.5"
                              style={{ color: '#34d399' }}
                            >
                              <Check className="w-3 h-3" />
                              GCD Found
                            </span>
                          )}
                        </div>
                        <div
                          className="font-mono text-base font-bold my-2"
                          style={{ color: 'rgba(226,232,240,0.95)', fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {step.equation}
                        </div>
                        <div
                          className="flex justify-between text-xs pt-2"
                          style={{
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            color: 'rgba(100,116,139,0.8)',
                          }}
                        >
                          <span>Quotient: <strong style={{ color: 'rgba(203,213,225,0.9)' }}>{step.quotient}</strong></span>
                          <span>
                            Remainder:{' '}
                            <strong
                              style={{
                                color: isLast ? '#34d399' : '#a5b4fc',
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
              <div
                className="p-5 rounded-2xl space-y-3"
                style={{
                  background: 'rgba(108,99,255,0.05)',
                  border: '1px solid rgba(108,99,255,0.15)',
                }}
              >
                <h4
                  className="font-bold text-sm flex items-center gap-1.5"
                  style={{ color: '#a5b4fc' }}
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
                      style={{ color: 'rgba(148,163,184,0.9)' }}
                    >
                      <span style={{ color: '#6C63FF', marginTop: '2px', flexShrink: 0 }}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="animate-fade-up" style={moduleStyles.emptyCard}>
              <Binary
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: 'rgba(108,99,255,0.3)', animation: 'float 4s ease-in-out infinite' }}
              />
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: 'rgba(241,245,249,0.8)', fontFamily: "'Outfit', sans-serif" }}
              >
                No Calculations Yet
              </h3>
              <p className="text-sm" style={{ color: 'rgba(100,116,139,0.8)' }}>
                Enter two integers in the input panel or click{' '}
                <span style={{ color: '#6ee7b7' }}>Try Example</span> to start.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
