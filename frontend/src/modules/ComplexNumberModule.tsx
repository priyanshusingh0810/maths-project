import React, { useState, useEffect } from 'react';
import { mathApi } from '../utils/api';
import type { ComplexResponse, ComplexInput } from '../utils/api';
import { SolutionPanel } from '../components/SolutionPanel';
import { RealLifeApplications } from '../components/RealLifeApplications';
import { MathFormula } from '../components/MathFormula';
import { Play, RotateCcw, Loader2 } from 'lucide-react';

export const ComplexNumberModule: React.FC = () => {
  const [z1Real, setZ1Real] = useState<string>('2');
  const [z1Imag, setZ1Imag] = useState<string>('3');
  const [z2Real, setZ2Real] = useState<string>('1');
  const [z2Imag, setZ2Imag] = useState<string>('4');
  const [operation, setOperation] = useState<string>('add');
  const [activeInputNode, setActiveInputNode] = useState<'z1' | 'z2'>('z1');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ComplexResponse | null>(null);

  const handleCalculate = async (
    r1: string, i1: string,
    r2: string, i2: string,
    op: string
  ) => {
    setError(null);
    if (!r1.trim() || !i1.trim()) {
      setError('Please fill in z1 coordinates.');
      return;
    }

    const real1 = parseFloat(r1);
    const imag1 = parseFloat(i1);
    
    let real2 = 0;
    let imag2 = 0;

    const needsZ2 = ['add', 'sub', 'mul', 'div'].includes(op);
    if (needsZ2) {
      if (!r2.trim() || !i2.trim()) {
        setError('Please fill in z2 coordinates for arithmetic operations.');
        return;
      }
      real2 = parseFloat(r2);
      imag2 = parseFloat(i2);
      if (isNaN(real2) || isNaN(imag2)) {
        setError('Please enter valid float values for z2.');
        return;
      }
    }

    if (isNaN(real1) || isNaN(imag1)) {
      setError('Please enter valid float values for z1.');
      return;
    }

    if (op === 'div' && real2 === 0 && imag2 === 0) {
      setError('Division by zero complex number is not allowed.');
      return;
    }

    setLoading(true);
    try {
      const z1Obj: ComplexInput = { real: real1, imag: imag1 };
      const z2Obj: ComplexInput | null = needsZ2 ? { real: real2, imag: imag2 } : null;

      const data = await mathApi.getComplex(z1Obj, z2Obj, op);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'Complex operation failed.');
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setZ1Real('2');
    setZ1Imag('3');
    setZ2Real('1');
    setZ2Imag('4');
    setOperation('add');
    handleCalculate('2', '3', '1', '4', 'add');
  };

  const handleReset = () => {
    setZ1Real('');
    setZ1Imag('');
    setZ2Real('');
    setZ2Imag('');
    setResponse(null);
    setError(null);
  };

  // Run calculation when parameters or operation changes
  useEffect(() => {
    if (z1Real && z1Imag) {
      handleCalculate(z1Real, z1Imag, z2Real, z2Imag, operation);
    }
  }, [operation]);

  // Click-on-graph placement logic
  const handleGraphClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // relative x in pixels
    const y = e.clientY - rect.top; // relative y in pixels

    // Canvas size is 280x280. Center is 140, 140. Scale range is -10 to 10.
    const size = 280;
    const center = size / 2;
    const scale = 14; // pixels per unit (140 / 10)

    // Calculate Cartesian coordinates
    const calcReal = parseFloat(((x - center) / scale).toFixed(1));
    const calcImag = parseFloat(((center - y) / scale).toFixed(1));

    if (activeInputNode === 'z1') {
      setZ1Real(calcReal.toString());
      setZ1Imag(calcImag.toString());
      handleCalculate(calcReal.toString(), calcImag.toString(), z2Real, z2Imag, operation);
    } else {
      setZ2Real(calcReal.toString());
      setZ2Imag(calcImag.toString());
      handleCalculate(z1Real, z1Imag, calcReal.toString(), calcImag.toString(), operation);
    }
  };

  const renderComplexPlane = () => {
    const size = 280;
    const center = size / 2;
    const scale = 14; // pixels per unit (140px = 10 units)

    const r1 = parseFloat(z1Real) || 0;
    const i1 = parseFloat(z1Imag) || 0;
    const r2 = parseFloat(z2Real) || 0;
    const i2 = parseFloat(z2Imag) || 0;

    const z1X = center + r1 * scale;
    const z1Y = center - i1 * scale;
    const z2X = center + r2 * scale;
    const z2Y = center - i2 * scale;

    let resX = center;
    let resY = center;
    const showResult = response !== null && ['add', 'sub', 'mul', 'div'].includes(operation);
    if (showResult && response) {
      resX = center + response.result.real * scale;
      resY = center - response.result.imag * scale;
    }

    // Grid markings
    const gridTicks = [-8, -6, -4, -2, 2, 4, 6, 8];

    return (
      <div className="flex flex-col items-center space-y-4">
        {/* Placement node toggle */}
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-950/60 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveInputNode('z1')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeInputNode === 'z1'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-850 dark:hover:text-white'
            }`}
          >
            Click to Place z1
          </button>
          <button
            onClick={() => setActiveInputNode('z2')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeInputNode === 'z2'
                ? 'bg-pink-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-850 dark:hover:text-white'
            }`}
          >
            Click to Place z2
          </button>
        </div>

        <div className="relative bg-slate-50 dark:bg-slate-950/30 rounded-3xl p-3 border border-slate-200 dark:border-slate-850/80 shadow-inner">
          <svg
            width={size}
            height={size}
            onClick={handleGraphClick}
            className="cursor-crosshair overflow-visible select-none"
          >
            {/* Grid Lines */}
            {gridTicks.map((tick) => (
              <React.Fragment key={tick}>
                {/* Horizontal */}
                <line
                  x1={0}
                  y1={center - tick * scale}
                  x2={size}
                  y2={center - tick * scale}
                  className="stroke-slate-200/40 dark:stroke-slate-800/30"
                  strokeWidth="1"
                />
                {/* Vertical */}
                <line
                  x1={center + tick * scale}
                  y1={0}
                  x2={center + tick * scale}
                  y2={size}
                  className="stroke-slate-200/40 dark:stroke-slate-800/30"
                  strokeWidth="1"
                />
              </React.Fragment>
            ))}

            {/* X and Y Axes */}
            <line x1={0} y1={center} x2={size} y2={center} className="stroke-slate-400/80 dark:stroke-slate-700/80" strokeWidth="1.5" />
            <line x1={center} y1={0} x2={center} y2={size} className="stroke-slate-400/80 dark:stroke-slate-700/80" strokeWidth="1.5" />

            {/* Axes Labels */}
            <text x={size - 12} y={center - 5} className="text-[10px] font-bold fill-slate-455 font-sans dark:fill-slate-500">Re</text>
            <text x={center + 5} y={12} className="text-[10px] font-bold fill-slate-455 font-sans dark:fill-slate-500">Im</text>

            {/* z2 Vector path */}
            {['add', 'sub', 'mul', 'div'].includes(operation) && (
              <>
                <line
                  x1={center}
                  y1={center}
                  x2={z2X}
                  y2={z2Y}
                  className="stroke-pink-500/60 dark:stroke-pink-400/60"
                  strokeWidth="2"
                />
                <circle cx={z2X} cy={z2Y} r="5" className="fill-pink-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
              </>
            )}

            {/* z1 Vector path */}
            <line
              x1={center}
              y1={center}
              x2={z1X}
              y2={z1Y}
              className="stroke-blue-500/65 dark:stroke-blue-400/65"
              strokeWidth="2.5"
            />
            <circle cx={z1X} cy={z1Y} r="5.5" className="fill-blue-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />

            {/* Result Vector Path */}
            {showResult && (
              <>
                <line
                  x1={center}
                  y1={center}
                  x2={resX}
                  y2={resY}
                  className="stroke-purple-600 dark:stroke-purple-400"
                  strokeWidth="3"
                  strokeDasharray={operation === 'mul' || operation === 'div' ? 'none' : '3'}
                />
                {/* Result Point */}
                <circle cx={resX} cy={resY} r="7" className="fill-purple-600 stroke-white dark:stroke-slate-900" strokeWidth="2" />
              </>
            )}

            {/* Text coordinates label overlays */}
            <text x={z1X + 8} y={z1Y - 4} className="text-[9px] font-extrabold fill-blue-600 dark:fill-blue-450 bg-slate-900 px-1">z1</text>
            {['add', 'sub', 'mul', 'div'].includes(operation) && (
              <text x={z2X + 8} y={z2Y - 4} className="text-[9px] font-extrabold fill-pink-600 dark:fill-pink-450">z2</text>
            )}
            {showResult && (
              <text x={resX + 8} y={resY - 4} className="text-[9px] font-extrabold fill-purple-600 dark:fill-purple-450">Res</text>
            )}
          </svg>
        </div>

        <p className="text-[10px] text-slate-500 text-center max-w-[240px]">
          Click inside the plane to drag/reposition the active coordinate point. Axes range from -10 to +10.
        </p>
      </div>
    );
  };

  const apps = [
    { title: 'Electrical Impedance', description: 'Real parts correspond to electric resistance, and imaginary parts correspond to inductances/capacitances.' },
    { title: 'Audio Signal Processing', description: 'Uses complex vectors in Fourier Analysis algorithms to transform wave patterns from time dimensions into frequency spectrums.' },
    { title: 'Quantum Wave Mechanics', description: 'Schrödinger Wave equations rely explicitly on imaginary numbers to map probabilities of atomic particles.' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="border-b pb-4 border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-indigo-55 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
          Unit I &bull; Complex Algebra
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-850 dark:text-white">
          Complex Number Explorer
        </h1>
        <p className="text-slate-655 dark:text-slate-400 text-sm max-w-2xl">
          Conduct algebraic operations between complex numbers and plot vectors immediately on the 2D complex plane.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5 self-start">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Calculator Parameters
          </h2>

          <div className="space-y-4">
            {/* Op select */}
            <div>
              <label htmlFor="operation-select" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Operation Type
              </label>
              <select
                id="operation-select"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-850 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="add">Addition (z1 + z2)</option>
                <option value="sub">Subtraction (z1 - z2)</option>
                <option value="mul">Multiplication (z1 * z2)</option>
                <option value="div">Division (z1 / z2)</option>
                <option value="polar">Polar Metrics of z1</option>
              </select>
            </div>

            {/* z1 Real & Imag */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-3 space-y-3">
              <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 block">
                Complex Number z1 (a + bi)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="z1-real" className="block text-[9px] font-bold text-slate-405 dark:text-slate-400 uppercase mb-1">
                    Real Part (a)
                  </label>
                  <input
                    id="z1-real"
                    type="number"
                    step="0.5"
                    value={z1Real}
                    onChange={(e) => setZ1Real(e.target.value)}
                    placeholder="e.g. 2"
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-850 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="z1-imag" className="block text-[9px] font-bold text-slate-405 dark:text-slate-400 uppercase mb-1">
                    Imaginary Part (b)
                  </label>
                  <input
                    id="z1-imag"
                    type="number"
                    step="0.5"
                    value={z1Imag}
                    onChange={(e) => setZ1Imag(e.target.value)}
                    placeholder="e.g. 3"
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-850 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* z2 Real & Imag */}
            {['add', 'sub', 'mul', 'div'].includes(operation) && (
              <div className="border-t border-slate-105 border-slate-100 dark:border-slate-850 pt-3 space-y-3">
                <span className="text-xs font-bold text-pink-500 dark:text-pink-400 block">
                  Complex Number z2 (c + di)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="z2-real" className="block text-[9px] font-bold text-slate-405 dark:text-slate-400 uppercase mb-1">
                      Real Part (c)
                    </label>
                    <input
                      id="z2-real"
                      type="number"
                      step="0.5"
                      value={z2Real}
                      onChange={(e) => setZ2Real(e.target.value)}
                      placeholder="e.g. 1"
                      className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-850 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="z2-imag" className="block text-[9px] font-bold text-slate-405 dark:text-slate-400 uppercase mb-1">
                      Imaginary Part (d)
                    </label>
                    <input
                      id="z2-imag"
                      type="number"
                      step="0.5"
                      value={z2Imag}
                      onChange={(e) => setZ2Imag(e.target.value)}
                      placeholder="e.g. 4"
                      className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-850 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-955/20 border border-rose-200 dark:border-rose-900 text-[11px] font-semibold text-rose-600 dark:text-rose-455 rounded-xl leading-snug">
              {error}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleCalculate(z1Real, z1Imag, z2Real, z2Imag, operation)}
              disabled={loading}
              className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Evaluate Explorer
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            
            {/* Left Col: Coordinate Visualization */}
            <div className="space-y-4 flex flex-col items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white self-start">
                Interactive Complex Plane
              </h3>
              {renderComplexPlane()}
            </div>

            {/* Right Col: Mathematical results */}
            {response ? (
              <div className="space-y-6 self-start pt-4 md:pt-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Mathematical Forms
                </h3>

                {/* Cartesian Result Card */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border rounded-2xl border-slate-200/60 dark:border-slate-850 space-y-1">
                  <span className="text-[10px] font-bold text-slate-450 uppercase block">Cartesian Expression</span>
                  <div className="text-xl font-black text-slate-850 dark:text-white">
                    {response.result.real.toFixed(2)} {response.result.imag >= 0 ? '+' : '-'} {Math.abs(response.result.imag).toFixed(2)}i
                  </div>
                </div>

                {/* Polar Result Card */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border rounded-2xl border-slate-200/60 dark:border-slate-850 space-y-2">
                  <span className="text-[10px] font-bold text-slate-450 uppercase block">Polar Coordinates</span>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-mono space-y-1">
                    <div>Modulus (r): <span className="font-bold text-indigo-500">{response.result_polar.r.toFixed(4)}</span></div>
                    <div>Angle (&theta; rad): <span className="font-bold text-purple-500">{response.result_polar.theta.toFixed(4)} rad</span></div>
                    <div>Angle (&theta;&deg; deg): <span className="font-bold text-pink-500">{response.result_polar.theta_deg.toFixed(2)}&deg;</span></div>
                  </div>
                  <div className="pt-2 border-t text-[11px] text-slate-500 italic">
                    Polar: <MathFormula formula={`z = ${response.result_polar.r.toFixed(2)}(\\cos(${response.result_polar.theta.toFixed(2)}) + i\\sin(${response.result_polar.theta.toFixed(2)}))`} />
                  </div>
                </div>

                {/* Inputs Forms Summary */}
                <div className="p-4 border rounded-2xl border-slate-100 dark:border-slate-850 text-[11px] text-slate-550 dark:text-slate-400 space-y-2 leading-relaxed">
                  <div>
                    <strong>z1 Modulus:</strong> {response.z1_polar.r.toFixed(3)} | <strong>Arg:</strong> {response.z1_polar.theta_deg.toFixed(1)}&deg;
                  </div>
                  {response.z2_polar && (
                    <div>
                      <strong>z2 Modulus:</strong> {response.z2_polar.r.toFixed(3)} | <strong>Arg:</strong> {response.z2_polar.theta_deg.toFixed(1)}&deg;
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-center text-slate-400 py-16">
                Fill details in inputs card to observe mathematical output forms.
              </div>
            )}
          </div>

          {response && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
              <SolutionPanel
                given={
                  <div>
                    z1 = {z1Real} + {z1Imag}i
                    {['add', 'sub', 'mul', 'div'].includes(operation) && `, \u00A0 z2 = ${z2Real} + ${z2Imag}i`}
                  </div>
                }
                formula={response.formula}
                calculationSteps={response.steps}
                finalAnswer={`Result = ${response.result.real.toFixed(3)} ${response.result.imag >= 0 ? '+' : '-'} ${Math.abs(response.result.imag).toFixed(3)}i`}
                explanation={response.explanation}
              />

              <RealLifeApplications applications={apps} />
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
