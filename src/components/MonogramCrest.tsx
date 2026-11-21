import React from 'react';

interface MonogramCrestProps {
  variant?: 'seal' | 'sanctuary' | 'closing';
  className?: string;
}

interface OverlappingRMPathsProps {
  fillPrimary: string;
  strokeShadow: string;
}

/**
 * Shared high-contrast editorial serif overlapping "R & M" emblem
 * designed on a 200x200 coordinate space centered at (100, 98).
 * R sits upper-left; M sits lower-right with real interlocking weave.
 */
const OverlappingRMPaths: React.FC<OverlappingRMPathsProps> = ({
  fillPrimary,
  strokeShadow,
}) => (
  <g>
    {/* ================= LETTER M (Lower-Right Layer) ================= */}
    <g>
      {/* M shadow pass for wax/foil relief */}
      <g transform="translate(1.2, 1.6)" opacity="0.52">
        {/* Left hairline stem */}
        <path
          d="M86 144V76"
          stroke={strokeShadow}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Left thick diagonal */}
        <path
          d="M84.5 76L91 76L121 136L115.5 138Z"
          fill={strokeShadow}
        />
        {/* Right hairline diagonal */}
        <path
          d="M118 136L149 76"
          stroke={strokeShadow}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Right thick pillar */}
        <path
          d="M146.5 76H153V144H146.5Z"
          fill={strokeShadow}
        />
        {/* M serifs */}
        <path
          d="M78 144H94M79 76H91M140 144H159M143 76H157"
          stroke={strokeShadow}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* M primary gold/ink strokes */}
      {/* Left hairline pillar */}
      <path
        d="M86 144V76"
        stroke={fillPrimary}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Left thick editorial diagonal */}
      <path
        d="M84.2 76H90.8L120.8 136.5L115.8 138.2Z"
        fill={fillPrimary}
      />
      {/* Right hairline diagonal */}
      <path
        d="M118.2 136.5L149 76"
        stroke={fillPrimary}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      {/* Right thick editorial stem */}
      <path
        d="M146.5 76H152.5V144H146.5Z"
        fill={fillPrimary}
      />
      {/* Delicate bracketed serifs for M */}
      <path
        d="M78 144H94M79 76H91M140 144H159M143 76H157"
        stroke={fillPrimary}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      {/* Subtle serif foot brackets */}
      <path
        d="M143 144C145.5 144 146.5 142 146.5 139.5M156 144C153.5 144 152.5 142 152.5 139.5M144 76C146 76 146.5 77.5 146.5 79.5M155.5 76C153.5 76 152.5 77.5 152.5 79.5"
        stroke={fillPrimary}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>

    {/* ================= INTERLOCKING AMPERSAND (&) ================= */}
    {/* Knockout halo behind ampersand where it crosses M's left stem */}
    <path
      d="M104 128C97 132 88 128 87 120C86 112 96 107 101 101C105 96 103 90 97 90C92 90 89 95 92 101C95 108 103 118 110 129"
      stroke={strokeShadow}
      strokeOpacity="0.65"
      strokeWidth="4.6"
      strokeLinecap="round"
    />
    <path
      d="M104 128C97 132 88 128 87 120C86 112 96 107 101 101C105 96 103 90 97 90C92 90 89 95 92 101C95 108 103 118 110 129"
      stroke={fillPrimary}
      strokeWidth="2.1"
      strokeLinecap="round"
    />
    {/* Delicate cursive tail of & */}
    <path
      d="M101 124C106 121 110 116 112 112"
      stroke={fillPrimary}
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* ================= LETTER R (Upper-Left Overlapping Layer) ================= */}
    {/* Subtle knockout shadow behind R's overlapping leg & bowl so R visibly floats over M */}
    <g
      stroke={strokeShadow}
      strokeOpacity="0.72"
      strokeWidth="6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M70 81C79 90 86 104 97 115" />
      <path d="M51 47C76 46 89 53 89 64C89 75 76 81 51 81" fill="none" />
    </g>

    <g>
      {/* R shadow pass for relief */}
      <g transform="translate(1.2, 1.5)" opacity="0.5">
        <path d="M46 47H52.5V115H46Z" fill={strokeShadow} />
        <path
          d="M50 47C74 47 84 54 84 64C84 74 74 80.5 50 80.5L50 82.2C79 82.2 91 75 91 64C91 53 79 45.2 50 45.2Z"
          fill={strokeShadow}
        />
        <path
          d="M66 81C76 88 83 102 93 115H101C90 101 82 88 73 80.5Z"
          fill={strokeShadow}
        />
        <path
          d="M39 115H59M39 47H55M90 115H104"
          stroke={strokeShadow}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* R primary thick vertical stem */}
      <path d="M46 47H52V115H46Z" fill={fillPrimary} />

      {/* R sculpted high-contrast bowl (thick outer right curve, hairline horizontals) */}
      <path
        d="M50 46.2C75 46.2 84.5 54 84.5 63.8C84.5 73.8 75 80.5 50 80.5V82C79.5 82 91.5 74.8 91.5 63.8C91.5 52.8 79.5 45 50 45Z"
        fill={fillPrimary}
      />

      {/* R sweeping thick diagonal leg overlapping M */}
      <path
        d="M65.5 80.8C75 88.5 82.5 102 92.5 115H100C89.5 101 81.5 88 72.5 80.2Z"
        fill={fillPrimary}
      />

      {/* R refined bracketed serifs */}
      <path
        d="M39 115H59M39 46.5H54M90 115H104"
        stroke={fillPrimary}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M42.5 115C45 115 46 113 46 110.5M55.5 115C53 115 52 113 52 110.5M42.5 46.5C45 46.5 46 48.5 46 50.5"
        stroke={fillPrimary}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>
  </g>
);

