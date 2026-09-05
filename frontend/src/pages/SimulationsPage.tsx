import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Activity, Binary, CircleDot, Compass, Shuffle, Layers, Play, Pause, RotateCcw } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   SIMULATION PAGE — Real-time visual representations
   All simulations are self-contained, animated, and interactive
   ═══════════════════════════════════════════════════════════════ */

// ─── GCD Simulation: Animated Bar Reduction ─────────────────────────────
const GCDSimulation: React.FC = () => {
  const [a, setA] = useState(48);
  const [b, setB] = useState(18);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [steps, setSteps] = useState<{ a: number; b: number; r: number }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const computeSteps = useCallback((na: number, nb: number) => {
    const s: { a: number; b: number; r: number }[] = [];
    let x = Math.abs(na), y = Math.abs(nb);
    while (y !== 0) { s.push({ a: x, b: y, r: x % y }); x = y; y = x % y === 0 ? 0 : x % y; x = s[s.length - 1].b; y = s[s.length - 1].r; }
    return s;
  }, []);

  useEffect(() => { setSteps(computeSteps(a, b)); setStep(0); setPlaying(false); }, [a, b, computeSteps]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep(s => { if (s >= steps.length - 1) { setPlaying(false); return s; } return s + 1; });
      }, 900);
    } else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, steps.length]);

  const gcd = steps.length > 0 ? steps[steps.length - 1].b : (a === 0 ? b : a);
  const maxVal = Math.max(a, b);
  const current = steps[step] || { a, b, r: a % b };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {[{ label: 'a', val: a, set: setA }, { label: 'b', val: b, set: setB }].map(({ label, val, set }) => (
          <div key={label}>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Value {label}</label>
            <input type="number" value={val} onChange={e => set(Math.abs(parseInt(e.target.value) || 1))}
              className="input-glow w-full px-3 py-2 text-sm font-mono" min={1} max={999} />
          </div>
        ))}
      </div>

      {/* Animated bar chart */}
      <div className="rounded-xl p-4 space-y-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
            Step {step + 1} of {steps.length}: {current.a} = {Math.floor(current.a / current.b)} × {current.b} + {current.r}
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'var(--glow-emerald)', color: 'var(--accent-emerald)', border: '1px solid rgba(5,150,105,0.3)' }}>
            GCD = {gcd}
          </span>
        </div>

        {['a', 'b', 'r'].map((key, ki) => {
          const val = key === 'a' ? current.a : key === 'b' ? current.b : current.r;
          const colors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-emerald)'];
          const labels = ['Dividend (a)', 'Divisor (b)', 'Remainder (r)'];
          return (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: 'var(--text-muted)' }}>{labels[ki]}</span>
                <span className="font-mono font-bold" style={{ color: colors[ki] }}>{val}</span>
              </div>
              <div className="h-7 rounded-lg overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="h-full rounded-lg transition-all duration-700"
                  style={{ width: `${maxVal > 0 ? (val / maxVal) * 100 : 0}%`, background: colors[ki], opacity: val === 0 ? 0.2 : 1 }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Step trace */}
      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            className="text-xs font-mono px-2 py-1 rounded transition-all cursor-pointer"
            style={{
              background: i === step ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: i === step ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${i === step ? 'var(--accent-primary)' : 'var(--border-default)'}`,
              transform: i === step ? 'scale(1.05)' : 'scale(1)',
            }}>
            {s.a} mod {s.b} = {s.r}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setPlaying(p => !p)}
          className="btn-glow flex items-center gap-2 text-sm px-4 py-2">
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {playing ? 'Pause' : 'Animate'}
        </button>
        <button onClick={() => { setStep(0); setPlaying(false); }}
          className="btn-outline-glow flex items-center gap-2 text-sm px-4 py-2">
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>
    </div>
  );
};

// ─── Congruence Simulation: Animated Clock Dial ──────────────────────────
const CongruenceSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [a, setA] = useState(7);
  const [m, setM] = useState(12);
  const [animT, setAnimT] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;
    const R = Math.min(w, h) / 2 - 20;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Background circle
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100,116,139,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Tick marks & numbers
      for (let i = 0; i < m; i++) {
        const ang = (i / m) * Math.PI * 2 - Math.PI / 2;
        const x1 = cx + (R - 8) * Math.cos(ang);
        const y1 = cy + (R - 8) * Math.sin(ang);
        const x2 = cx + R * Math.cos(ang);
        const y2 = cy + R * Math.sin(ang);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(100,116,139,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();

        const tx = cx + (R - 22) * Math.cos(ang);
        const ty = cy + (R - 22) * Math.sin(ang);
        const isTarget = i === (a % m);
        ctx.font = `${isTarget ? 'bold' : 'normal'} 11px monospace`;
        ctx.fillStyle = isTarget ? '#3b82f6' : 'rgba(100,116,139,0.7)';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(i), tx, ty);
      }

      // Animated hand
      const targetAngle = ((a % m) / m) * Math.PI * 2 - Math.PI / 2;
      const handAngle = targetAngle + Math.sin(t * 0.05) * 0.04; // subtle wobble
      const hx = cx + (R - 30) * Math.cos(handAngle);
      const hy = cy + (R - 30) * Math.sin(handAngle);

      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(hx, hy);
      ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 3;
      ctx.lineCap = 'round'; ctx.stroke();

      // Center dot
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6'; ctx.fill();

      // Target highlight
      const tAng = ((a % m) / m) * Math.PI * 2 - Math.PI / 2;
      const tx2 = cx + (R - 30) * Math.cos(tAng);
      const ty2 = cy + (R - 30) * Math.sin(tAng);
      ctx.beginPath(); ctx.arc(tx2, ty2, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59,130,246,0.3)'; ctx.fill();
      ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2; ctx.stroke();

      t++;
      setAnimT(t);
    };

    const loop = () => { draw(); animRef.current = requestAnimationFrame(loop); };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [a, m]);

  const remainder = ((a % m) + m) % m;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {[{ label: 'a (integer)', val: a, set: setA }, { label: 'm (modulus)', val: m, set: setM, min: 2 }].map(({ label, val, set, min }) => (
          <div key={label}>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{label}</label>
            <input type="number" value={val} onChange={e => set(Math.max(min || 0, parseInt(e.target.value) || 0))}
              className="input-glow w-full px-3 py-2 text-sm font-mono" min={min || 0} max={99} />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <canvas ref={canvasRef} width={220} height={220} className="rounded-xl"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }} />
      </div>

      <div className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
        <div className="text-sm font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
          {a} mod {m} = <span style={{ color: 'var(--accent-primary)' }}>{remainder}</span>
        </div>
        <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          The hand points to position <strong>{remainder}</strong> on the clock of {m}
        </div>
      </div>
      <div style={{ display: 'none' }}>{animT}</div>
    </div>
  );
};

// ─── Complex Numbers: Interactive Argand Plane ───────────────────────────
const ComplexSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [re, setRe] = useState(3);
  const [im, setIm] = useState(4);
  const [animT, setAnimT] = useState(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const scale = 28;
    let t = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, W, H);
      // Grid
      ctx.strokeStyle = 'rgba(100,116,139,0.1)'; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += scale) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += scale) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      // Axes
      ctx.strokeStyle = 'rgba(100,116,139,0.4)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      // Labels
      ctx.font = '10px monospace'; ctx.fillStyle = 'rgba(100,116,139,0.6)'; ctx.textAlign = 'center';
      ctx.fillText('Re', W - 14, cy - 6); ctx.fillText('Im', cx + 16, 12);
      for (let i = -5; i <= 5; i++) {
        if (i === 0) continue;
        ctx.fillText(String(i), cx + i * scale, cy + 14);
        ctx.fillText(String(i), cx + 4, cy - i * scale + 4);
      }
    };

    const draw = () => {
      drawGrid();
      const px = cx + re * scale;
      const py = cy - im * scale;
      const r = Math.sqrt(re * re + im * im);
      const theta = Math.atan2(im, re);

      // Animated rotation arc
      const arcColor = 'rgba(59,130,246,0.15)';
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r * scale, 0, theta, theta < 0);
      ctx.fillStyle = arcColor; ctx.fill();

      // Modulus line (animated glow)
      const glow = 0.6 + 0.4 * Math.sin(t * 0.08);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py);
      ctx.strokeStyle = `rgba(59,130,246,${glow})`; ctx.lineWidth = 2; ctx.setLineDash([]);
      ctx.stroke();

      // Real component dashed
      ctx.beginPath(); ctx.moveTo(cx, py); ctx.lineTo(px, py);
      ctx.strokeStyle = 'rgba(245,158,11,0.6)'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]); ctx.stroke();
      // Imaginary component dashed
      ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py);
      ctx.strokeStyle = 'rgba(52,211,153,0.6)'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]); ctx.stroke();
      ctx.setLineDash([]);

      // Point
      const ptGlow = 0.7 + 0.3 * Math.sin(t * 0.1);
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59,130,246,${ptGlow})`; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();

      // Label
      ctx.font = 'bold 12px monospace'; ctx.fillStyle = '#fff'; ctx.textAlign = 'left';
      ctx.fillText(`${re} + ${im}i`, px + 10, py - 8);
      ctx.font = '10px monospace'; ctx.fillStyle = 'rgba(148,163,184,0.8)';
      ctx.fillText(`|z| = ${r.toFixed(2)}`, px + 10, py + 6);

      t++; setAnimT(t);
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [re, im]);

  const mod = Math.sqrt(re * re + im * im);
  const arg = (Math.atan2(im, re) * 180 / Math.PI).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[{ label: 'Real (a)', val: re, set: setRe }, { label: 'Imaginary (b)', val: im, set: setIm }].map(({ label, val, set }) => (
          <div key={label}>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{label}</label>
            <input type="number" value={val} onChange={e => set(parseInt(e.target.value) || 0)}
              className="input-glow w-full px-3 py-2 text-sm font-mono" min={-9} max={9} />
          </div>
        ))}
      </div>
      <canvas ref={canvasRef} width={300} height={260} className="rounded-xl w-full"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }} />
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        {[
          { label: 'Modulus |z|', val: mod.toFixed(3), color: 'var(--accent-primary)' },
          { label: 'Argument θ', val: `${arg}°`, color: 'var(--accent-secondary)' },
          { label: 'Conjugate', val: `${re} - ${im}i`, color: 'var(--accent-tertiary)' },
        ].map(({ label, val, color }) => (
          <div key={label} className="p-2 rounded-lg" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
            <div className="font-mono font-bold" style={{ color }}>{val}</div>
            <div style={{ color: 'var(--text-faint)' }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'none' }}>{animT}</div>
    </div>
  );
};

