import React from 'react';
import { MathFormula } from './MathFormula';
import { HelpCircle, FileText, Award } from 'lucide-react';

interface SolutionPanelProps {
  given: React.ReactNode;
  formula: string;
  substitution?: string;
  calculationSteps: string[];
  finalAnswer: string | React.ReactNode;
  explanation: string;
}

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
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b pb-2 border-slate-200 dark:border-slate-800">
        <FileText className="w-5 h-5 text-indigo-500" />
        Step-by-Step Educational Solution
      </h3>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 ml-3 space-y-6">
        
        {/* Step 1: Given */}
        <div className="relative">
          <div className="absolute -left-[31px] top-0.5 bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 rounded-full w-6 h-6 flex items-center justify-center">
            1
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm tracking-wider uppercase">
              Given Values
            </h4>
            <div className="mt-1 bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-mono text-sm inline-block">
              {given}
            </div>
          </div>
        </div>

        {/* Step 2: Formula */}
        <div className="relative">
          <div className="absolute -left-[31px] top-0.5 bg-indigo-50 dark:bg-indigo-950/50 border-2 border-indigo-500 text-xs font-bold text-indigo-600 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center">
            2
          </div>
          <div>
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm tracking-wider uppercase">
              Mathematical Formula
            </h4>
            <div className="mt-1 bg-indigo-50/50 dark:bg-indigo-950/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-950 text-indigo-900 dark:text-indigo-200 inline-block font-medium">
              <MathFormula formula={formula} block />
            </div>
          </div>
        </div>

        {/* Step 3: Substitution */}
        {substitution && (
          <div className="relative">
            <div className="absolute -left-[31px] top-0.5 bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 rounded-full w-6 h-6 flex items-center justify-center">
              3
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm tracking-wider uppercase">
                Substitution
              </h4>
              <div className="mt-1 bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 inline-block">
                <MathFormula formula={substitution} block />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Step by Step Calculations */}
        <div className="relative">
          <div className="absolute -left-[31px] top-0.5 bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 rounded-full w-6 h-6 flex items-center justify-center">
            {substitution ? '4' : '3'}
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm tracking-wider uppercase">
              Calculation Steps
            </h4>
            <ul className="mt-2 space-y-2">
              {calculationSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/20 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800/40 text-slate-600 dark:text-slate-300 text-sm">
                  <span className="inline-flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono rounded w-5 h-5 text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step 5: Final Result */}
        <div className="relative">
          <div className="absolute -left-[31px] top-0.5 bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-500 text-xs font-bold text-emerald-600 dark:text-emerald-400 rounded-full w-6 h-6 flex items-center justify-center">
            {substitution ? '5' : '4'}
          </div>
          <div>
            <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm tracking-wider uppercase">
              Final Answer
            </h4>
            <div className="mt-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                  {finalAnswer}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 6: Educational Explanation */}
        <div className="relative">
          <div className="absolute -left-[31px] top-0.5 bg-violet-50 dark:bg-violet-950/50 border-2 border-violet-500 text-xs font-bold text-violet-600 dark:text-violet-400 rounded-full w-6 h-6 flex items-center justify-center">
            {substitution ? '6' : '5'}
          </div>
          <div>
            <h4 className="font-semibold text-violet-600 dark:text-violet-400 text-sm tracking-wider uppercase">
              Mathematical Reasoning
            </h4>
            <div className="mt-2 bg-violet-50/30 dark:bg-violet-950/10 p-4 rounded-xl border border-violet-100 dark:border-violet-950/50 text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex gap-3">
              <HelpCircle className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
              <p>{explanation}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
