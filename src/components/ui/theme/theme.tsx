/**
 * @file src/components/ui/theme/theme.tsx
 * @description This file defines the theme configuration and provides a ThemeProvider
 * for the application, enabling light and dark mode toggling with persistence
 * using localStorage.
 */

"use client";

import { createContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Defines the color palettes for light and dark modes.
const lightPalette = {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
};

const darkPalette = {
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff', secondary: '#b0bec5' },
};

/**
 * Creates a MUI theme based on the selected mode.
 * @param {PaletteMode} mode - The palette mode ('light' or 'dark').
 * @returns {Theme} The generated MUI theme.
 */
export const getTheme = (mode: PaletteMode): Theme => createTheme({
    palette: {
        mode,
        ...(mode === 'light' ? lightPalette : darkPalette),
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
});

/**
 * Context for providing theme-related values and functions to the component tree.
 */
export const ThemeContext = createContext({
    toggleTheme: () => { },
    mode: 'light' as PaletteMode,
});

/**
 * Provides the theme to its children components and manages the theme state,
 * persisting the selected mode to localStorage.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to render.
 */
const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<PaletteMode>('light');

    // On initial mount, read the theme from localStorage or system preference.
    useEffect(() => {
        try {
            const savedMode = localStorage.getItem('theme-mode') as PaletteMode;
            if (savedMode) {
                setMode(savedMode);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setMode('dark');
            }
        } catch {
            // If localStorage is not available, default to light mode.
            console.error("Could not access local storage for theme persistence.");
        }
    }, []);

    // Toggles the theme between 'light' and 'dark' and saves it to localStorage.
    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem('theme-mode', newMode);
            } catch {
                // Fails silently if localStorage is not available.
                console.error("Could not access local storage for theme persistence.");
            }
            return newMode;
        });
    };

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;