// ─── Permutation: Animated Slot Machine ─────────────────────────────────
const PermutationSimulation: React.FC = () => {
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const [slots, setSlots] = useState<number[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [counts, setCounts] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = Array.from({ length: n }, (_, i) => i + 1);

  const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
  const nPr = n >= r ? factorial(n) / factorial(n - r) : 0;

  const spin = useCallback(() => {
    setSpinning(true);
    let count = 0;
    intervalRef.current = setInterval(() => {
      const pool = [...items];
      const arrangement: number[] = [];
      for (let i = 0; i < Math.min(r, n); i++) {
        const idx = Math.floor(Math.random() * pool.length);
        arrangement.push(pool.splice(idx, 1)[0]);
      }
      setSlots(arrangement);
      setCounts(arrangement);
      count++;
      if (count > 12) {
        clearInterval(intervalRef.current!);
        setSpinning(false);
      }
    }, 120);
  }, [n, r, items]);

  useEffect(() => {
    setSlots(Array.from({ length: Math.min(r, n) }, (_, i) => i + 1));
  }, [n, r]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  // Bar chart of nPr for r = 1 to n
  const barData = Array.from({ length: Math.min(n, 6) }, (_, i) => ({
    r: i + 1,
    val: n >= i + 1 ? factorial(n) / factorial(n - (i + 1)) : 0,
  }));
  const maxBar = Math.max(...barData.map(d => d.val), 1);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {[{ label: 'n (total items)', val: n, set: setN, max: 8 }, { label: 'r (choose)', val: r, set: setR, max: n }].map(({ label, val, set, max }) => (
          <div key={label}>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{label}</label>
            <input type="number" value={val} onChange={e => set(Math.min(max, Math.max(1, parseInt(e.target.value) || 1)))}
              className="input-glow w-full px-3 py-2 text-sm font-mono" min={1} max={max} />
          </div>
        ))}
      </div>

      {/* Slot display */}
      <div className="flex justify-center gap-2 flex-wrap">
        {slots.map((val, i) => (
          <div key={i} className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-all duration-150"
            style={{
              background: spinning ? 'var(--accent-primary)' : 'var(--glow-primary)',
              border: `2px solid var(--accent-primary)`,
              color: spinning ? '#fff' : 'var(--accent-primary)',
              transform: spinning ? 'scale(1.1)' : 'scale(1)',
            }}>
            {val}
          </div>
        ))}
      </div>

      {/* nPr growth bar chart */}
      <div className="rounded-xl p-3 space-y-2" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
        <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>P({n}, r) growth as r increases</div>
        {barData.map(({ r: ri, val }) => (
          <div key={ri} className="flex items-center gap-2">
            <span className="text-xs font-mono w-6 text-right" style={{ color: 'var(--text-faint)' }}>r={ri}</span>
            <div className="flex-1 h-5 rounded overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="h-full rounded transition-all duration-500 flex items-center px-2"
                style={{ width: `${(val / maxBar) * 100}%`, background: ri === r ? 'var(--accent-primary)' : 'var(--accent-secondary)', opacity: ri === r ? 1 : 0.5 }}>
                <span className="text-[10px] font-mono text-white font-bold">{val.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--glow-primary)', border: '1px solid var(--border-glow)' }}>
        <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>P({n}, {r}) = {nPr.toLocaleString()} arrangements</span>
        <button onClick={spin} disabled={spinning} className="btn-glow text-xs px-3 py-1.5 flex items-center gap-1">
          <Shuffle className="w-3 h-3" /> {spinning ? 'Spinning...' : 'Shuffle'}
        </button>
      </div>
      <div style={{ display: 'none' }}>{counts.join()}</div>
    </div>
  );
};

// ─── Combination: Pascal's Triangle ─────────────────────────────────────
const CombinationSimulation: React.FC = () => {
  const [n, setN] = useState(6);
  const [r, setR] = useState(2);
  const [highlightedR, setHighlightedR] = useState<number | null>(null);

  const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
  const nCr = (nn: number, rr: number) => nn >= rr && rr >= 0 ? factorial(nn) / (factorial(rr) * factorial(nn - rr)) : 0;

  const rows = Array.from({ length: Math.min(n + 1, 9) }, (_, row) =>
    Array.from({ length: row + 1 }, (__, col) => nCr(row, col))
  );

  const maxVal = Math.max(...rows.flat(), 1);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {[{ label: 'n (row)', val: n, set: setN, max: 8 }, { label: 'r (column)', val: r, set: setR, max: n }].map(({ label, val, set, max }) => (
          <div key={label}>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{label}</label>
            <input type="number" value={val} onChange={e => set(Math.min(max, Math.max(0, parseInt(e.target.value) || 0)))}
              className="input-glow w-full px-3 py-2 text-sm font-mono" min={0} max={max} />
          </div>
        ))}
      </div>

      {/* Pascal's Triangle */}
      <div className="overflow-x-auto rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
        <div className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>Pascal's Triangle (heat map)</div>
        <div className="space-y-1">
          {rows.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-1">
              {row.map((val, ci) => {
                const isTarget = ri === n && ci === r;
                const isHighR = ci === highlightedR;
                const intensity = val / maxVal;
                return (
                  <div key={ci}
                    className="transition-all duration-200 cursor-pointer text-center rounded"
                    style={{
                      width: 36, height: 28,
                      background: isTarget
                        ? 'var(--accent-primary)'
                        : isHighR
                          ? `rgba(59,130,246,${0.2 + intensity * 0.4})`
                          : `rgba(59,130,246,${0.05 + intensity * 0.2})`,
                      border: `1px solid ${isTarget ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                      color: isTarget ? '#fff' : 'var(--text-primary)',
                      fontSize: '10px', fontWeight: 'bold',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    onMouseEnter={() => setHighlightedR(ci)}
                    onMouseLeave={() => setHighlightedR(null)}>
                    {val}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-xl text-center" style={{ background: 'var(--glow-primary)', border: '1px solid var(--border-glow)' }}>
        <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
          C({n}, {r}) = <span style={{ color: 'var(--accent-primary)' }}>{nCr(n, r).toLocaleString()}</span> combinations
        </span>
      </div>
    </div>
  );
};

// ─── Limit: Real-time Function Grapher ───────────────────────────────────
const LimitSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [approach, setApproach] = useState(0);
  const [funcType, setFuncType] = useState<'sinc' | 'x2' | 'abs' | 'poly'>('sinc');
  const [animT, setAnimT] = useState(0);

  const funcs: Record<string, { fn: (x: number) => number; label: string; target: number }> = {
    sinc: { fn: x => x === 0 ? 1 : Math.sin(x) / x, label: 'sin(x)/x  →  1 as x→0', target: 1 },
    x2:   { fn: x => (x * x - 4) / (x - 2), label: '(x²-4)/(x-2)  →  4 as x→2', target: 4 },
    abs:  { fn: x => Math.abs(x) / (x || 0.0001), label: '|x|/x  — jump at x=0', target: NaN },
    poly: { fn: x => x * x * x - x, label: 'x³ - x', target: 0 },
  };

  const { fn, label, target } = funcs[funcType];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const scaleX = 40, scaleY = 40;
    let t = 0;

    const toCanvas = (x: number, y: number) => [cx + x * scaleX, cy - y * scaleY];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = 'rgba(100,116,139,0.1)'; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += scaleX) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += scaleY) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      // Axes
      ctx.strokeStyle = 'rgba(100,116,139,0.4)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();

      // Function curve
      ctx.beginPath();
      let first = true;
      for (let px = 0; px < W; px++) {
        const x = (px - cx) / scaleX;
        const y = fn(x);
        if (!isFinite(y) || Math.abs(y) > 10) { first = true; continue; }
        const [cx2, cy2] = toCanvas(x, y);
        if (first) { ctx.moveTo(cx2, cy2); first = false; }
        else ctx.lineTo(cx2, cy2);
      }
      ctx.strokeStyle = 'rgba(59,130,246,0.8)'; ctx.lineWidth = 2.5; ctx.stroke();

      // Animated approach indicator
      const speed = 0.04;
      const approachX = approach + 1.5 * Math.exp(-t * speed) * Math.sin(t * speed * 3);
      const approachY = fn(approachX);
      if (isFinite(approachY) && Math.abs(approachY) < 10) {
        const [apx, apy] = toCanvas(approachX, approachY);
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.15);
        ctx.beginPath(); ctx.arc(apx, apy, 8 + pulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,158,11,${0.2 + pulse * 0.3})`; ctx.fill();
        ctx.beginPath(); ctx.arc(apx, apy, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b'; ctx.fill();

        // Vertical dashed line to axis
        ctx.beginPath(); ctx.setLineDash([3, 3]);
        ctx.moveTo(apx, apy); ctx.lineTo(apx, cy);
        ctx.strokeStyle = 'rgba(245,158,11,0.4)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.setLineDash([]);
      }

      t++;
      setAnimT(t);
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [fn, approach]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(funcs).map(([key]) => (
          <button key={key} onClick={() => { setFuncType(key as any); setApproach(0); }}
            className="text-xs px-2 py-2 rounded-lg font-mono cursor-pointer transition-all"
            style={{
              background: funcType === key ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: funcType === key ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${funcType === key ? 'var(--accent-primary)' : 'var(--border-default)'}`,
            }}>
            {key === 'sinc' ? 'sin(x)/x' : key === 'x2' ? '(x²-4)/(x-2)' : key === 'abs' ? '|x|/x' : 'x³-x'}
          </button>
        ))}
      </div>

      <canvas ref={canvasRef} width={300} height={220} className="rounded-xl w-full"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }} />

      <div className="p-3 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
        <div className="text-xs font-mono font-bold" style={{ color: 'var(--accent-primary)' }}>{label}</div>
        <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          {isNaN(target) ? '⚠ Limit does not exist (left ≠ right)' : `lim = ${target}`}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
          Approach point: x = {approach}
        </label>
        <input type="range" min={-4} max={4} step={0.5} value={approach}
          onChange={e => setApproach(parseFloat(e.target.value))}
          className="w-full" style={{ accentColor: 'var(--accent-primary)' }} />
      </div>
      <div style={{ display: 'none' }}>{animT}</div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN SIMULATIONS PAGE
// ═══════════════════════════════════════════════════════════════
const simulations = [
  {
    id: 'gcd', title: 'GCD — Euclidean Algorithm', subtitle: 'Watch the division-reduction in real time',
    icon: Binary, color: 'var(--accent-primary)', component: GCDSimulation,
    concept: 'The GCD of two numbers is found by repeatedly replacing the larger with the remainder. Each bar shrinks toward zero.',
  },
  {
    id: 'congruence', title: 'Modular Arithmetic Clock', subtitle: 'Numbers wrap around like a clock face',
    icon: CircleDot, color: 'var(--accent-secondary)', component: CongruenceSimulation,
    concept: 'a ≡ r (mod m) means a lands on position r when you walk around a clock of m hours.',
  },
  {
    id: 'complex', title: 'Complex Number Plane', subtitle: 'Visualise z = a + bi as a 2D vector',
    icon: Compass, color: 'var(--accent-tertiary)', component: ComplexSimulation,
    concept: 'Every complex number is a point (a, b) in the Argand plane. Drag to see modulus, argument, and conjugate.',
  },
  {
    id: 'permutation', title: 'Permutation Shuffler', subtitle: 'See ordered arrangements grow exponentially',
    icon: Shuffle, color: 'var(--accent-emerald)', component: PermutationSimulation,
    concept: 'P(n,r) = n!/(n-r)! counts ordered selections. The bar chart shows how rapidly it explodes.',
  },
  {
    id: 'combination', title: "Pascal's Triangle & nCr", subtitle: 'Heat map of binomial coefficients',
    icon: Layers, color: 'var(--accent-cyan)', component: CombinationSimulation,
    concept: 'Every entry in Pascal\'s Triangle is a combination C(n,r). The highlighted cell shows your chosen value.',
  },
  {
    id: 'limit', title: 'Limit — Live Function Graph', subtitle: 'Watch a point approach a limit',
    icon: Activity, color: 'var(--accent-amber)', component: LimitSimulation,
    concept: 'The animated orange dot approaches the target point. Discontinuous functions reveal where limits fail.',
  },
];

interface SimulationsPageProps {
  initialModule?: string;
}

export const SimulationsPage: React.FC<SimulationsPageProps> = ({ initialModule }) => {
  const [active, setActive] = useState(initialModule || simulations[0].id);
  const sim = simulations.find(s => s.id === active) || simulations[0];
  const IconComponent = sim.icon;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent-primary)' }}>
            Live Simulations
          </span>
        </div>
        <h1 className="section-heading text-3xl sm:text-4xl mb-2">
          Real-Time <span className="gradient-text-static">Visual Mathematics</span>
        </h1>
        <p className="text-sm max-w-xl" style={{ color: 'var(--text-muted)' }}>
          Interactive, animated simulations for every concept. Adjust parameters and watch the math come alive.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Sidebar: Module Selector */}
        <div className="lg:col-span-3 space-y-2 animate-fade-up delay-100">
          {simulations.map(s => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <button key={s.id} onClick={() => setActive(s.id)}
                className="w-full text-left p-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-3"
                style={{
                  background: isActive ? 'var(--glow-primary)' : 'var(--bg-card)',
                  border: `1px solid ${isActive ? 'var(--border-glow)' : 'var(--border-card)'}`,
                  boxShadow: isActive ? '0 2px 8px var(--glow-primary)' : 'none',
                }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: isActive ? 'var(--accent-primary)' : 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
                  <Icon className="w-4 h-4" style={{ color: isActive ? '#fff' : 'var(--text-muted)' }} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                    {s.title.split('—')[0].split('–')[0].trim()}
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--text-faint)' }}>
                    {s.subtitle.substring(0, 28)}…
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Simulation Panel */}
        <div className="lg:col-span-9 animate-fade-up delay-200">
          <div className="glass-card overflow-hidden">

            {/* Panel header */}
            <div className="px-6 py-4 flex items-center gap-4"
              style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--bg-secondary)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--accent-primary)', boxShadow: '0 2px 8px var(--glow-primary)' }}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}>
                  {sim.title}
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{sim.subtitle}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
            </div>

            {/* Simulation body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left: Simulation */}
                <div>
                  <sim.component />
                </div>

                {/* Right: Concept explanation + properties */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
                    <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-primary)' }}>
                      Core Concept
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {sim.concept}
                    </p>
                  </div>

                  {/* Quick properties */}
                  {sim.id === 'gcd' && <QuickFacts facts={[
                    ['Algorithm', 'Euclidean Division'],
                    ['Time Complexity', 'O(log min(a,b))'],
                    ['Base Case', 'gcd(a, 0) = a'],
                    ['Recurrence', 'gcd(a,b) = gcd(b, a mod b)'],
                  ]} />}
                  {sim.id === 'congruence' && <QuickFacts facts={[
                    ['Notation', 'a ≡ b (mod m)'],
                    ['Meaning', 'a − b divisible by m'],
                    ['Symmetry', 'a ≡ b ↔ b ≡ a'],
                    ['Application', 'Cryptography, hashing'],
                  ]} />}
                  {sim.id === 'complex' && <QuickFacts facts={[
                    ['Form', 'z = a + bi'],
                    ['Modulus', '|z| = √(a² + b²)'],
                    ['Argument', 'θ = atan2(b, a)'],
                    ['Conjugate', 'z̄ = a − bi'],
                  ]} />}
                  {sim.id === 'permutation' && <QuickFacts facts={[
                    ['Formula', 'P(n,r) = n! / (n−r)!'],
                    ['Order', 'Matters (AB ≠ BA)'],
                    ['P(n,n)', 'n! (all items)'],
                    ['Application', 'Passwords, rankings'],
                  ]} />}
                  {sim.id === 'combination' && <QuickFacts facts={[
                    ['Formula', 'C(n,r) = n! / r!(n−r)!'],
                    ['Order', 'Does NOT matter'],
                    ['Symmetry', 'C(n,r) = C(n,n−r)'],
                    ['Application', 'Lottery, teams'],
                  ]} />}
                  {sim.id === 'limit' && <QuickFacts facts={[
                    ['Notation', 'lim(x→a) f(x) = L'],
                    ['Existence', 'Left = Right limit'],
                    ['Continuity', 'f(a) = lim f(x)'],
                    ['L\'Hôpital', '0/0 or ∞/∞ forms'],
                  ]} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Quick Facts Table ────────────────────────────────────────────────────
const QuickFacts: React.FC<{ facts: [string, string][] }> = ({ facts }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-default)' }}>
    <div className="text-xs font-bold uppercase tracking-wider px-4 py-2.5"
      style={{ background: 'var(--bg-secondary)', color: 'var(--text-faint)', borderBottom: '1px solid var(--border-default)' }}>
      Quick Reference
    </div>
    {facts.map(([key, val], i) => (
      <div key={i} className="flex items-center px-4 py-2.5 text-xs"
        style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-secondary)', borderBottom: i < facts.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
        <span className="w-1/2 font-semibold" style={{ color: 'var(--text-muted)' }}>{key}</span>
        <span className="w-1/2 font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{val}</span>
      </div>
    ))}
  </div>
);

export default SimulationsPage;
