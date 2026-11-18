import React from 'react';
import { WordEntry } from '../types/learning';

interface FlashcardIllustrationProps {
  wordEntry: WordEntry;
  size?: 'sm' | 'md' | 'lg';
}

interface VisualSpec {
  bg: string;
  border: string;
  renderSvg: () => React.ReactNode;
}

const SvgWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" aria-hidden="true">
    {children}
  </svg>
);

const SOFA_COMFORT_SPEC: VisualSpec = {
  bg: 'bg-amber-50 dark:bg-amber-950/40',
  border: 'border-amber-200 dark:border-amber-800',
  renderSvg: () => (
    <SvgWrap>
      {/* Cozy pastel armchair / sofa with soft cushions */}
      <rect x="22" y="42" width="76" height="34" rx="14" fill="#fb923c" stroke="#c2410c" strokeWidth="3" />
      <rect x="14" y="54" width="16" height="32" rx="7" fill="#fdba74" stroke="#c2410c" strokeWidth="3" />
      <rect x="90" y="54" width="16" height="32" rx="7" fill="#fdba74" stroke="#c2410c" strokeWidth="3" />
      <rect x="26" y="66" width="68" height="20" rx="8" fill="#fed7aa" stroke="#c2410c" strokeWidth="3" />
      {/* Soft throw pillow */}
      <rect x="36" y="48" width="22" height="18" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" transform="rotate(-8 47 57)" />
      {/* Legs */}
      <line x1="30" y1="86" x2="28" y2="96" stroke="#9a3412" strokeWidth="4" strokeLinecap="round" />
      <line x1="90" y1="86" x2="92" y2="96" stroke="#9a3412" strokeWidth="4" strokeLinecap="round" />
      {/* Gentle comfort sparkles */}
      <path d="M58 22 L60 28 L66 30 L60 32 L58 38 L56 32 L50 30 L56 28 Z" fill="#facc15" />
    </SvgWrap>
  ),
};

const HOUSE_SPEC: VisualSpec = {
  bg: 'bg-orange-50 dark:bg-orange-950/40',
  border: 'border-orange-200 dark:border-orange-800',
  renderSvg: () => (
    <SvgWrap>
      <polygon points="18,56 60,20 102,56" fill="#fb7185" stroke="#be123c" strokeWidth="3" strokeLinejoin="round" />
      <rect x="28" y="56" width="64" height="44" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
      <rect x="52" y="70" width="18" height="30" rx="3" fill="#fbbf24" stroke="#92400e" strokeWidth="2.5" />
      <rect x="34" y="66" width="12" height="12" rx="2" fill="#7dd3fc" stroke="#0369a1" strokeWidth="2" />
      <rect x="74" y="66" width="12" height="12" rx="2" fill="#7dd3fc" stroke="#0369a1" strokeWidth="2" />
    </SvgWrap>
  ),
};

const BOOK_SPEC: VisualSpec = {
  bg: 'bg-sky-50 dark:bg-sky-950/40',
  border: 'border-sky-200 dark:border-sky-800',
  renderSvg: () => (
    <SvgWrap>
      <path d="M28 28 Q28 20 38 19 L88 15 L92 84 L38 92 Q28 93 28 84 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
      <path d="M28 84 Q28 98 42 98 L92 92 L92 80 L40 86 Q28 87 28 84 Z" fill="#fef3c7" stroke="#1d4ed8" strokeWidth="3" />
      <polygon points="60,34 65,45 77,46 68,54 71,66 60,60 49,66 52,54 43,46 55,45" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
      <path d="M44 92 V106 L50 101 L56 106 V90 Z" fill="#fb7185" stroke="#be123c" strokeWidth="2" />
    </SvgWrap>
  ),
};

const CLOCK_SPEC: VisualSpec = {
  bg: 'bg-pink-50 dark:bg-pink-950/40',
  border: 'border-pink-200 dark:border-pink-800',
  renderSvg: () => (
    <SvgWrap>
      <circle cx="32" cy="28" r="11" fill="#facc15" stroke="#b45309" strokeWidth="3" />
      <circle cx="88" cy="28" r="11" fill="#facc15" stroke="#b45309" strokeWidth="3" />
      <circle cx="60" cy="64" r="36" fill="#fda4af" stroke="#be123c" strokeWidth="3" />
      <circle cx="60" cy="64" r="28" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
      <line x1="60" y1="64" x2="60" y2="44" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="60" y1="64" x2="77" y2="64" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="51" cy="58" r="2.2" fill="#1e293b" />
      <circle cx="69" cy="58" r="2.2" fill="#1e293b" />
      <path d="M55 72 Q60 77 65 72" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
    </SvgWrap>
  ),
};

