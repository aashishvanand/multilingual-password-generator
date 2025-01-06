import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

const ThemeToggle = ({ mode, onToggle }) => {
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
            sx={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                color: mode === 'light' ? '#000' : '#fff',
                '&:hover': {
                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                }
            }
            }
        >
            {mode === 'light' ? <DarkMode sx={{ fontSize: 20 }} /> : <LightMode sx={{ fontSize: 20 }} />}
        </IconButton>
    );
};

export default ThemeToggle;