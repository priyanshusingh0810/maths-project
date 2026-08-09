import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  block?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({ formula, block = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(formula, containerRef.current, {
          displayMode: block,
          throwOnError: false,
          output: 'html',
          trust: false,
        });
      } catch (err) {
        containerRef.current.textContent = formula;
      }
    }
  }, [formula, block]);

  return (
    <span
      ref={containerRef}
      className={`${className} inline-block select-all`}
      style={{ color: '#e2e8f0' }}
    />
  );
};
