/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.{md,html}',
    './themes/cyber-ember/layouts/**/*.html',
    './themes/cyber-ember/assets/js/**/*.js',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ember: {
          bg: '#0B0F19',
          'bg-secondary': '#111827',
          card: '#1F2937',
          border: '#374151',
          primary: '#FF6B00',
          secondary: '#FF8C00',
          highlight: '#FFA726',
          soft: '#FFB74D',
          danger: '#EF4444',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#CBD5E1',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF6B00, #FF8C00)',
        'gradient-warm': 'linear-gradient(135deg, #FF8C00, #FFA726)',
        'gradient-soft': 'linear-gradient(135deg, #FF6B00, #FFB74D)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 107, 0, 0.3)',
        'glow-subtle': '0 0 40px rgba(255, 107, 0, 0.1)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        elevated: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        shimmer: 'shimmer 2s infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text.secondary'),
            '--tw-prose-headings': theme('colors.text.primary'),
            '--tw-prose-links': theme('colors.ember.primary'),
            '--tw-prose-code': theme('colors.ember.soft'),
            '--tw-prose-pre-bg': theme('colors.ember.bg-secondary'),
            maxWidth: 'none',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
