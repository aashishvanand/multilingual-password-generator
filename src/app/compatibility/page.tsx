/**
 * @file page.tsx
 * @description This file defines the compatibility page for the application.
 */

"use client";

import Link from 'next/link';
import { Box, Typography, Paper, Fab, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CompatibilityTable from '../../components/password/Generator/CompatibilityTable';
import { useTheme } from '@/components/ui/theme/ThemeProvider'; // Fixed import path

export default function CompatibilityPage() {
    const { mode, toggleTheme } = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                bgcolor: mode === 'light' ? 'primary.main' : 'common.black',
                minHeight: '100vh',
                transition: 'background-color 0.3s',
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    p: { xs: 2, sm: 4 },
                    bgcolor: 'background.paper',
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: '1200px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Link href="/" passHref>
                        <IconButton aria-label="back to main page">
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    <Typography variant="h4" component="h1" color="primary">
                        Platform Compatibility
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                    Here is a list of the top 100 websites based on Cloudflare Radar. We have compiled this list to show you which platforms are compatible with our password generator.
                </Typography>
                <CompatibilityTable />
                <Typography variant="caption" sx={{ display: 'block', mt: 3, color: 'text.secondary' }}>
                    * Data as of Sep 2025. The data is sourced from <Link href="https://radar.cloudflare.com/domains?dateRange=52w#top-100-internet-services" target="_blank" rel="noopener noreferrer">Cloudflare Radar</Link>.
                </Typography>
            </Paper>

            <Fab
                color="primary"
                aria-label="toggle theme"
                onClick={toggleTheme}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                }}
            >
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </Fab>
        </Box>
    );
}