import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Generate random floating particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    symbol: ['+', '-', '×', '÷', '∫', '∑', 'π', '∞', '∆', '√'][Math.floor(Math.random() * 10)],
  }));
};

export const ParticlesBackground: React.FC = () => {
  const [particles] = useState(generateParticles(25));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, -250]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Noise Texture */}
      <div className="noise-bg" />

      {/* Subtle Grid */}
      <div className="bg-grid" />

      {/* Primary Glow Orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full mix-blend-screen opacity-40"
        style={{
          background: 'radial-gradient(circle, var(--glow-primary) 0%, transparent 70%)',
        }}
        animate={{
          x: mousePos.x - 400,
          y: mousePos.y - 400,
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{ x: { type: 'spring', damping: 40, stiffness: 100 }, y: { type: 'spring', damping: 40, stiffness: 100 }, scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      />
      
      {/* Secondary Glow Orb */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full mix-blend-screen opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--glow-secondary) 0%, transparent 70%)',
          top: '10%',
          right: '-20%',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.15, 0.35, 0.15],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Mathematical Symbols */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute font-mono text-xl font-bold opacity-10"
          style={{
            color: p.id % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)',
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            fontSize: `${p.size * 1.5}rem`,
            y: yParallax
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 0.8, 1.2, 1],
            x: [`0vw`, `${(Math.random() - 0.5) * 20}vw`, `0vw`],
            y: [`0vh`, `${(Math.random() - 0.5) * 20}vh`, `0vh`],
            rotate: [0, Math.random() * 720, Math.random() * -720, 0],
            filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)']
          }}
          transition={{
            opacity: { duration: p.duration / 3, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: p.duration * 1.2, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: p.duration * 1.5, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: p.duration * 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: p.duration / 2, repeat: Infinity, ease: 'easeInOut' },
            filter: { duration: p.duration, repeat: Infinity, ease: 'linear' }
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};
