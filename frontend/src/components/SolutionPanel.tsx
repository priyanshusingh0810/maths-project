import React from 'react';
import { MathFormula } from './MathFormula';
import { BookOpen, Sigma, ArrowRightLeft, Calculator, Trophy, Lightbulb } from 'lucide-react';

interface SolutionPanelProps {
  given: React.ReactNode;
  formula: string;
  substitution?: string;
  calculationSteps: string[];
  finalAnswer: string | React.ReactNode;
  explanation: string;
}

interface StepProps {
  number: number;
  label: string;
  icon: React.ReactNode;
  colorVar: string;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ number, label, icon, colorVar, children }) => (
  <div className="relative flex gap-4">
    {/* Step Number Circle */}
    <div className="flex flex-col items-center shrink-0">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 z-10"
        style={{
          background: `color-mix(in srgb, var(--${colorVar}) 20%, transparent)`,
          border: `2px solid color-mix(in srgb, var(--${colorVar}) 40%, transparent)`,
          color: `var(--${colorVar})`,
        }}
      >
        {number}
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 pb-8">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: `var(--${colorVar})` }}>{icon}</span>
        <h4
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: `var(--${colorVar})` }}
        >
          {label}
        </h4>
      </div>
      <div>{children}</div>
    </div>
  </div>
);

export const SolutionPanel: React.FC<SolutionPanelProps> = ({
  given,
  formula,
  substitution,
  calculationSteps,
  finalAnswer,
  explanation,
}) => {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[var(--border-default)]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--glow-primary)] border border-[var(--border-glow)]"
        >
          <BookOpen className="w-5 h-5 text-[var(--accent-primary)]" />
        </div>
        <h3 className="text-lg font-extrabold text-[var(--text-primary)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Step-by-Step Educational Solution
        </h3>
      </div>

      {/* Steps */}
      <div className="space-y-0">

        {/* Step 1: Given */}
        <Step
          number={1}
          label="Given Values"
          icon={<Sigma className="w-4 h-4" />}
          colorVar="accent-secondary"
        >
          <div
            className="px-4 py-3 rounded-xl font-mono text-sm inline-block"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            {given}
          </div>
        </Step>

        {/* Step 2: Formula */}
        <Step
          number={2}
          label="Mathematical Formula"
          icon={<Calculator className="w-4 h-4" />}
          colorVar="accent-primary"
        >
          <div className="math-display-block inline-block">
            <MathFormula formula={formula} block />
          </div>
        </Step>

        {/* Step 3: Substitution (optional) */}
        {substitution && (
          <Step
            number={3}
            label="Substitution"
            icon={<ArrowRightLeft className="w-4 h-4" />}
            colorVar="accent-tertiary"
          >
            <div className="math-display-block inline-block">
              <MathFormula formula={substitution} block />
            </div>
          </Step>
        )}

        {/* Step 4: Calculation Steps */}
        <Step
          number={substitution ? 4 : 3}
          label="Calculation Steps"
          icon={<Calculator className="w-4 h-4" />}
          colorVar="accent-cyan"
        >
          <ul className="space-y-2">
            {calculationSteps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'color-mix(in srgb, var(--accent-cyan) 5%, transparent)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'color-mix(in srgb, var(--accent-cyan) 20%, transparent)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-lg shrink-0 font-mono text-xs font-bold mt-0.5"
                  style={{
                    width: '22px',
                    height: '22px',
                    background: 'color-mix(in srgb, var(--accent-cyan) 15%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--accent-cyan) 30%, transparent)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </Step>

        {/* Final Answer */}
        <Step
          number={substitution ? 5 : 4}
          label="Final Answer"
          icon={<Trophy className="w-4 h-4" />}
          colorVar="accent-emerald"
        >
          <div className="result-highlight p-5 rounded-2xl flex items-center gap-4" style={{ background: 'color-mix(in srgb, var(--accent-emerald) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-emerald) 20%, transparent)' }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'color-mix(in srgb, var(--accent-emerald) 20%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent-emerald) 40%, transparent)',
              }}
            >
              <Trophy className="w-5 h-5" style={{ color: 'var(--accent-emerald)' }} />
            </div>
            <div
              className="text-2xl font-black"
              style={{
                color: 'var(--accent-emerald)',
                fontFamily: "'Outfit', sans-serif",
                textShadow: '0 0 20px color-mix(in srgb, var(--accent-emerald) 40%, transparent)',
              }}
            >
              {finalAnswer}
            </div>
          </div>
        </Step>

        {/* Explanation */}
        <Step
          number={substitution ? 6 : 5}
          label="Mathematical Reasoning"
          icon={<Lightbulb className="w-4 h-4" />}
          colorVar="accent-amber"
        >
          <div
            className="p-4 rounded-xl text-sm leading-relaxed flex gap-3"
            style={{
              background: 'color-mix(in srgb, var(--accent-amber) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--accent-amber) 20%, transparent)',
              color: 'var(--text-secondary)',
            }}
          >
            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--accent-amber)' }} />
            <p>{explanation}</p>
          </div>
        </Step>

      </div>
    </div>
  );
};

