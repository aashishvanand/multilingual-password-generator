/**
 * @file PasswordAnalysis.tsx
 * @description A component that displays a detailed analysis of the password's strength,
 * including crack time estimations, feedback, and whether it has been compromised in a known data breach.
 */


import React from 'react';
import { Box, Typography, Chip, Alert, Paper, LinearProgress } from '@mui/material';
import { Security, Warning, CheckCircle, Error } from '@mui/icons-material';
import { StrengthResult } from '@/lib/security/passwordStrength';

interface PasswordAnalysisProps {
    strength: StrengthResult | null;
    isCompromised: boolean;
    mode: 'light' | 'dark';
}

export function PasswordAnalysis({ strength, isCompromised, mode }: PasswordAnalysisProps) {
    if (!strength) {
        return (
            <Paper
                elevation={0}
                sx={{
                    mt: 3,
                    p: 3,
                    bgcolor: mode === 'light' ? '#f5f7fa' : '#1e1e1e',
                    borderRadius: 3,
                    border: mode === 'light' ? '1px solid #e0e7ff' : '1px solid #374151'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Security color="disabled" />
                    <Typography variant="body1" color="text.secondary">
                        Enter a password to see strength analysis
                    </Typography>
                </Box>
            </Paper>
        );
    }

    const getStrengthLabel = (score: number) => {
        switch (score) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return 'Unknown';
        }
    };

    const getStrengthColor = (score: number) => {
        if (score <= 1) return 'error';
        if (score === 2) return 'warning';
        if (score === 3) return 'info';
        return 'success';
    };

    const getStrengthIcon = (score: number) => {
        if (score <= 1) return <Error color="error" />;
        if (score === 2) return <Warning color="warning" />;
        if (score >= 3) return <CheckCircle color="success" />;
        return <Security />;
    };

    const getProgressValue = (score: number) => (score / 4) * 100;

    return (
        <Paper
            elevation={0}
            sx={{
                mt: 3,
                p: 3,
                bgcolor: mode === 'light' ? '#f5f7fa' : '#1e1e1e',
                borderRadius: 3,
                border: mode === 'light' ? '1px solid #e0e7ff' : '1px solid #374151'
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Security color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Password Strength Analysis
                </Typography>
            </Box>

            {/* Compromise Warning */}
            {isCompromised && (
                <Alert
                    severity="error"
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                        '& .MuiAlert-icon': { alignItems: 'center' }
                    }}
                >
                    This password has been found in data breaches. Choose a different password.
                </Alert>
            )}

            {/* Main Strength Display */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    {getStrengthIcon(strength.score)}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {getStrengthLabel(strength.score)}
                            </Typography>
                            <Chip
                                label={`${strength.score}/4`}
                                color={getStrengthColor(strength.score)}
                                size="small"
                                sx={{ fontWeight: 600 }}
                            />
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={getProgressValue(strength.score)}
                            color={getStrengthColor(strength.score)}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: mode === 'light' ? '#e5e7eb' : '#374151'
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Custom Wordlist Analysis */}
            {strength.customAnalysis && strength.customAnalysis.usesCustomWordlists && (
                <Box sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: mode === 'light' ? '#eff6ff' : '#1e293b',
                    borderRadius: 2,
                    border: mode === 'light' ? '1px solid #bfdbfe' : '1px solid #334155'
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Custom Dictionary Analysis
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Analyzed using {strength.customAnalysis.totalCustomWords.toLocaleString()} words
                        from {strength.customAnalysis.loadedLanguages.length} language(s): {' '}
                        <Box component="span" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {strength.customAnalysis.loadedLanguages.join(', ')}
                        </Box>
                    </Typography>

                    {strength.customAnalysis.foundInCustomDictionary && (
                        <Alert
                            severity="warning"
                            sx={{
                                mt: 1,
                                py: 0.5,
                                '& .MuiAlert-message': { fontSize: '0.875rem' }
                            }}
                        >
                            Contains words from custom dictionaries
                        </Alert>
                    )}
                </Box>
            )}

            {/* Feedback Section */}
            {(strength.feedback.warning || strength.feedback.suggestions.length > 0) && (
                <Box sx={{ mb: 3 }}>
                    {strength.feedback.warning && (
                        <Alert
                            severity="warning"
                            sx={{
                                mb: 2,
                                borderRadius: 2
                            }}
                        >
                            {strength.feedback.warning}
                        </Alert>
                    )}

                    {strength.feedback.suggestions.length > 0 && (
                        <Box sx={{
                            p: 2,
                            bgcolor: mode === 'light' ? '#fefce8' : '#292524',
                            borderRadius: 2,
                            border: mode === 'light' ? '1px solid #fde047' : '1px solid #57534e'
                        }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                Suggestions to improve:
                            </Typography>
                            <Box component="ul" sx={{ m: 0, pl: 2 }}>
                                {strength.feedback.suggestions.map((suggestion, index) => (
                                    <Box component="li" key={index} sx={{ mb: 0.5 }}>
                                        <Typography variant="body2">
                                            {suggestion}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            )}

            {/* Crack Time Estimates */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mb: 2
            }}>
                <Box sx={{
                    p: 2,
                    bgcolor: mode === 'light' ? '#f0f9ff' : '#0c1629',
                    borderRadius: 2,
                    border: mode === 'light' ? '1px solid #bae6fd' : '1px solid #1e3a8a'
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Online Attack (throttled)
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {strength.crackTimesDisplay.onlineThrottling100PerHour}
                    </Typography>
                </Box>

                <Box sx={{
                    p: 2,
                    bgcolor: mode === 'light' ? '#fef2f2' : '#2d1b1b',
                    borderRadius: 2,
                    border: mode === 'light' ? '1px solid #fecaca' : '1px solid #7f1d1d'
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Offline Attack (slow hash)
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {strength.crackTimesDisplay.offlineSlowHashing1e4PerSecond}
                    </Typography>
                </Box>
            </Box>

            {/* Analysis Details */}
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textAlign: 'center' }}>
                Pattern analysis: {strength.sequence.map(seq => seq.pattern).join(', ')} •
                Completed in {strength.calcTime}ms
            </Typography>
        </Paper>
    );
}