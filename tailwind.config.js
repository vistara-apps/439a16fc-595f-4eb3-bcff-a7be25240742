/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 20% 15%)',
        text: 'hsl(220 10% 90%)',
        accent: 'hsl(190 60% 50%)',
        danger: 'hsl(0 70% 60%)',
        primary: 'hsl(228 70% 55%)',
        success: 'hsl(140 60% 50%)',
        surface: 'hsl(220 20% 20%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0,0%,0%,0.15)',
        'float': '0 12px 32px hsla(0,0%,0%,0.20)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
