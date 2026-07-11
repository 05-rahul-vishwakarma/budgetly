/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        secondary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        background: {
          light: '#F8FAFC',
          dark: '#09090B',
        },
        card: {
          light: '#FFFFFF',
          dark: '#18181B',
        },
        text: {
          primary: { light: '#09090B', dark: '#FAFAFA' },
          secondary: { light: '#52525B', dark: '#A1A1AA' },
          muted: { light: '#71717A', dark: '#71717A' },
        },
        border: { light: '#E4E4E7', dark: '#27272A' },
      },
      fontFamily: {
        sans: ['Inter_400Regular', 'Inter_500Medium', 'Inter_600SemiBold', 'Inter_700Bold'],
      },
      borderRadius: {
        'card': '20px',
        'button': '16px',
        'input': '14px',
      },
      spacing: {
        '4.5': '18px',
        '18': '72px',
      },
    },
  },
  plugins: [],
}
