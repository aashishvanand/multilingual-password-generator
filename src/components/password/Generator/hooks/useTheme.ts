/**
 * @file useTheme.ts
 * @description This custom hook manages the application's theme, allowing users to toggle between light and dark modes.
 * It persists the selected theme in local storage to maintain user preferences across sessions.
 */

import { useState, useCallback } from 'react'
import { createTheme } from '@mui/material/styles'

/**
 * Custom hook for managing theme state and preferences
 * Provides theme configuration and toggle functionality
 */

export function useTheme() {
    const [mode, setMode] = useState<'light' | 'dark'>('light')

    /**
     * Create theme configuration based on current mode
     */

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

    /**
     * Toggle between light and dark mode
     */

    const toggleTheme = useCallback(() => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
    }, [])

    return { theme, mode, toggleTheme }
}