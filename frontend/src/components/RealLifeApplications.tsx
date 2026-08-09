import React from 'react';
import { Lightbulb, Cpu, Shield, Globe, TrendingUp, Zap } from 'lucide-react';

interface ApplicationItem {
  title: string;
  description: string;
}

interface RealLifeApplicationsProps {
  applications: ApplicationItem[];
}

const iconColors = [
  { icon: Cpu, color: '#6C63FF', glow: 'rgba(108,99,255,0.3)' },
  { icon: Shield, color: '#A855F7', glow: 'rgba(168,85,247,0.3)' },
  { icon: Globe, color: '#10B981', glow: 'rgba(16,185,129,0.3)' },
  { icon: TrendingUp, color: '#06B6D4', glow: 'rgba(6,182,212,0.3)' },
  { icon: Zap, color: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
  { icon: Lightbulb, color: '#EC4899', glow: 'rgba(236,72,153,0.3)' },
];

export const RealLifeApplications: React.FC<RealLifeApplicationsProps> = ({ applications }) => {
  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid rgba(108,99,255,0.15)' }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}
        >
          <Lightbulb className="w-4 h-4" style={{ color: '#fcd34d' }} />
        </div>
        <h3
          className="text-lg font-extrabold"
          style={{ color: 'rgba(241,245,249,0.95)', fontFamily: "'Outfit', sans-serif" }}
        >
          Real-Life Applications
        </h3>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {applications.map((app, index) => {
          const { icon: IconComponent, color, glow } = iconColors[index % iconColors.length];
          return (
            <div
              key={index}
              className="p-5 rounded-2xl transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${color}08`;
                el.style.borderColor = `${color}30`;
                el.style.transform = 'translateY(-3px)';
                el.style.boxShadow = `0 12px 30px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(255,255,255,0.02)';
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}35`,
                  boxShadow: `0 4px 12px ${glow}`,
                }}
              >
                <IconComponent className="w-5 h-5" style={{ color }} />
              </div>
              <h4
                className="font-bold text-sm mb-2"
                style={{ color: 'rgba(226,232,240,0.95)', fontFamily: "'Outfit', sans-serif" }}
              >
                {app.title}
              </h4>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'rgba(100,116,139,0.9)' }}
              >
                {app.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
