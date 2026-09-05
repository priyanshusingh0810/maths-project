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
  color: string;
  borderColor: string;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ number, label, icon, color, borderColor, children }) => (
  <div className="relative flex gap-4">
    {/* Step Number Circle */}
    <div className="flex flex-col items-center shrink-0">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 z-10"
        style={{
          background: `${color}20`,
          border: `2px solid ${borderColor}`,
          color: color,
        }}
      >
        {number}
      </div>
      {/* connector line — purely decorative, last step won't have one but it's hidden naturally */}
    </div>

    {/* Content */}
    <div className="flex-1 pb-8">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }}>{icon}</span>
        <h4
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color }}
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
      <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid rgba(108,99,255,0.15)' }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)' }}
        >
          <BookOpen className="w-5 h-5" style={{ color: '#a5b4fc' }} />
        </div>
        <h3
          className="text-lg font-extrabold"
          style={{ color: 'rgba(241,245,249,0.95)', fontFamily: "'Outfit', sans-serif" }}
        >
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
          color="#94a3b8"
          borderColor="rgba(148,163,184,0.4)"
        >
          <div
            className="px-4 py-3 rounded-xl font-mono text-sm inline-block"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(226,232,240,0.9)',
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
          color="#a5b4fc"
          borderColor="rgba(108,99,255,0.5)"
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
            color="#c4b5fd"
            borderColor="rgba(167,139,250,0.4)"
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
          color="#67e8f9"
          borderColor="rgba(6,182,212,0.4)"
        >
          <ul className="space-y-2">
            {calculationSteps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  color: 'rgba(203,213,225,0.9)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.04)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)';
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-lg shrink-0 font-mono text-xs font-bold mt-0.5"
                  style={{
                    width: '22px',
                    height: '22px',
                    background: 'rgba(6,182,212,0.15)',
                    border: '1px solid rgba(6,182,212,0.3)',
                    color: '#67e8f9',
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
          color="#34d399"
          borderColor="rgba(16,185,129,0.5)"
        >
          <div className="result-highlight p-5 rounded-2xl flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(16,185,129,0.2)',
                border: '1px solid rgba(16,185,129,0.4)',
              }}
            >
              <Trophy className="w-5 h-5" style={{ color: '#34d399' }} />
            </div>
            <div
              className="text-2xl font-black"
              style={{
                color: '#34d399',
                fontFamily: "'Outfit', sans-serif",
                textShadow: '0 0 20px rgba(16,185,129,0.4)',
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
          color="#c084fc"
          borderColor="rgba(168,85,247,0.4)"
        >
          <div
            className="p-4 rounded-xl text-sm leading-relaxed flex gap-3"
            style={{
              background: 'rgba(168,85,247,0.05)',
              border: '1px solid rgba(168,85,247,0.15)',
              color: 'rgba(203,213,225,0.9)',
            }}
          >
            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#c084fc' }} />
            <p>{explanation}</p>
          </div>
        </Step>

      </div>
    </div>
  );
};
