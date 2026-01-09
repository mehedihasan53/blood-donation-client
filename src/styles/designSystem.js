// BloodConnect Design System
// Custom color palette and design tokens

export const colors = {
    primary: {
        DEFAULT: '#EA7B7B',
        50: '#FDF2F2',
        100: '#FCE8E8',
        200: '#F8D1D1',
        300: '#F3BABA',
        400: '#EE9C9C',
        500: '#EA7B7B', // Main primary
        600: '#D25353', // Primary dark
        700: '#9E3B3B', // Primary darker
        800: '#7A2E2E',
        900: '#5C2323'
    },
    accent: {
        DEFAULT: '#FFEAD3',
        50: '#FFFCF8',
        100: '#FFF8F0',
        200: '#FFF1E1',
        300: '#FFEAD3', // Main accent
        400: '#FFE3C4',
        500: '#FFDCB5',
        600: '#FFD5A6',
        700: '#FFCE97',
        800: '#FFC788',
        900: '#FFC079'
    },
    gray: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A'
    }
};

export const spacing = {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
};

export const borderRadius = {
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px'
};

export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glassDark: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
};

export const glassmorphism = {
    light: {
        background: 'rgba(255, 255, 255, 0.25)',
        border: 'rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(16px)',
        boxShadow: shadows.glass
    },
    dark: {
        background: 'rgba(15, 23, 42, 0.25)',
        border: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        boxShadow: shadows.glassDark
    }
};

export const typography = {
    fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
    },
    fontSize: {
        xs: '0.75rem',     // 12px
        sm: '0.875rem',    // 14px
        base: '1rem',      // 16px
        lg: '1.125rem',    // 18px
        xl: '1.25rem',     // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
        '6xl': '3.75rem',  // 60px
        '7xl': '4.5rem'    // 72px
    },
    fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900'
    }
};

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
};

export const animations = {
    transition: {
        fast: '150ms ease-in-out',
        normal: '300ms ease-in-out',
        slow: '500ms ease-in-out'
    },
    keyframes: {
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
        },
        slideUp: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' }
        },
        blob: {
            '0%': { transform: 'translate(0px, 0px) scale(1)' },
            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
            '100%': { transform: 'translate(0px, 0px) scale(1)' }
        }
    }
};

// Component variants
export const buttonVariants = {
    primary: {
        background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
        color: '#ffffff',
        border: 'none',
        hover: {
            background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.primary[700]})`,
            transform: 'scale(1.05)'
        }
    },
    secondary: {
        background: glassmorphism.light.background,
        color: colors.gray[900],
        border: `1px solid ${glassmorphism.light.border}`,
        backdropFilter: glassmorphism.light.backdropFilter,
        hover: {
            borderColor: colors.primary[500],
            color: colors.primary[600]
        }
    },
    outline: {
        background: 'transparent',
        color: colors.primary[600],
        border: `2px solid ${colors.primary[600]}`,
        hover: {
            background: colors.primary[600],
            color: '#ffffff'
        }
    }
};

export const cardVariants = {
    glass: {
        background: glassmorphism.light.background,
        border: `1px solid ${glassmorphism.light.border}`,
        backdropFilter: glassmorphism.light.backdropFilter,
        boxShadow: glassmorphism.light.boxShadow,
        borderRadius: borderRadius.xl
    },
    solid: {
        background: '#ffffff',
        border: `1px solid ${colors.gray[200]}`,
        boxShadow: shadows.lg,
        borderRadius: borderRadius.xl
    }
};

// Dark mode variants
export const darkMode = {
    colors: {
        background: {
            primary: colors.gray[900],
            secondary: colors.gray[800],
            tertiary: colors.gray[700]
        },
        text: {
            primary: colors.gray[50],
            secondary: colors.gray[200],
            muted: colors.gray[300]
        },
        border: {
            primary: colors.gray[700],
            secondary: colors.gray[600]
        }
    },
    glassmorphism: glassmorphism.dark
};

export default {
    colors,
    spacing,
    borderRadius,
    shadows,
    glassmorphism,
    typography,
    breakpoints,
    animations,
    buttonVariants,
    cardVariants,
    darkMode
};