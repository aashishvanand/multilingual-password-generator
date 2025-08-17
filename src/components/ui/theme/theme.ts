/**
 * Theme configuration for Material-UI
 * Defines light and dark mode themes
 */
import { createTheme } from '@mui/material'

export const theme = {
    light: createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#1976d2',
            },
            background: {
                default: '#1976d2',
                paper: '#fff',
            },
        },
        typography: {
            fontFamily: 'var(--font-geist-sans)',
            body1: {
                fontSize: '1rem',
                lineHeight: 1.5,
            },
            h4: {
                fontFamily: 'var(--font-geist-mono)',
                fontWeight: 600,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        textTransform: 'none',
                        padding: '12px 24px',
                        fontWeight: 500,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: '16px',
                    },
                },
            },
        },
    }),
    dark: createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
            background: {
                default: '#000',
                paper: '#121212',
            },
        },
        // Inherit the same component styles as light theme
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        textTransform: 'none',
                        padding: '12px 24px',
                        fontWeight: 500,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: '16px',
                    },
                },
            },
        },
    }),
}