/**
 * @file page.tsx
 * @description This file defines the compatibility page for the application.
 * It renders the `CompatibilityTable` component, which displays a list of platforms
 * and their compatibility with the password generator. The page also provides context
 * about the data source and allows users to see which of the top 100 websites are supported.
 */

"use client";

import { Box, Typography, Paper, Link } from '@mui/material';
import CompatibilityTable from '../../components/password/Generator/CompatibilityTable';
import { useTheme } from '@/components/ui/theme/hooks/useTheme';

export default function CompatibilityPage() {
    const { mode } = useTheme();

    return (
        <Box
            sx={{
                p: 4,
                bgcolor: mode === 'light' ? 'white' : 'black',
                minHeight: '100vh',
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    bgcolor: 'transparent',
                    borderRadius: 4,
                }}
            >
                <Typography variant="h4" gutterBottom color="primary">
                    Platform Compatibility
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: mode === 'light' ? 'text.secondary' : 'text.disabled' }}>
                    Here is a list of the top 100 websites based on Cloudflare Radar. We have compiled this list to show you which platforms are compatible with our password generator.
                </Typography>
                <CompatibilityTable mode={mode} />
                <Typography variant="caption" sx={{ display: 'block', mt: 3, color: 'text.secondary' }}>
                    * Data as of Sep 2025. The data is sourced from <Link href="https://radar.cloudflare.com/domains?dateRange=52w#top-100-internet-services" target="_blank" rel="noopener noreferrer">Cloudflare Radar</Link>.
                </Typography>
            </Paper>
        </Box>
    );
}