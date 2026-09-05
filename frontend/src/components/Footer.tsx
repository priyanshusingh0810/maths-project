import React from 'react';
import { Sigma } from 'lucide-react';

interface FooterProps {
  setActivePage?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const navigate = (page: string) => {
    if (setActivePage) setActivePage(page);
  };

  const links = [
    { label: 'Home', page: 'home' },
    { label: 'All Modules', page: 'dashboard' },
    { label: 'Concepts', page: 'concepts' },
    { label: 'Help', page: 'help' },
  ];

  const modules = [
    { label: 'GCD Calculator', page: 'gcd' },
    { label: 'Congruence', page: 'congruence' },
    { label: 'Complex Numbers', page: 'complex' },
    { label: 'Permutation', page: 'permutation' },
    { label: 'Combination', page: 'combination' },
    { label: 'Limits', page: 'limit' },
  ];

  return (
    <footer
      className="relative z-10 mt-auto"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-default)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 group cursor-pointer"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--accent-primary)',
                  boxShadow: '0 2px 8px var(--glow-primary)',
                }}
              >
                <Sigma className="w-4 h-4 text-white" />
              </div>
              <span
                className="font-bold text-base"
                style={{ color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}
              >
                Math in Action
              </span>
            </button>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              An interactive mathematics explorer for T.Y.B.Sc. Data Science students at Smt. CHM College, covering Unit I & II of Basics of Mathematics in Real Life-IV.
            </p>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
              Internal Assessment Project · Academic Year 2025–26
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-faint)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.page}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-sm cursor-pointer"
                    style={{
                      background: 'none', border: 'none', padding: 0,
                      color: 'var(--text-muted)',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Modules */}
          <div className="space-y-4">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-faint)' }}
            >
              Calculators
            </h4>
            <ul className="space-y-2">
              {modules.map(mod => (
                <li key={mod.page}>
                  <button
                    onClick={() => navigate(mod.page)}
                    className="text-sm cursor-pointer"
                    style={{
                      background: 'none', border: 'none', padding: 0,
                      color: 'var(--text-muted)',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                  >
                    {mod.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
            © 2025 Math in Action — Smt. CHM College (Autonomous), Ulhasnagar
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded"
              style={{
                background: 'var(--glow-primary)',
                border: '1px solid var(--border-glow)',
                color: 'var(--accent-primary)',
              }}
            >
              T.Y.B.Sc. Data Science
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
