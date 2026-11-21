import React from 'react';

interface BotanicalDividerProps {
  tone?: 'gold' | 'olive' | 'ivory';
  className?: string;
}

export const BotanicalDivider: React.FC<BotanicalDividerProps> = ({
  tone = 'gold',
  className = '',
}) => {
  const strokeColor =
    tone === 'ivory' ? '#EBE3DB' : tone === 'olive' ? '#A48374' : '#CBAD8D';

  return (
    <div className={`flex items-center justify-center gap-4 w-full max-w-md mx-auto ${className}`} aria-hidden="true">
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${strokeColor}66)`,
        }}
      />
      <svg width="46" height="22" viewBox="0 0 46 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 11C11 11 16 11 23 11C30 11 35 11 42 11"
          stroke={strokeColor}
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M18 11C15 7 11 6 9 8C11 10 15 11 18 11Z"
          stroke={strokeColor}
          strokeWidth="1.1"
          fill={strokeColor}
          fillOpacity="0.14"
        />
        <path
          d="M28 11C31 7 35 6 37 8C35 10 31 11 28 11Z"
          stroke={strokeColor}
          strokeWidth="1.1"
          fill={strokeColor}
          fillOpacity="0.14"
        />
        <path
          d="M23 6L26 11L23 16L20 11Z"
          stroke={strokeColor}
          strokeWidth="1.1"
          fill={strokeColor}
          fillOpacity="0.22"
        />
      </svg>
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(90deg, ${strokeColor}66, transparent)`,
        }}
      />
    </div>
  );
};