export const MonogramCrest: React.FC<MonogramCrestProps> = ({
  variant = 'sanctuary',
  className = '',
}) => {
  if (variant === 'seal') {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sealGold" x1="30" y1="30" x2="170" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8E7BA" />
            <stop offset="48%" stopColor="#D5B26E" />
            <stop offset="100%" stopColor="#9E7C3E" />
          </linearGradient>
        </defs>

        {/* Subtle inner wax impression circle */}
        <circle cx="100" cy="100" r="82" stroke="#1B2214" strokeOpacity="0.48" strokeWidth="1.6" />
        <circle cx="100" cy="100" r="76" stroke="url(#sealGold)" strokeOpacity="0.52" strokeWidth="1.3" />

        {/* Delicate raised gold laurel wreath inside wax seal */}
        <g stroke="url(#sealGold)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9">
          <path d="M46 142C28 114 30 76 48 52" />
          <path d="M36 116C28 111 27 102 33 98C38 103 39 110 36 116Z" fill="#E3C88B" fillOpacity="0.58" />
          <path d="M33 90C26 84 26 75 34 71C39 76 38 84 33 90Z" fill="#E3C88B" fillOpacity="0.58" />
          <path d="M41 66C36 58 39 50 47 50C49 56 47 62 41 66Z" fill="#E3C88B" fillOpacity="0.58" />

          <path d="M154 142C172 114 170 76 152 52" />
          <path d="M164 116C172 111 173 102 167 98C162 103 161 110 164 116Z" fill="#E3C88B" fillOpacity="0.58" />
          <path d="M167 90C174 84 174 75 166 71C161 76 162 84 167 90Z" fill="#E3C88B" fillOpacity="0.58" />
          <path d="M159 66C164 58 161 50 153 50C151 56 153 62 159 66Z" fill="#E3C88B" fillOpacity="0.58" />
        </g>

        <g transform="translate(2, 3)">
          <OverlappingRMPaths fillPrimary="url(#sealGold)" strokeShadow="#1B2214" />
        </g>
      </svg>
    );
  }

  const isSanctuary = variant === 'sanctuary';
  const fillPrimary = isSanctuary ? 'url(#goldFoilGrad)' : 'url(#goldInkGrad)';
  const strokeSubtle = isSanctuary ? '#D6BB82' : '#8D703C';
  const strokeShadow = isSanctuary ? '#1D2415' : '#EFE7D8';

  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="R & M Overlapping Monogram"
    >
      <defs>
        <linearGradient id="goldFoilGrad" x1="40" y1="40" x2="280" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5E6BE" />
          <stop offset="45%" stopColor="#CFA963" />
          <stop offset="100%" stopColor="#9B7A3E" />
        </linearGradient>
        <linearGradient id="goldInkGrad" x1="40" y1="40" x2="280" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8F6F37" />
          <stop offset="50%" stopColor="#B6904D" />
          <stop offset="100%" stopColor="#725626" />
        </linearGradient>
      </defs>

      {/* Outer ornamental double frame */}
      <circle cx="160" cy="160" r="142" stroke={strokeSubtle} strokeOpacity="0.34" strokeWidth="1.1" />
      <circle cx="160" cy="160" r="133" stroke={fillPrimary} strokeOpacity="0.65" strokeWidth="1.2" strokeDasharray="3 5" />

      {/* Left & Right Olive Leaf Wreath Arcs */}
      <g stroke={fillPrimary} strokeWidth="1.2" strokeLinecap="round" opacity="0.86">
        <path d="M52 228C26 190 26 130 52 92" />
        <path d="M40 198C30 192 26 184 31 177C37 183 41 190 40 198Z" fill={strokeSubtle} fillOpacity="0.18" />
        <path d="M34 166C23 160 20 151 27 145C33 151 36 158 34 166Z" fill={strokeSubtle} fillOpacity="0.18" />
        <path d="M38 134C28 128 27 119 34 114C39 120 41 127 38 134Z" fill={strokeSubtle} fillOpacity="0.18" />
        <path d="M48 104C40 96 42 88 49 85C52 91 52 98 48 104Z" fill={strokeSubtle} fillOpacity="0.18" />

        <path d="M268 228C294 190 294 130 268 92" />
        <path d="M280 198C290 192 294 184 289 177C283 183 279 190 280 198Z" fill={strokeSubtle} fillOpacity="0.18" />
        <path d="M286 166C297 160 300 151 293 145C287 151 284 158 286 166Z" fill={strokeSubtle} fillOpacity="0.18" />
        <path d="M282 134C292 128 293 119 286 114C281 120 279 127 282 134Z" fill={strokeSubtle} fillOpacity="0.18" />
        <path d="M272 104C280 96 278 88 271 85C268 91 268 98 272 104Z" fill={strokeSubtle} fillOpacity="0.18" />
      </g>

      {/* Top & Bottom diamond star accents */}
      <path d="M160 19L164 26L160 33L156 26Z" stroke={fillPrimary} strokeWidth="1.2" fill={strokeSubtle} fillOpacity="0.25" />
      <path d="M160 287L164 294L160 301L156 294Z" stroke={fillPrimary} strokeWidth="1.2" fill={strokeSubtle} fillOpacity="0.25" />

      {/* Centered High-Contrast Overlapping R & M Monogram */}
      <g transform="translate(22, 24) scale(1.38)">
        <OverlappingRMPaths fillPrimary={fillPrimary} strokeShadow={strokeShadow} />
      </g>
    </svg>
  );
};
