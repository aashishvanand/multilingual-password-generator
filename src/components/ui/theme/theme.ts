/**
 * Material-UI theme configuration
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
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        textTransform: 'none',
                        padding: '12px 24px',
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
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        textTransform: 'none',
                        padding: '12px 24px',
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