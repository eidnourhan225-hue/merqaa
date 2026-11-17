import React, { useId } from 'react';

interface MerqabLogoProps {
  className?: string;
  variant?: 'color' | 'monochrome';
}

export const MerqabLogo: React.FC<MerqabLogoProps> = ({
  className = 'w-12 h-12',
  variant = 'color',
}) => {
  const isMono = variant === 'monochrome';
  const rawId = useId().replace(/:/g, '');
  const bgId = `merqab-bg-${rawId}`;
  const goldId = `merqab-gold-${rawId}`;
  const beamLeftId = `merqab-beam-l-${rawId}`;
  const beamRightId = `merqab-beam-r-${rawId}`;
  const clipId = `merqab-clip-${rawId}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={bgId} x1="6" y1="4" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="55%" stopColor="#5C0B0B" />
          <stop offset="100%" stopColor="#1C0707" />
        </linearGradient>

        <linearGradient id={goldId} x1="16" y1="6" x2="48" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <linearGradient id={beamLeftId} x1="28" y1="22" x2="7" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isMono ? '#FAFAF9' : '#FDE68A'} stopOpacity="0.45" />
          <stop offset="100%" stopColor={isMono ? '#FAFAF9' : '#FDE68A'} stopOpacity="0" />
        </linearGradient>

        <linearGradient id={beamRightId} x1="36" y1="22" x2="57" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isMono ? '#FAFAF9' : '#FDE68A'} stopOpacity="0.45" />
          <stop offset="100%" stopColor={isMono ? '#FAFAF9' : '#FDE68A'} stopOpacity="0" />
        </linearGradient>

        <clipPath id={clipId}>
          <rect x="4" y="4" width="56" height="56" rx="12.5" />
        </clipPath>
      </defs>

      {/* Outer Press Crest Shield */}
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="14"
        fill={isMono ? '#1C1917' : `url(#${bgId})`}
        stroke={isMono ? '#57534E' : `url(#${goldId})`}
        strokeWidth="2.4"
      />

      <g clipPath={`url(#${clipId})`}>
        {/* Sweeping Watchtower Beacon Light Beams (أشعة المِرقاب الكاشفة للحقيقة) */}
        <polygon points="30,22.5 5,11 5,32" fill={`url(#${beamLeftId})`} />
        <polygon points="34,22.5 59,11 59,32" fill={`url(#${beamRightId})`} />

        {/* Precision Observatory Sight Ring & Cardinal Crosshairs (عدسة المرصد والمنظار) */}
        <circle
          cx="32"
          cy="26"
          r="20.5"
          stroke={isMono ? '#78716C' : '#FCD34D'}
          strokeOpacity="0.35"
          strokeWidth="1.2"
          strokeDasharray="2.5 3.5"
        />
        <path
          d="M32 5.5V8.5M11.5 26H14.5M49.5 26H52.5"
          stroke={isMono ? '#A8A29E' : '#FDE68A'}
          strokeOpacity="0.7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Monumental Watchtower & Journalism Fountain Pen Pillar (برج المرقاب وقلم الصحافة) */}
        <path
          d="M32 7.5L35.2 13.5H28.8L32 7.5Z"
          fill={isMono ? '#FAFAF9' : `url(#${goldId})`}
        />

        {/* Tower Base / Obelisk Pen Nib */}
        <path
          d="M25.5 30.5H38.5L42.5 50.5H21.5L25.5 30.5Z"
          fill={isMono ? '#E7E5E4' : `url(#${goldId})`}
          stroke={isMono ? '#1C1917' : '#450A0A'}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Pen Nib Slit & Anchor Inkwell Point inside Tower */}
        <line
          x1="32"
          y1="31"
          x2="32"
          y2="42"
          stroke={isMono ? '#1C1917' : '#5C0B0B'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle
          cx="32"
          cy="43.5"
          r="2.1"
          fill={isMono ? '#1C1917' : '#5C0B0B'}
        />

        {/* Watchtower Observation Balcony Bar */}
        <rect
          x="21.5"
          y="28.5"
          width="21"
          height="3.6"
          rx="1.8"
          fill={isMono ? '#FAFAF9' : '#FFFBEB'}
          stroke={isMono ? '#1C1917' : '#78350F'}
          strokeWidth="1"
        />

        {/* Central Watchful Observatory Eye / Scope (عين المِرقاب الراصدة) */}
        <path
          d="M17.5 22C21.8 15.8 26.8 13.8 32 13.8C37.2 13.8 42.2 15.8 46.5 22C42.2 28.2 37.2 30.2 32 30.2C26.8 30.2 21.8 28.2 17.5 22Z"
          fill="#FFFFFF"
          stroke={isMono ? '#292524' : `url(#${goldId})`}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Iris & Precision Pupil */}
        <circle
          cx="32"
          cy="22"
          r="5.2"
          fill={isMono ? '#44403C' : '#991B1B'}
          stroke={isMono ? '#1C1917' : '#D97706'}
          strokeWidth="1.2"
        />
        <circle cx="32" cy="22" r="2.3" fill="#0C0A09" />
        {/* Sharp Optical Specular Glint */}
        <circle cx="33.7" cy="20.4" r="1.15" fill="#FFFFFF" />

        {/* Nile Horizon Waves at Base (نيل المنيا وعروس الصعيد) */}
        <path
          d="M9 52.5C14.5 49.5 19.5 49.5 25 52.5C30.5 55.5 33.5 55.5 39 52.5C44.5 49.5 49.5 49.5 55 52.5"
          stroke={isMono ? '#FAFAF9' : '#FDE68A'}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M13 56.5C17.5 54.3 21.5 54.3 26 56.5C30.5 58.7 33.5 58.7 38 56.5C42.5 54.3 46.5 54.3 51 56.5"
          stroke={isMono ? '#A8A29E' : '#F59E0B'}
          strokeOpacity="0.85"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
