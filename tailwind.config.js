/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Brand colors using CSS variables
                primary: {
                    DEFAULT: 'rgb(var(--color-primary))',
                    hover: 'rgb(var(--color-primary-hover))',
                    light: 'rgb(var(--color-primary-light))',
                },
                accent: {
                    DEFAULT: 'rgb(var(--color-accent))',
                },
                // Background colors
                bg: {
                    primary: 'rgb(var(--color-bg-primary))',
                    secondary: 'rgb(var(--color-bg-secondary))',
                    tertiary: 'rgb(var(--color-bg-tertiary))',
                    card: 'rgb(var(--color-bg-card))',
                    overlay: 'rgb(var(--color-bg-overlay))',
                },
                // Text colors
                text: {
                    primary: 'rgb(var(--color-text-primary))',
                    secondary: 'rgb(var(--color-text-secondary))',
                    tertiary: 'rgb(var(--color-text-tertiary))',
                    muted: 'rgb(var(--color-text-muted))',
                    inverse: 'rgb(var(--color-text-inverse))',
                },
                // Border colors
                border: {
                    primary: 'rgb(var(--color-border-primary))',
                    secondary: 'rgb(var(--color-border-secondary))',
                    muted: 'rgb(var(--color-border-muted))',
                },
                // Glassmorphism colors
                glass: {
                    bg: 'rgb(var(--color-glass-bg) / 0.8)',
                    'bg-light': 'rgb(var(--color-glass-bg) / 0.6)',
                    'bg-heavy': 'rgb(var(--color-glass-bg) / 0.95)',
                    border: 'rgb(var(--color-glass-border) / 0.2)',
                    'border-light': 'rgb(var(--color-glass-border) / 0.1)',
                    shadow: 'rgb(var(--color-glass-shadow) / 0.1)',
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
                'blob': 'blob 7s infinite',
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
            },
        },
    },
    plugins: [
        // DaisyUI is commented out to avoid require error in ES modules
        // require('daisyui'),
    ],
    daisyui: {
        themes: false, // Disable DaisyUI themes to use our custom theme
        base: false, // Disable DaisyUI base styles
    },
}