/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        kid: ['"Baloo 2"', 'Nunito', 'system-ui', 'sans-serif'],
        bright: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
        tier: ['var(--font-tier)'],
      },
      colors: {
        // Semantic, audience-aware colors driven by CSS variables (see index.css)
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          soft: 'rgb(var(--brand-soft) / <alpha-value>)',
          ink: 'rgb(var(--brand-ink) / <alpha-value>)',
          alt: 'rgb(var(--brand-alt) / <alpha-value>)',
        },
      },
      borderRadius: {
        card: 'var(--radius-card)',
        btn: 'var(--radius-btn)',
      },
    },
  },
  plugins: [],
};
