import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in group select-none">
      <div className={`${sizeClasses[size]} relative mb-4 transition-transform duration-500 group-hover:scale-105`}>
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" /> {/* blue-400 */}
              <stop offset="50%" stopColor="#A78BFA" /> {/* purple-400 */}
              <stop offset="100%" stopColor="#FACC15" /> {/* yellow-400 */}
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Structural Hexagon */}
          <path 
            d="M100 15 L173.6 57.5 L173.6 142.5 L100 185 L26.4 142.5 L26.4 57.5 Z" 
            fill="none" 
            stroke="url(#logoGradient)" 
            strokeWidth="1.5"
            strokeOpacity="0.3"
            strokeDasharray="10 5"
          >
             <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="60s" repeatCount="indefinite" />
          </path>

          {/* Central Neural Connection / Pathway */}
          <path
            d="M100 45 L100 90 L140 115 L140 155"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className="animate-pulse"
          />
          
          <path
            d="M60 155 L60 115 L100 90"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.6"
          />

          {/* Nodes (Decision Points) */}
          {/* Central Logic Core */}
          <circle cx="100" cy="90" r="14" fill="#0f172a" stroke="#A78BFA" strokeWidth="3" />
          <circle cx="100" cy="90" r="6" fill="#A78BFA" />

          {/* Goal Node (Gold) */}
          <circle cx="140" cy="155" r="10" fill="#FACC15" filter="url(#glow)" />
          
          {/* Start Node (Blue) */}
          <circle cx="60" cy="155" r="8" fill="#60A5FA" /> 
          
          {/* Top Input Node */}
          <circle cx="100" cy="45" r="8" fill="#A78BFA" />

        </svg>
      </div>
      <h1 className={`font-tech bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-400 font-bold tracking-wider text-center ${size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-2xl' : 'text-xl'}`}>
        AI-LIFE DECISION
      </h1>
      <span className="text-slate-400 tracking-[0.3em] text-xs mt-1">SIMULATOR</span>
    </div>
  );
};

export default Logo;