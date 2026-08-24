// Original hand-drawn mascot illustration: a shiba inu in traveler's gear
// (backpack + bandana), matching the site's palette (indigo / terracotta /
// sakura pink on warm cream fur). Pure inline SVG — no image request, so it
// costs nothing for LCP, and the only animation is `transform` on a couple
// of <g> groups, so it costs nothing for CLS either. The global
// `prefers-reduced-motion` rule in globals.css (a blanket `*` selector)
// already freezes these animations for anyone who's asked for less motion.
export function Mascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      role="img"
      aria-label="リュックを背負って旅する柴犬のイラスト"
    >
      {/* tail, wags from its base */}
      <path
        className="mascot-tail"
        d="M150 148 C178 142 184 106 158 90 C178 100 178 136 148 156 Z"
        fill="#d98a4a"
      />

      {/* body */}
      <ellipse cx="100" cy="152" rx="46" ry="42" fill="#eab676" />
      <ellipse cx="100" cy="166" rx="25" ry="22" fill="#fbf3e4" />

      {/* backpack */}
      <rect x="116" y="110" width="38" height="46" rx="10" fill="#cf432c" />
      <rect x="124" y="120" width="22" height="13" rx="4" fill="#e8563e" />
      <circle cx="135" cy="147" r="3.5" fill="#f2a6b4" />
      <path
        d="M78 122 Q100 134 122 122 L120 138 Q100 148 80 138 Z"
        fill="#cf432c"
        opacity="0.35"
      />

      {/* back legs */}
      <ellipse cx="78" cy="198" rx="10" ry="12" fill="#eab676" />
      <ellipse cx="120" cy="198" rx="10" ry="12" fill="#eab676" />

      {/* raised, waving paw */}
      <g className="mascot-paw">
        <ellipse cx="58" cy="140" rx="11" ry="16" fill="#eab676" />
        <ellipse cx="55" cy="128" rx="6" ry="5" fill="#fbf3e4" />
      </g>

      {/* head */}
      <g>
        <path d="M64 68 L56 30 L88 60 Z" fill="#d98a4a" />
        <path d="M136 68 L144 30 L112 60 Z" fill="#d98a4a" />
        <path d="M68 64 L62 40 L86 60 Z" fill="#fbf3e4" />
        <path d="M132 64 L138 40 L114 60 Z" fill="#fbf3e4" />

        <circle cx="100" cy="96" r="40" fill="#eab676" />
        <ellipse cx="100" cy="110" rx="21" ry="16" fill="#fbf3e4" />

        {/* bandana */}
        <path
          d="M70 84 Q100 102 130 84 L126 98 Q100 112 74 98 Z"
          fill="#f2a6b4"
        />
        <path d="M95 100 L100 116 L107 100 Z" fill="#f2a6b4" />

        {/* cheeks */}
        <ellipse cx="76" cy="106" rx="6.5" ry="4.5" fill="#f2a6b4" opacity="0.55" />
        <ellipse cx="124" cy="106" rx="6.5" ry="4.5" fill="#f2a6b4" opacity="0.55" />

        {/* eyes: happy closed curves */}
        <path
          d="M81 92 Q88 85 95 92"
          stroke="#1c1f26"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M105 92 Q112 85 119 92"
          stroke="#1c1f26"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* nose + smile */}
        <ellipse cx="100" cy="109" rx="4" ry="3" fill="#1c1f26" />
        <path
          d="M91 118 Q100 124 109 118"
          stroke="#1c1f26"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