const POT_SPEC: VisualSpec = {
  bg: 'bg-rose-50 dark:bg-rose-950/40',
  border: 'border-rose-200 dark:border-rose-800',
  renderSvg: () => (
    <SvgWrap>
      <ellipse cx="60" cy="40" rx="34" ry="10" fill="#f472b6" stroke="#be185d" strokeWidth="3" />
      <circle cx="60" cy="27" r="6" fill="#2dd4bf" stroke="#0f766e" strokeWidth="2.5" />
      <path d="M26 44 H94 L90 88 Q89 96 60 96 Q31 96 30 88 Z" fill="#f9a8d4" stroke="#be185d" strokeWidth="3" />
      <path d="M18 52 Q12 52 12 58 Q12 64 26 62" fill="#2dd4bf" stroke="#0f766e" strokeWidth="2.5" />
      <path d="M102 52 Q108 52 108 58 Q108 64 94 62" fill="#2dd4bf" stroke="#0f766e" strokeWidth="2.5" />
      <circle cx="60" cy="70" r="9" fill="#fff" opacity="0.9" />
      <circle cx="60" cy="70" r="3.5" fill="#fbbf24" />
    </SvgWrap>
  ),
};

const MILK_SPEC: VisualSpec = {
  bg: 'bg-cyan-50 dark:bg-cyan-950/40',
  border: 'border-cyan-200 dark:border-cyan-800',
  renderSvg: () => (
    <SvgWrap>
      <polygon points="36,36 60,22 84,36" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="3" />
      <rect x="36" y="36" width="48" height="62" rx="6" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="3" />
      <rect x="44" y="20" width="32" height="10" rx="3" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.5" />
      <rect x="36" y="54" width="48" height="22" fill="#60a5fa" opacity="0.35" />
      <circle cx="60" cy="65" r="10" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
      <circle cx="56" cy="64" r="1.8" fill="#1e293b" />
      <circle cx="64" cy="64" r="1.8" fill="#1e293b" />
      <path d="M56 70 Q60 73 64 70" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
    </SvgWrap>
  ),
};

const APPLE_SPEC: VisualSpec = {
  bg: 'bg-lime-50 dark:bg-lime-950/40',
  border: 'border-lime-200 dark:border-lime-800',
  renderSvg: () => (
    <SvgWrap>
      <path d="M60 32 Q66 20 76 22 Q72 34 60 34 Z" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
      <path d="M60 36 C42 28 24 44 28 68 C32 90 48 98 60 92 C72 98 88 90 92 68 C96 44 78 28 60 36 Z" fill="#fb7185" stroke="#be123c" strokeWidth="3" />
      <ellipse cx="44" cy="54" rx="5" ry="9" fill="#fff" opacity="0.45" transform="rotate(-18 44 54)" />
    </SvgWrap>
  ),
};

/**
 * Exact 1-to-1 bespoke SVG illustrations for every curriculum word and core everyday items.
 */
