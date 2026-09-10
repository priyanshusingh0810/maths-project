import React, { useState } from 'react';
import { mathApi } from '../utils/api';
import type { LimitResponse, GraphPoint } from '../utils/api';
import { SolutionPanel } from '../components/SolutionPanel';
import { RealLifeApplications } from '../components/RealLifeApplications';
import { MathFormula } from '../components/MathFormula';
import { RotateCcw, HelpCircle, Loader2 } from 'lucide-react';
import { SimulationSegment } from '../components/SimulationSegment';

export const LimitModule: React.FC = () => {
  const [expression, setExpression] = useState<string>('(x^2 - 4)/(x - 2)');
  const [aPoint, setAPoint] = useState<string>('2');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<LimitResponse | null>(null);

  const handleCalculate = async (expr: string, pointStr: string) => {
    setError(null);
    if (!expr.trim() || !pointStr.trim()) {
      setError('Please provide a function and a limit point.');
      return;
    }

    const a = parseFloat(pointStr);
    if (isNaN(a)) {
      setError('Limit point must be a valid number.');
      return;
    }

    setLoading(true);
    try {
      const data = await mathApi.getLimit(expr, a);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'Limit evaluation failed. Verify function expression format.');
    } finally {
      setLoading(false);
    }
  };

  const presets = [
    { name: 'Rational Hole', expr: '(x^2 - 4)/(x - 2)', a: '2' },
    { name: 'Special Sine', expr: 'sin(x)/x', a: '0' },
    { name: 'Cosine', expr: 'cos(x)', a: '0' },
    { name: 'Asymptote', expr: '1/x', a: '0' },
    { name: 'Polynomial', expr: 'x^2 + 3*x', a: '2' },
  ];

  const handleReset = () => {
    setExpression('');
    setAPoint('');
    setResponse(null);
    setError(null);
  };

  // Helper to render responsive SVG limit graph
  const renderLimitGraph = (points: GraphPoint[], aVal: number) => {
    if (!points || points.length === 0) return null;

    const width = 360;
    const height = 200;
    const padding = 30;

    // Filter points that have valid numeric y values
    const validPoints = points.filter((p) => p.y !== null) as Array<{ x: number; y: number; label: string }>;
    if (validPoints.length === 0) {
      return (
        <div className="p-4 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border text-center text-xs text-slate-500">
          Cannot plot this function (out of range or non-numeric values).
        </div>
      );
    }

    // Determine min/max coordinates for plotting boundaries
    const xCoords = validPoints.map((p) => p.x);
    const yCoords = validPoints.map((p) => p.y);

    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);

    // Coordinate mapping functions
    const scaleX = (x: number) => {
      const range = maxX - minX || 1;
      return padding + ((x - minX) / range) * (width - 2 * padding);
    };

    const scaleY = (y: number) => {
      const range = maxY - minY || 1;
      // Invert Y axis for screen space
      return height - padding - ((y - minY) / range) * (height - 2 * padding);
    };

    // Split points into left curve, limit point, and right curve
    const leftPoints = validPoints.filter((p) => p.x < aVal);
    const rightPoints = validPoints.filter((p) => p.x > aVal);
    const limitPoint = points.find((p) => p.x === aVal);

    // Build SVG paths
    const getPathData = (curvePoints: typeof validPoints) => {
      if (curvePoints.length === 0) return '';
      return curvePoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`).join(' ');
    };

    const leftPath = getPathData(leftPoints);
    const rightPath = getPathData(rightPoints);
    const leftArrowPoint = leftPoints.length > 2 ? leftPoints[leftPoints.length - 2] : null;
    const rightArrowPoint = rightPoints.length > 1 ? rightPoints[1] : null;

    // Limit value in y
    const limitY = limitPoint && limitPoint.y !== null ? scaleY(limitPoint.y) : null;
    const limitX = scaleX(aVal);

    return (
      <div className="flex flex-col items-center space-y-3">
        <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-2 shadow-inner">
          <svg width={width} height={height} className="overflow-visible select-none">
            {/* Grid Line at Y=0 if in bounds */}
            {minY <= 0 && maxY >= 0 && (
              <line
                x1={0}
                y1={scaleY(0)}
                x2={width}
                y2={scaleY(0)}
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="1"
                strokeDasharray="2"
              />
            )}

            {/* Grid Line at X=0 if in bounds */}
            {minX <= 0 && maxX >= 0 && (
              <line
                x1={scaleX(0)}
                y1={0}
                x2={scaleX(0)}
                y2={height}
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="1"
                strokeDasharray="2"
              />
            )}

            {/* Left Hand curve */}
            {leftPath && (
              <path
                d={leftPath}
                fill="none"
                className="stroke-blue-500 dark:stroke-blue-400"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}

            {/* Right Hand curve */}
            {rightPath && (
              <path
                d={rightPath}
                fill="none"
                className="stroke-pink-500 dark:stroke-pink-400"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}

            {/* Left and Right Approaching Arrows */}
            {leftArrowPoint && (
              <g className="animate-pulse">
                {/* Arrow pointing to limit point on left curve */}
                <circle cx={scaleX(leftArrowPoint.x)} cy={scaleY(leftArrowPoint.y)} r="3" className="fill-blue-600 dark:fill-blue-400" />
              </g>
            )}
            {rightArrowPoint && (
              <g className="animate-pulse">
                {/* Arrow pointing to limit point on right curve */}
                <circle cx={scaleX(rightArrowPoint.x)} cy={scaleY(rightArrowPoint.y)} r="3" className="fill-pink-600 dark:fill-pink-400" />
              </g>
            )}

            {/* Limit point marker: hollow circle represent hole */}
            {limitY !== null && (
              <g>
                {/* Vertical helper line to x-axis */}
                <line
                  x1={limitX}
                  y1={limitY}
                  x2={limitX}
                  y2={height - padding}
                  className="stroke-slate-300 dark:stroke-slate-700"
                  strokeWidth="1"
                  strokeDasharray="3"
                />
                {/* Horizontal helper line to y-axis */}
                <line
                  x1={padding}
                  y1={limitY}
                  x2={limitX}
                  y2={limitY}
                  className="stroke-slate-300 dark:stroke-slate-700"
                  strokeWidth="1"
                  strokeDasharray="3"
                />
                {/* Target limit point */}
                <circle
                  cx={limitX}
                  cy={limitY}
                  r="6"
                  className="fill-white dark:fill-slate-900 stroke-purple-600 dark:stroke-purple-400"
                  strokeWidth="2.5"
                />
              </g>
            )}

            {/* Label markings */}
            <text x={padding} y={height - padding + 15} className="text-[9px] fill-slate-400">x = {minX.toFixed(1)}</text>
            <text x={width - padding - 40} y={height - padding + 15} className="text-[9px] fill-slate-400">x = {maxX.toFixed(1)}</text>
            
            {limitPoint && limitPoint.y !== null && (
              <text x={limitX - 10} y={height - padding + 15} className="text-[9px] font-bold fill-purple-650 dark:fill-purple-400 font-mono">
                a={aVal}
              </text>
            )}
          </svg>
        </div>

        <div className="flex gap-4 text-[10px] font-bold">
          <div className="flex items-center gap-1 text-blue-500">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
            LHL (approaching left)
          </div>
          <div className="flex items-center gap-1 text-purple-500 font-extrabold">
            <span className="w-3 h-3 bg-white border-2 border-purple-500 rounded-full"></span>
            Limit Point
          </div>
          <div className="flex items-center gap-1 text-pink-500">
            <span className="w-2.5 h-2.5 bg-pink-500 rounded-full"></span>
            RHL (approaching right)
          </div>
        </div>
      </div>
    );
  };

  const apps = [
    { title: 'Instantaneous Velocity', description: 'Used in physics to define speed at an exact moment: velocity(t) = lim &Delta;t->0 (s(t+&Delta;t)-s(t))/&Delta;t.' },
    { title: 'Economic Optimization', description: 'Evaluates marginal costs and revenue behaviors as volume rates reach capacity bounds.' },
    { title: 'Neural Net Backpropagation', description: 'Formulates mathematical derivatives used in training models via Gradient Descent rates.' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="border-b pb-4 border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-indigo-55 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
          Unit II &bull; Calculus
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-850 dark:text-white">
          Limit Calculator &amp; Visualizer
        </h1>
        <p className="text-slate-655 dark:text-slate-400 text-sm max-w-2xl">
          Evaluate limits of complex algebraic and trigonometric functions as x approaches a point, powered by SymPy symbolics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-1 glass-card p-6  space-y-5 self-start">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Calculator Parameters
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="func-expr" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Function f(x)
              </label>
              <input
                id="func-expr"
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g. (x^2 - 4)/(x - 2)"
                className="input-glow w-full px-4 py-3 text-sm font-semibold"
              />
            </div>

            <div>
              <label htmlFor="limit-point" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Approaching Point (x &rarr; a)
              </label>
              <input
                id="limit-point"
                type="text"
                value={aPoint}
                onChange={(e) => setAPoint(e.target.value)}
                placeholder="e.g. 2"
                className="input-glow w-full px-4 py-3 text-sm font-semibold"
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
              onClick={() => handleCalculate(expression, aPoint)}
              disabled={loading}
              className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Evaluate Limits
            </button>

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Inputs
            </button>
          </div>

          {/* Quick presets */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-850 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Preset Examples
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setExpression(p.expr);
                    setAPoint(p.a);
                    handleCalculate(p.expr, p.a);
                  }}
                  className="px-2 py-1 bg-slate-50 dark:bg-slate-955 border hover:bg-indigo-50 dark:hover:bg-indigo-950/20 text-slate-655 dark:text-slate-400 hover:text-indigo-650 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Panel / Visualization */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start glass-card p-6 sm:p-8 ">
            {/* Left Col: Plot */}
            <div className="space-y-4 flex flex-col w-full">
              <SimulationSegment
                title="Limit Function Graph"
                description={`Cartesian simulation approaching x = ${aPoint}`}
              >
                <div className="flex flex-col items-center justify-center py-4">
                  {response ? (
                    renderLimitGraph(response.points, parseFloat(aPoint))
                  ) : (
                    <div className="w-[360px] h-[200px] border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center justify-center text-slate-400 text-xs">
                      Chart loads after calculation
                    </div>
                  )}
                </div>
              </SimulationSegment>
            </div>

            {/* Right Col: Left, Right, Two-Sided Values */}
            {response ? (
              <div className="space-y-5 self-start pt-4 md:pt-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Evaluated Limits
                </h3>

                <div className="space-y-3">
                  {/* Left-Hand Limit Card */}
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 border rounded-2xl border-slate-205 border-slate-205/60 dark:border-slate-850 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-bold text-slate-450 uppercase block">Left-Hand Limit</span>
                      <MathFormula formula={`\\lim_{x \\to ${aPoint}^-} f(x)`} className="text-xs" />
                    </div>
                    <div className="text-lg font-black text-blue-500 font-mono">{response.left_limit}</div>
                  </div>

                  {/* Right-Hand Limit Card */}
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 border rounded-2xl border-slate-205 border-slate-205/60 dark:border-slate-850 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-bold text-slate-450 uppercase block">Right-Hand Limit</span>
                      <MathFormula formula={`\\lim_{x \\to ${aPoint}^+} f(x)`} className="text-xs" />
                    </div>
                    <div className="text-lg font-black text-pink-500 font-mono">{response.right_limit}</div>
                  </div>

                  {/* Two-Sided Limit Card */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border rounded-2xl border-slate-205 border-slate-250/60 dark:border-slate-850 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-455 uppercase block">Two-Sided Limit</span>
                      <MathFormula formula={`\\lim_{x \\to ${aPoint}} f(x)`} className="text-xs" />
                    </div>
                    <div className="text-2xl font-black text-purple-650 dark:text-purple-400 font-mono">{response.limit}</div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-[11px] font-semibold text-center ${
                  response.limit_exists
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-250 text-emerald-650 dark:text-emerald-400'
                    : 'bg-rose-50/50 dark:bg-rose-955/20 border-rose-250 text-rose-650 dark:text-rose-455'
                }`}>
                  {response.limit_exists ? 'Limit Exists (LHL == RHL)' : 'Limit Does Not Exist (LHL != RHL)'}
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-16">
                Fill details in inputs card to observe mathematical output forms.
              </div>
            )}
          </div>

          {response && (
            <div className="glass-card p-6 sm:p-8  space-y-8">
              <SolutionPanel
                given={`f(x) = ${expression}, \\quad x \\to ${aPoint}`}
                formula={response.formula}
                calculationSteps={response.steps}
                finalAnswer={`Limit = ${response.limit}`}
                explanation={response.explanation}
              />

              <RealLifeApplications applications={apps} />

              {/* Calculus explanation details */}
              <div className="bg-slate-50 dark:bg-slate-955/20 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-850/50 space-y-3">
                <h4 className="font-bold text-slate-850 dark:text-white text-sm flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                  What is a limit with a hole?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed">
                  A function like <MathFormula formula="f(x) = \frac{x^2 - 4}{x - 2}" /> has a removable discontinuity (a hole) 
                  at <MathFormula formula="x = 2" /> because direct substitution results in <MathFormula formula="\frac{0}{0}" /> (undefined). 
                  However, when taking the limit, we evaluate the values of the function as we get closer and closer to 2, not *at* 2. 
                  Since we can simplify the function to <MathFormula formula="f(x) = x + 2" /> for all <MathFormula formula="x \neq 2" />, 
                  we observe the values approach 4 from both the left and right. Hence, the limit exists and equals 4.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
