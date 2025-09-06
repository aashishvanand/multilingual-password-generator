/**
 * @file ThemeToggle.tsx
 * @description This component provides a UI control for switching between light and dark themes.
 * It allows users to customize their interface according to their preference.
 */

import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

interface ThemeToggleProps {
    mode: 'light' | 'dark';
    onToggle: () => void;
}

const ThemeToggle = ({ mode, onToggle }: ThemeToggleProps) => {
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <IconButton
            onClick={onToggle}
            color="inherit"
            aria-label="toggle theme"
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                bgcolor: mode === 'light' ? 'grey.200' : 'grey.800',
                '&:hover': {
                    bgcolor: mode === 'light' ? 'grey.300' : 'grey.700',
                },
            }}
        >
            {mode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
    );
};

export default ThemeToggle;