const EXACT_SVG_BY_WORD: Record<string, VisualSpec> = {
  // Textbook classics
  pot: POT_SPEC,
  book: BOOK_SPEC,
  books: BOOK_SPEC,
  clock: CLOCK_SPEC,
  watch: CLOCK_SPEC,
  milk: MILK_SPEC,
  apple: APPLE_SPEC,
  house: HOUSE_SPEC,
  home: HOUSE_SPEC,
  apartment: HOUSE_SPEC,
  sofa: SOFA_COMFORT_SPEC,
  couch: SOFA_COMFORT_SPEC,
  comfortable: SOFA_COMFORT_SPEC,

  // 29 Curriculum Words — each paired accurately with its exact meaning & state
  hello: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-200 dark:border-indigo-800',
    renderSvg: () => (
      <SvgWrap>
        <path d="M18 30 Q18 18 30 18 H88 Q100 18 100 30 V62 Q100 74 88 74 H50 L32 88 V74 H30 Q18 74 18 62 Z" fill="#6366f1" stroke="#312e81" strokeWidth="3" />
        <text x="59" y="54" textAnchor="middle" fontSize="26" fontWeight="900" fill="#fde047">HI!</text>
        <path d="M78 86 Q86 76 96 82 Q104 88 94 98 Q84 104 76 96 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />
      </SvgWrap>
    ),
  },
  morning: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
    renderSvg: () => (
      <SvgWrap>
        <circle cx="60" cy="62" r="24" fill="#fde047" stroke="#d97706" strokeWidth="3" />
        {[200, 235, 270, 305, 340].map((deg) => (
          <line
            key={deg}
            x1="60"
            y1="62"
            x2={60 + 40 * Math.cos((deg * Math.PI) / 180)}
            y2={62 + 40 * Math.sin((deg * Math.PI) / 180)}
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="0 28 12"
          />
        ))}
        <rect x="14" y="72" width="92" height="30" rx="8" fill="#bae6fd" />
        <path d="M18 82 Q44 74 62 82 Q82 90 102 80" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
      </SvgWrap>
    ),
  },
  make: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-sky-200 dark:border-sky-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Craft gear + wrench */}
        <circle cx="48" cy="64" r="22" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="3" strokeDasharray="8 5" />
        <circle cx="48" cy="64" r="10" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2.5" />
        <path d="M68 28 L96 56 L86 66 L58 38 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="64" cy="34" r="10" fill="#fde047" stroke="#b45309" strokeWidth="2.5" />
      </SvgWrap>
    ),
  },
  know: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/40',
    border: 'border-yellow-200 dark:border-yellow-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Glowing lightbulb of knowledge inside head/idea */}
        <circle cx="60" cy="46" r="24" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
        <path d="M48 64 L52 78 H68 L72 64" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
        <rect x="51" y="78" width="18" height="12" rx="4" fill="#94a3b8" stroke="#475569" strokeWidth="2.5" />
        <line x1="60" y1="12" x2="60" y2="18" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="26" y1="46" x2="32" y2="46" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="88" y1="46" x2="94" y2="46" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
      </SvgWrap>
    ),
  },
  write: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
    renderSvg: () => (
      <SvgWrap>
        <rect x="24" y="20" width="56" height="76" rx="6" fill="#ffffff" stroke="#64748b" strokeWidth="3" />
        <line x1="34" y1="36" x2="64" y2="36" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="34" y1="50" x2="68" y2="50" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="34" y1="64" x2="56" y2="64" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M72 86 L94 40 L104 46 L82 92 L70 96 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="2.5" />
      </SvgWrap>
    ),
  },
  listen: {
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40',
    border: 'border-fuchsia-200 dark:border-fuchsia-800',
    renderSvg: () => (
      <SvgWrap>
        <path d="M26 68 V54 Q26 24 60 24 Q94 24 94 54 V68" fill="none" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
        <rect x="20" y="60" width="16" height="32" rx="8" fill="#a855f7" stroke="#581c87" strokeWidth="2.5" />
        <rect x="84" y="60" width="16" height="32" rx="8" fill="#a855f7" stroke="#581c87" strokeWidth="2.5" />
        <path d="M52 72 V50 L70 46 V68" fill="none" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="48" cy="72" r="5" fill="#e11d48" />
        <circle cx="66" cy="68" r="5" fill="#e11d48" />
      </SvgWrap>
    ),
  },
  information: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800',
    renderSvg: () => (
      <SvgWrap>
        <circle cx="60" cy="60" r="38" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
        <circle cx="60" cy="38" r="6" fill="#ffffff" />
        <rect x="54" y="50" width="12" height="34" rx="6" fill="#ffffff" />
      </SvgWrap>
    ),
  },
  understand: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
    renderSvg: () => (
      <SvgWrap>
        <circle cx="60" cy="56" r="34" fill="#d1fae5" stroke="#059669" strokeWidth="3" />
        <path d="M42 56 L54 68 L80 42" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="90" cy="28" r="10" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
      </SvgWrap>
    ),
  },
  schedule: {
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    border: 'border-violet-200 dark:border-violet-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Desk Calendar with checkmark */}
        <rect x="22" y="28" width="76" height="72" rx="10" fill="#ffffff" stroke="#5b21b6" strokeWidth="3" />
        <path d="M22 38 Q22 28 32 28 H88 Q98 28 98 38 V48 H22 Z" fill="#8b5cf6" stroke="#5b21b6" strokeWidth="3" />
        <line x1="42" y1="20" x2="42" y2="34" stroke="#312e81" strokeWidth="4" strokeLinecap="round" />
        <line x1="78" y1="20" x2="78" y2="34" stroke="#312e81" strokeWidth="4" strokeLinecap="round" />
        <rect x="34" y="58" width="14" height="12" rx="3" fill="#e2e8f0" />
        <rect x="54" y="58" width="14" height="12" rx="3" fill="#fde047" />
        <rect x="74" y="58" width="14" height="12" rx="3" fill="#e2e8f0" />
        <path d="M40 80 L50 88 L72 72" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </SvgWrap>
    ),
  },
  luggage: {
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    border: 'border-teal-200 dark:border-teal-800',
    renderSvg: () => (
      <SvgWrap>
        <path d="M46 28 V20 Q46 16 50 16 H70 Q74 16 74 20 V28" fill="none" stroke="#334155" strokeWidth="3.5" />
        <rect x="30" y="28" width="60" height="66" rx="10" fill="#2dd4bf" stroke="#0f766e" strokeWidth="3" />
        <line x1="45" y1="28" x2="45" y2="94" stroke="#0f766e" strokeWidth="2.5" />
        <line x1="75" y1="28" x2="75" y2="94" stroke="#0f766e" strokeWidth="2.5" />
        <circle cx="40" cy="99" r="5" fill="#334155" />
        <circle cx="80" cy="99" r="5" fill="#334155" />
        <rect x="52" y="50" width="16" height="12" rx="3" fill="#fde047" />
      </SvgWrap>
    ),
  },
  opportunity: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Open door streaming golden light */}
        <rect x="28" y="22" width="64" height="78" rx="4" fill="#fef08a" stroke="#b45309" strokeWidth="3" />
        <polygon points="28,22 66,30 66,92 28,100" fill="#fb923c" stroke="#9a3412" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="56" cy="60" r="3.5" fill="#fde047" />
        <path d="M78 46 L80 52 L86 54 L80 56 L78 62 L76 56 L70 54 L76 52 Z" fill="#f59e0b" />
      </SvgWrap>
    ),
  },
  communication: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-sky-200 dark:border-sky-800',
    renderSvg: () => (
      <SvgWrap>
        <path d="M16 32 Q16 22 26 22 H68 Q78 22 78 32 V54 Q78 64 68 64 H40 L24 76 V64 H26 Q16 64 16 54 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="3" />
        <path d="M44 52 Q44 44 54 44 H94 Q104 44 104 52 V74 Q104 82 94 82 H90 V94 L76 82 H54 Q44 82 44 74 Z" fill="#f472b6" stroke="#be185d" strokeWidth="3" />
        <line x1="30" y1="38" x2="60" y2="38" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="62" x2="90" y2="62" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </SvgWrap>
    ),
  },
  confident: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/40',
    border: 'border-yellow-200 dark:border-yellow-800',
    renderSvg: () => (
      <SvgWrap>
        <circle cx="60" cy="62" r="34" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
        <path d="M42 52 Q47 46 52 52" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M68 52 Q73 46 78 52" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M44 68 Q60 82 76 68" fill="none" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="94,20 97,27 104,28 99,33 100,40 94,37 88,40 89,33 84,28 91,27" fill="#fb923c" stroke="#c2410c" strokeWidth="1.5" />
      </SvgWrap>
    ),
  },
  perspective: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    border: 'border-cyan-200 dark:border-cyan-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Observing eye looking through lens */}
        <path d="M16 60 Q60 22 104 60 Q60 98 16 60 Z" fill="#ffffff" stroke="#0369a1" strokeWidth="3.5" />
        <circle cx="60" cy="60" r="18" fill="#38bdf8" stroke="#0369a1" strokeWidth="3" />
        <circle cx="60" cy="60" r="8" fill="#0f172a" />
        <circle cx="55" cy="54" r="3" fill="#ffffff" />
      </SvgWrap>
    ),
  },
  resilience: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Strong shield with green sprout */}
        <path d="M28 28 L60 18 L92 28 V56 Q92 84 60 100 Q28 84 28 56 Z" fill="#bbf7d0" stroke="#15803d" strokeWidth="3.5" />
        <line x1="60" y1="74" x2="60" y2="46" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 54 Q46 42 42 52 Q48 62 60 58" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
        <path d="M60 48 Q74 36 78 46 Q72 56 60 52" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
      </SvgWrap>
    ),
  },
  breakthrough: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-200 dark:border-rose-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Rocket blasting upward */}
        <path d="M60 18 Q76 38 74 72 H46 Q44 38 60 18 Z" fill="#f87171" stroke="#b91c1c" strokeWidth="3" />
        <circle cx="60" cy="46" r="7" fill="#bae6fd" stroke="#0369a1" strokeWidth="2.5" />
        <polygon points="46,60 32,78 46,74" fill="#fb923c" stroke="#b91c1c" strokeWidth="2.5" />
        <polygon points="74,60 88,78 74,74" fill="#fb923c" stroke="#b91c1c" strokeWidth="2.5" />
        <path d="M52 74 Q60 100 68 74 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
      </SvgWrap>
    ),
  },
  phone: {
    bg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-slate-300 dark:border-slate-700',
    renderSvg: () => (
      <SvgWrap>
        <rect x="36" y="16" width="48" height="88" rx="10" fill="#334155" stroke="#0f172a" strokeWidth="3" />
        <rect x="42" y="26" width="36" height="60" rx="4" fill="#e0f2fe" />
        <circle cx="60" cy="94" r="3.5" fill="#94a3b8" />
        <circle cx="60" cy="54" r="12" fill="#22c55e" />
        <path d="M55 50 Q55 58 65 58" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </SvgWrap>
    ),
  },
  school: {
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    border: 'border-orange-200 dark:border-orange-800',
    renderSvg: () => (
      <SvgWrap>
        <polygon points="20,54 60,24 100,54" fill="#ef4444" stroke="#991b1b" strokeWidth="3" strokeLinejoin="round" />
        <rect x="28" y="54" width="64" height="44" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
        <circle cx="60" cy="41" r="6" fill="#ffffff" stroke="#991b1b" strokeWidth="2" />
        <rect x="52" y="70" width="16" height="28" rx="2" fill="#92400e" />
        <line x1="60" y1="12" x2="60" y2="24" stroke="#334155" strokeWidth="2.5" />
        <polygon points="60,12 74,16 60,20" fill="#3b82f6" />
      </SvgWrap>
    ),
  },
  teacher: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Classroom chalkboard with ABC */}
        <rect x="18" y="24" width="84" height="58" rx="6" fill="#065f46" stroke="#92400e" strokeWidth="5" />
        <text x="60" y="56" textAnchor="middle" fontSize="22" fontWeight="800" fill="#fef08a">ABC</text>
        <rect x="26" y="84" width="68" height="8" rx="3" fill="#b45309" />
      </SvgWrap>
    ),
  },
  family: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-200 dark:border-rose-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Parents + Child + Heart */}
        <circle cx="38" cy="40" r="10" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2.5" />
        <path d="M24 84 Q24 58 38 58 Q50 58 50 84 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2.5" />
        <circle cx="82" cy="40" r="10" fill="#fda4af" stroke="#be123c" strokeWidth="2.5" />
        <path d="M70 84 Q70 58 82 58 Q96 58 96 84 Z" fill="#fb7185" stroke="#be123c" strokeWidth="2.5" />
        <circle cx="60" cy="58" r="8" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
        <path d="M48 90 Q48 70 60 70 Q72 70 72 90 Z" fill="#4ade80" stroke="#15803d" strokeWidth="2.5" />
        <path d="M60 34 C56 26 48 28 50 35 C52 40 60 44 60 44 C60 44 68 40 70 35 C72 28 64 26 60 34 Z" fill="#f43f5e" />
      </SvgWrap>
    ),
  },
  friend: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-sky-200 dark:border-sky-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Two smiling friends side by side */}
        <circle cx="42" cy="44" r="15" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
        <circle cx="78" cy="44" r="15" fill="#bae6fd" stroke="#0369a1" strokeWidth="2.5" />
        <path d="M22 92 Q22 66 42 66 Q58 66 58 92 Z" fill="#fb923c" stroke="#c2410c" strokeWidth="2.5" />
        <path d="M62 92 Q62 66 78 66 Q98 66 98 92 Z" fill="#38bdf8" stroke="#0369a1" strokeWidth="2.5" />
        <path d="M36 47 Q42 52 48 47" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <path d="M72 47 Q78 52 84 47" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      </SvgWrap>
    ),
  },
  breakfast: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Plate with sunny-side-up egg & toast */}
        <circle cx="56" cy="64" r="34" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
        <path d="M40 56 Q34 68 46 76 Q64 80 72 68 Q74 52 54 50 Q42 48 40 56 Z" fill="#fef9c3" stroke="#eab308" strokeWidth="2" />
        <circle cx="55" cy="63" r="9" fill="#fb923c" />
        <rect x="82" y="30" width="22" height="24" rx="5" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
        <path d="M104 36 Q112 36 112 42 Q112 48 104 48" fill="none" stroke="#78350f" strokeWidth="2.5" />
      </SvgWrap>
    ),
  },
  expensive: {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-200 dark:border-purple-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Diamond + $$$ */}
        <polygon points="38,28 82,28 98,50 60,94 22,50" fill="#67e8f9" stroke="#0e7490" strokeWidth="3" strokeLinejoin="round" />
        <line x1="22" y1="50" x2="98" y2="50" stroke="#0e7490" strokeWidth="2.5" />
        <rect x="66" y="16" width="38" height="22" rx="6" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
        <text x="85" y="32" textAnchor="middle" fontSize="13" fontWeight="900" fill="#92400e">$$$</text>
      </SvgWrap>
    ),
  },
  healthy: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-200 dark:border-rose-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Healthy heart + pulse wave */}
        <path
          d="M60 94 C30 76 18 56 22 38 C26 24 44 20 60 36 C76 20 94 24 98 38 C102 56 90 76 60 94 Z"
          fill="#fb7185"
          stroke="#be123c"
          strokeWidth="3"
        />
        <polyline
          points="32,54 46,54 53,40 62,68 70,48 76,54 88,54"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SvgWrap>
    ),
  },
  technology: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-200 dark:border-indigo-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Laptop displaying tech gear/code */}
        <rect x="24" y="26" width="72" height="50" rx="6" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
        <rect x="30" y="32" width="60" height="38" rx="3" fill="#e0e7ff" />
        <path d="M16 80 H104 L98 92 H22 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
        <text x="60" y="57" textAnchor="middle" fontSize="18" fontWeight="900" fill="#4f46e5">&lt;/&gt;</text>
      </SvgWrap>
    ),
  },
  solution: {
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    border: 'border-teal-200 dark:border-teal-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Interlocking puzzle pieces */}
        <path d="M22 36 H54 V50 Q62 48 62 56 Q62 64 54 62 V84 H22 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="3" />
        <path d="M54 36 H94 V84 H54 V62 Q62 64 62 56 Q62 48 54 50 Z" fill="#34d399" stroke="#047857" strokeWidth="3" />
      </SvgWrap>
    ),
  },
  sustainable: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Green circular eco loop + leaf */}
        <circle cx="60" cy="60" r="34" fill="none" stroke="#22c55e" strokeWidth="6" strokeDasharray="46 16" />
        <path d="M60 40 Q78 44 76 64 Q60 76 46 66 Q44 46 60 40 Z" fill="#4ade80" stroke="#15803d" strokeWidth="2.5" />
        <line x1="60" y1="74" x2="60" y2="52" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
      </SvgWrap>
    ),
  },
  collaborate: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800',
    renderSvg: () => (
      <SvgWrap>
        {/* Two hands shaking / connected teamwork */}
        <path d="M18 52 L42 42 L60 56 L48 72 L18 66 Z" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M102 52 L78 42 L60 56 L72 72 L102 66 Z" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="60" cy="30" r="9" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
      </SvgWrap>
    ),
  },
};

