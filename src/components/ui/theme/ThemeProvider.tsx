/**
 * @file src/components/ui/theme/ThemeProvider.tsx
 * @description This file defines the theme configuration and provides a ThemeProvider
 * for the application, enabling light and dark mode toggling with persistence
 * using localStorage.
 */

"use client";

import { createContext, useState, useMemo, ReactNode, useEffect, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Enhanced color palettes
const lightPalette = {
    primary: { 
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#ffffff'
    },
    secondary: { 
        main: '#dc004e',
        light: '#f06292',
        dark: '#c51162',
        contrastText: '#ffffff'
    },
    background: { 
        default: '#f4f6f8', 
        paper: '#ffffff' 
    },
    text: {
        primary: '#212121',
        secondary: '#757575',
    },
};

const darkPalette = {
    primary: { 
        main: '#90caf9',
        light: '#e3f2fd',
        dark: '#42a5f5',
        contrastText: '#000000'
    },
    secondary: { 
        main: '#f48fb1',
        light: '#f8bbd9',
        dark: '#f06292',
        contrastText: '#000000'
    },
    background: { 
        default: '#121212', 
        paper: '#1e1e1e' 
    },
    text: { 
        primary: '#ffffff', 
        secondary: '#b0bec5' 
    },
};

/**
 * Creates a MUI theme based on the selected mode.
 */
export const getTheme = (mode: PaletteMode): Theme => createTheme({
    palette: {
        mode,
        ...(mode === 'light' ? lightPalette : darkPalette),
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '10px 20px',
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
});

/**
 * Context for theme values
 */
export const ThemeContext = createContext<{
    toggleTheme: () => void;
    mode: PaletteMode;
    theme: Theme;
}>({
    toggleTheme: () => { },
    mode: 'light',
    theme: getTheme('light'),
});

/**
 * Custom hook to use theme context
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

/**
 * Theme provider component
 */
const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<PaletteMode>('light');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const savedMode = localStorage.getItem('theme-mode') as PaletteMode;
            if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
                setMode(savedMode);
            } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
                setMode('dark');
            }
        } catch (error) {
            console.warn('Could not access localStorage for theme persistence:', error);
        }
        setIsHydrated(true);
    }, []);

    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem('theme-mode', newMode);
            } catch (error) {
                console.warn('Could not save theme preference to localStorage:', error);
            }
            return newMode;
        });
    };

    const theme = useMemo(() => getTheme(mode), [mode]);

    if (!isHydrated) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode, theme }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;