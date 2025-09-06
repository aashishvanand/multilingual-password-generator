/**
 * @file useTheme.ts
 * @description This custom hook manages the application's theme, including light and dark modes.
 * It allows toggling the theme and persists the user's preference in local storage.
 */

import { useState, useCallback } from 'react'
import { createTheme } from '@mui/material/styles'

export function useTheme() {
    const [mode, setMode] = useState<'light' | 'dark'>('light')

    const theme = createTheme({
        palette: {
            mode,
            primary: {
                main: '#1976d2',
            },
            background: {
                default: mode === 'light' ? '#1976d2' : '#000',
                paper: mode === 'light' ? '#fff' : '#121212',
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
    })

    const toggleTheme = useCallback(() => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
    }, [])

    return { theme, mode, toggleTheme }
}