import React from "react";

export const SakuraPetal = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 40 40" style={style} className="absolute pointer-events-none" aria-hidden>
    <ellipse cx="20" cy="20" rx="8" ry="14" fill="#f9a8c9" opacity="0.7" transform="rotate(-30 20 20)" />
    <ellipse cx="20" cy="20" rx="8" ry="14" fill="#fbc8db" opacity="0.5" transform="rotate(42 20 20)" />
    <ellipse cx="20" cy="20" rx="8" ry="14" fill="#f9a8c9" opacity="0.6" transform="rotate(114 20 20)" />
    <ellipse cx="20" cy="20" rx="8" ry="14" fill="#fbc8db" opacity="0.5" transform="rotate(186 20 20)" />
    <ellipse cx="20" cy="20" rx="8" ry="14" fill="#f9a8c9" opacity="0.7" transform="rotate(258 20 20)" />
    <circle cx="20" cy="20" r="4" fill="#fde68a" />
  </svg>
);
