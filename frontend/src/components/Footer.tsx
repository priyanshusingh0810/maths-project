import React from 'react';
import { Sigma, ExternalLink, BookOpen, Layers } from 'lucide-react';

interface FooterProps {
  setActivePage?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const navigate = (page: string) => {
    if (setActivePage) setActivePage(page);
  };

  const links = [
    { label: 'Home', page: 'home' },
    { label: 'Modules', page: 'dashboard' },
    { label: 'Concepts', page: 'concepts' },
    { label: 'Help', page: 'help' },
  ];

  return (
    <footer
      className="relative z-10 mt-auto"
      style={{
        background: 'rgba(8, 12, 24, 0.95)',
        borderTop: '1px solid rgba(108,99,255,0.12)',
      }}
    >
      {/* Top gradient line */}
      <div className="gradient-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 group cursor-pointer"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #6C63FF, #A855F7)',
                  boxShadow: '0 4px 15px rgba(108,99,255,0.3)',
                }}
              >
                <Sigma className="w-5 h-5 text-white" />
              </div>
              <span
                className="font-extrabold text-lg tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #a5b4fc)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Math in Action
              </span>
            </button>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(100,116,139,0.9)' }}
            >
              An interactive mathematics explorer for T.Y.B.Sc. Data Science students, covering Unit I & II of Basics of Mathematics in Real Life-IV.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(108,99,255,0.8)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.page}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-sm font-medium transition-all cursor-pointer"
                    style={{
                      color: 'rgba(100,116,139,0.9)',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = '#a5b4fc';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(100,116,139,0.9)';
                    }}
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Info */}
          <div className="space-y-4">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(108,99,255,0.8)' }}
            >
              Academic Info
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 shrink-0" style={{ color: '#6C63FF' }} />
                <span className="text-xs" style={{ color: 'rgba(100,116,139,0.9)' }}>
                  Basics of Mathematics in Real Life-IV
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 shrink-0" style={{ color: '#A855F7' }} />
                <span className="text-xs" style={{ color: 'rgba(100,116,139,0.9)' }}>
                  T.Y.B.Sc. Data Science | Sem-V | 2026–2027
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 shrink-0" style={{ color: '#10B981' }} />
                <a
                  href="https://github.com/priyanshusingh0810/maths-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors"
                  style={{ color: 'rgba(100,116,139,0.9)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#6ee7b7'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(100,116,139,0.9)'; }}
                >
                  priyanshusingh0810/maths-project
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            color: 'rgba(71,85,105,0.8)',
          }}
        >
          <span>
            © {new Date().getFullYear()} T.Y.B.Sc. Data Science — Internal Assessment Project
          </span>
          <span>
            Smt. Chandibai Himathmal Mansukhani College (Autonomous), Ulhasnagar
          </span>
        </div>
      </div>
    </footer>
  );
};
