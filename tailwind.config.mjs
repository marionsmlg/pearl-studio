/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        pearl: '#F8F9FA',
        graphite: '#1E1F22',
        mist: '#8E9399',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        'physics': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'material': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '700': '700ms',
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      letterSpacing: {
        'tight-head': '-0.02em',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-slow': 'fadeIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'drift-1': 'drift1 25s ease-in-out infinite alternate',
        'drift-2': 'drift2 35s ease-in-out infinite alternate',
        'drift-3': 'drift3 40s ease-in-out infinite alternate',
        'nacre-sweep-1': 'nacreSweep1 12s ease-in-out infinite',
        'nacre-sweep-2': 'nacreSweep2 15s ease-in-out infinite',
        'nacre-shimmer': 'nacreShimmer 8s ease-in-out infinite',
        'nacre-float': 'nacreFloat 18s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.99)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        drift1: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(10%, 15%) rotate(5deg)' },
        },
        drift2: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(-10%, -5%) scale(1.1)' },
        },
        drift3: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(5%, -10%)' },
        },
        nacreSweep1: {
          '0%': { transform: 'translateX(-100%) translateY(-50%) rotate(-15deg)', opacity: '0' },
          '15%': { opacity: '0.3' },
          '50%': { transform: 'translateX(50%) translateY(0%) rotate(0deg)', opacity: '0.4' },
          '85%': { opacity: '0.25' },
          '100%': { transform: 'translateX(200%) translateY(50%) rotate(15deg)', opacity: '0' },
        },
        nacreSweep2: {
          '0%': { transform: 'translateX(100%) translateY(50%) rotate(20deg)', opacity: '0' },
          '15%': { opacity: '0.25' },
          '50%': { transform: 'translateX(-50%) translateY(0%) rotate(0deg)', opacity: '0.35' },
          '85%': { opacity: '0.2' },
          '100%': { transform: 'translateX(-200%) translateY(-50%) rotate(-20deg)', opacity: '0' },
        },
        nacreShimmer: {
          '0%, 100%': { opacity: '0.15', filter: 'blur(100px) brightness(1.03)' },
          '50%': { opacity: '0.3', filter: 'blur(110px) brightness(1.08)' },
        },
        nacreFloat: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(3%, -5%) scale(1.02)' },
          '66%': { transform: 'translate(-2%, 3%) scale(0.99)' },
        },
      },
    },
  },
  plugins: [],
};