/**
 * Exact English word -> emoji fallback for core 980 words & common saved words
 */
const WORD_EMOJI_MAP: Record<string, { emoji: string; bg: string; border: string }> = {
  // Feelings & States
  happy: { emoji: '😄', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  glad: { emoji: '😊', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  excited: { emoji: '🤩', bg: 'bg-amber-50', border: 'border-amber-200' },
  joyful: { emoji: '🥳', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  sad: { emoji: '😢', bg: 'bg-sky-50', border: 'border-sky-200' },
  unhappy: { emoji: '😞', bg: 'bg-slate-100', border: 'border-slate-300' },
  lonely: { emoji: '😔', bg: 'bg-slate-100', border: 'border-slate-300' },
  angry: { emoji: '😠', bg: 'bg-rose-50', border: 'border-rose-200' },
  tired: { emoji: '😴', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  sleep: { emoji: '😴', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  sleepy: { emoji: '🥱', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  scared: { emoji: '😨', bg: 'bg-purple-50', border: 'border-purple-200' },
  afraid: { emoji: '😨', bg: 'bg-purple-50', border: 'border-purple-200' },
  worried: { emoji: '😟', bg: 'bg-amber-50', border: 'border-amber-200' },
  nervous: { emoji: '😬', bg: 'bg-amber-50', border: 'border-amber-200' },
  calm: { emoji: '😌', bg: 'bg-teal-50', border: 'border-teal-200' },
  relaxed: { emoji: '😌', bg: 'bg-teal-50', border: 'border-teal-200' },
  bored: { emoji: '😒', bg: 'bg-slate-100', border: 'border-slate-300' },
  surprised: { emoji: '😲', bg: 'bg-orange-50', border: 'border-orange-200' },
  proud: { emoji: '🏆', bg: 'bg-amber-50', border: 'border-amber-200' },
  // Temperature, Speed, Size, Condition
  hot: { emoji: '🔥', bg: 'bg-orange-50', border: 'border-orange-200' },
  warm: { emoji: '☀️', bg: 'bg-amber-50', border: 'border-amber-200' },
  cold: { emoji: '❄️', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  cool: { emoji: '🧊', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  hungry: { emoji: '🍽️', bg: 'bg-orange-50', border: 'border-orange-200' },
  thirsty: { emoji: '🥤', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  sick: { emoji: '🤒', bg: 'bg-rose-50', border: 'border-rose-200' },
  ill: { emoji: '🤒', bg: 'bg-rose-50', border: 'border-rose-200' },
  strong: { emoji: '💪', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  fast: { emoji: '⚡', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  quick: { emoji: '⚡', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  slow: { emoji: '🐢', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  big: { emoji: '🐘', bg: 'bg-slate-100', border: 'border-slate-300' },
  large: { emoji: '🐘', bg: 'bg-slate-100', border: 'border-slate-300' },
  small: { emoji: '🐜', bg: 'bg-lime-50', border: 'border-lime-200' },
  tiny: { emoji: '🐜', bg: 'bg-lime-50', border: 'border-lime-200' },
  cheap: { emoji: '🏷️', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  clean: { emoji: '✨', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  dirty: { emoji: '🧹', bg: 'bg-amber-50', border: 'border-amber-200' },
  // Everyday Nouns & Food & Nature
  cat: { emoji: '🐱', bg: 'bg-orange-50', border: 'border-orange-200' },
  dog: { emoji: '🐶', bg: 'bg-amber-50', border: 'border-amber-200' },
  fish: { emoji: '🐟', bg: 'bg-sky-50', border: 'border-sky-200' },
  bird: { emoji: '🐦', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  water: { emoji: '💧', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  coffee: { emoji: '☕', bg: 'bg-amber-50', border: 'border-amber-200' },
  tea: { emoji: '🍵', bg: 'bg-lime-50', border: 'border-lime-200' },
  bread: { emoji: '🍞', bg: 'bg-amber-50', border: 'border-amber-200' },
  egg: { emoji: '🥚', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  rice: { emoji: '🍚', bg: 'bg-slate-50', border: 'border-slate-200' },
  banana: { emoji: '🍌', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  orange: { emoji: '🍊', bg: 'bg-orange-50', border: 'border-orange-200' },
  sun: { emoji: '☀️', bg: 'bg-amber-50', border: 'border-amber-200' },
  moon: { emoji: '🌙', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  night: { emoji: '🌙', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  rain: { emoji: '🌧️', bg: 'bg-sky-50', border: 'border-sky-200' },
  tree: { emoji: '🌳', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  flower: { emoji: '🌸', bg: 'bg-pink-50', border: 'border-pink-200' },
  car: { emoji: '🚗', bg: 'bg-rose-50', border: 'border-rose-200' },
  bus: { emoji: '🚌', bg: 'bg-amber-50', border: 'border-amber-200' },
  train: { emoji: '🚆', bg: 'bg-teal-50', border: 'border-teal-200' },
  airplane: { emoji: '✈️', bg: 'bg-sky-50', border: 'border-sky-200' },
  key: { emoji: '🔑', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  door: { emoji: '🚪', bg: 'bg-orange-50', border: 'border-orange-200' },
  window: { emoji: '🪟', bg: 'bg-sky-50', border: 'border-sky-200' },
  bed: { emoji: '🛏️', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  chair: { emoji: '🪑', bg: 'bg-amber-50', border: 'border-amber-200' },
  table: { emoji: '🪑', bg: 'bg-amber-50', border: 'border-amber-200' },
  pillow: { emoji: '🛌', bg: 'bg-pink-50', border: 'border-pink-200' },
  money: { emoji: '💵', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  computer: { emoji: '💻', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  pen: { emoji: '🖊️', bg: 'bg-blue-50', border: 'border-blue-200' },
  music: { emoji: '🎵', bg: 'bg-fuchsia-50', border: 'border-fuchsia-200' },
  heart: { emoji: '❤️', bg: 'bg-rose-50', border: 'border-rose-200' },
  love: { emoji: '❤️', bg: 'bg-rose-50', border: 'border-rose-200' },
};

const VI_MEANING_RULES: { pattern: RegExp; emoji: string; bg: string; border: string }[] = [
  { pattern: /\b(vui|hạnh phúc|hào hứng|mỉm cười)\b/i, emoji: '😄', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  { pattern: /\b(buồn|cô đơn|khóc|thất vọng)\b/i, emoji: '😢', bg: 'bg-sky-50', border: 'border-sky-200' },
  { pattern: /\b(tức giận|giận|nóng giận)\b/i, emoji: '😠', bg: 'bg-rose-50', border: 'border-rose-200' },
  { pattern: /\b(mệt|buồn ngủ|ngủ)\b/i, emoji: '😴', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  { pattern: /\b(sợ|lo lắng|hồi hộp)\b/i, emoji: '😟', bg: 'bg-purple-50', border: 'border-purple-200' },
  { pattern: /\b(nóng|ấm|lửa|mùa hè)\b/i, emoji: '🔥', bg: 'bg-orange-50', border: 'border-orange-200' },
  { pattern: /\b(lạnh|mát|tuyết|mùa đông|đá)\b/i, emoji: '❄️', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  { pattern: /\b(bệnh|ốm|đau|thuốc|bác sĩ|bệnh viện)\b/i, emoji: '🤒', bg: 'bg-rose-50', border: 'border-rose-200' },
  { pattern: /\b(khỏe|lành mạnh|thể thao|chạy|tập)\b/i, emoji: '💪', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { pattern: /\b(nước|uống|trà|cà phê|sữa)\b/i, emoji: '🥤', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  { pattern: /\b(ăn|bánh|cơm|thịt|cá|quả|trái|bữa|đói)\b/i, emoji: '🍽️', bg: 'bg-lime-50', border: 'border-lime-200' },
  { pattern: /\b(xe|tàu|máy bay|đường|du lịch|vé|sân bay)\b/i, emoji: '✈️', bg: 'bg-teal-50', border: 'border-teal-200' },
  { pattern: /\b(nhà|phòng|cửa|bàn|ghế|giường|gối|nệm)\b/i, emoji: '🏠', bg: 'bg-orange-50', border: 'border-orange-200' },
  { pattern: /\b(sách|học|viết|trường|thi|bài|từ vựng|đọc)\b/i, emoji: '📚', bg: 'bg-sky-50', border: 'border-sky-200' },
  { pattern: /\b(tiền|giá|mua|bán|đắt|rẻ|thẻ|ngân hàng|lương)\b/i, emoji: '💰', bg: 'bg-amber-50', border: 'border-amber-200' },
  { pattern: /\b(công việc|công ty|họp|sếp|dự án|văn phòng)\b/i, emoji: '💼', bg: 'bg-blue-50', border: 'border-blue-200' },
  { pattern: /\b(mạng|máy tính|điện thoại|công nghệ|dữ liệu|phần mềm)\b/i, emoji: '💻', bg: 'bg-violet-50', border: 'border-violet-200' },
  { pattern: /\b(ngày|giờ|tháng|năm|tuần|sáng|tối|lịch|đồng hồ)\b/i, emoji: '⏰', bg: 'bg-pink-50', border: 'border-pink-200' },
  { pattern: /\b(mặt trời|mưa|gió|cây|hoa|biển|trời|thiên nhiên)\b/i, emoji: '🌿', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { pattern: /\b(gia đình|mẹ|bố|bạn|người|con|em|anh|chị)\b/i, emoji: '🧑‍🤝‍🧑', bg: 'bg-indigo-50', border: 'border-indigo-200' },
];

const TOPIC_EMOJI_MAP: Record<string, { emoji: string; bg: string; border: string }> = {
  'Giao tiếp': { emoji: '💬', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  'Con người': { emoji: '🧑', bg: 'bg-sky-50', border: 'border-sky-200' },
  'Thời gian': { emoji: '⏰', bg: 'bg-pink-50', border: 'border-pink-200' },
  'Số đếm': { emoji: '🔢', bg: 'bg-violet-50', border: 'border-violet-200' },
  'Nhà cửa': { emoji: '🏠', bg: 'bg-orange-50', border: 'border-orange-200' },
  'Ẩm thực': { emoji: '🍽️', bg: 'bg-lime-50', border: 'border-lime-200' },
  'Hành động': { emoji: '🏃', bg: 'bg-sky-50', border: 'border-sky-200' },
  'Du lịch': { emoji: '✈️', bg: 'bg-teal-50', border: 'border-teal-200' },
  'Mua sắm': { emoji: '🛍️', bg: 'bg-amber-50', border: 'border-amber-200' },
  'Mô tả': { emoji: '🎨', bg: 'bg-pink-50', border: 'border-pink-200' },
  'Cảm xúc': { emoji: '💭', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  'Công việc': { emoji: '💼', bg: 'bg-blue-50', border: 'border-blue-200' },
  'Công nghệ': { emoji: '💻', bg: 'bg-violet-50', border: 'border-violet-200' },
  'Học thuật': { emoji: '🎓', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  'Sức khỏe': { emoji: '🩺', bg: 'bg-rose-50', border: 'border-rose-200' },
  'Thiên nhiên': { emoji: '🌿', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  'Xã hội': { emoji: '🌍', bg: 'bg-teal-50', border: 'border-teal-200' },
  'Kết nối': { emoji: '🔗', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  'Đời sống': { emoji: '🌟', bg: 'bg-amber-50', border: 'border-amber-200' },
};

function getPosFallback(posRaw: string): { emoji: string; bg: string; border: string } {
  const p = posRaw.toLowerCase();
  if (/\b(adj|adjective)\b/.test(p) || p.includes('tính từ')) {
    return { emoji: '🎨', bg: 'bg-pink-50 dark:bg-pink-950/40', border: 'border-pink-200 dark:border-pink-800' };
  }
  if (/\b(v|verb)\b/.test(p) || p.includes('động từ')) {
    return { emoji: '⚡', bg: 'bg-sky-50 dark:bg-sky-950/40', border: 'border-sky-200 dark:border-sky-800' };
  }
  if (/\b(adv|adverb)\b/.test(p) || p.includes('trạng từ')) {
    return { emoji: '✨', bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200 dark:border-amber-800' };
  }
  if (/\b(num)\b/.test(p) || p.includes('số đếm')) {
    return { emoji: '🔢', bg: 'bg-violet-50 dark:bg-violet-950/40', border: 'border-violet-200 dark:border-violet-800' };
  }
  return { emoji: '📘', bg: 'bg-indigo-50 dark:bg-indigo-950/40', border: 'border-indigo-200 dark:border-indigo-800' };
}

/**
 * Hiển thị thẻ tranh minh họa chuẩn xác theo đúng nghĩa và trạng thái của từng từ vựng trên Flashcard 3D.
 */
export const FlashcardIllustration: React.FC<FlashcardIllustrationProps> = ({
  wordEntry,
  size = 'lg',
}) => {
  const normalizedWord = wordEntry.word.trim().toLowerCase();
  const sizeCls =
    size === 'sm'
      ? 'w-14 h-14 p-1.5 rounded-xl'
      : size === 'md'
      ? 'w-20 h-20 p-2 rounded-2xl'
      : 'w-24 h-24 sm:w-28 sm:h-28 p-2 rounded-2xl';

  const exactSvg = EXACT_SVG_BY_WORD[normalizedWord];
  if (exactSvg) {
    return (
      <div
        title={`${wordEntry.word}: ${wordEntry.meaningVi}`}
        className={`${sizeCls} ${exactSvg.bg} border-2 ${exactSvg.border} shadow-sm flex items-center justify-center shrink-0 select-none`}
      >
        {exactSvg.renderSvg()}
      </div>
    );
  }

  const exactEmoji = WORD_EMOJI_MAP[normalizedWord];
  const semanticMatch = !exactEmoji
    ? VI_MEANING_RULES.find((item) => item.pattern.test(wordEntry.meaningVi))
    : undefined;
  const topicFallback = !exactEmoji && !semanticMatch && wordEntry.topicId
    ? TOPIC_EMOJI_MAP[wordEntry.topicId]
    : undefined;
  const chosen = exactEmoji || semanticMatch || topicFallback || getPosFallback(wordEntry.pos);

  return (
    <div
      title={`${wordEntry.word}: ${wordEntry.meaningVi}`}
      className={`${sizeCls} ${chosen.bg} border-2 ${chosen.border} shadow-sm flex flex-col items-center justify-center shrink-0 select-none relative overflow-hidden`}
    >
      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/50 pointer-events-none" />
      <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-white/40 pointer-events-none" />
      <span
        className={size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-4xl' : 'text-5xl'}
        role="img"
        aria-label={wordEntry.word}
      >
        {chosen.emoji}
      </span>
    </div>
  );
};
