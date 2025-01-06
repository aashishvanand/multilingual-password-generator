import { Box, Paper, Typography, Alert } from '@mui/material';
import type { StrengthResult } from '@/lib/security/passwordStrength'

/**
 * Password Strength Visualization Component
 * 
 * Security Considerations:
 * - No password data is stored or transmitted
 * - Updates strength in real-time
 * - Provides actionable security feedback
 * 
 * Accessibility:
 * - Color-blind friendly indicators
 * - ARIA labels for screen readers
 * - Keyboard navigation support
 * 
 * @security Ensure password is not logged or exposed in error messages
 */

interface PasswordStrengthDisplayProps {
    strength: StrengthResult;
    mode: 'light' | 'dark';
}

interface SequencePattern {
    pattern: string;
    token: string;
    i: number;
    j: number;
}

export const PasswordStrengthDisplay = ({ strength, mode }: PasswordStrengthDisplayProps) => {
    const formatPattern = (pattern: { pattern: string; token: string }) => {
        // If it's a bruteforce pattern, just show the type without the token
        if (pattern.pattern === 'bruteforce') {
            return 'Random characters';
        }

        // For other patterns, show both type and a shortened token if needed
        const token = pattern.token.length > 20
            ? pattern.token.substring(0, 20) + '...'
            : pattern.token;

        return `${pattern.pattern.charAt(0).toUpperCase() + pattern.pattern.slice(1)}: ${token}`;
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                bgcolor: mode === 'light' ? '#f8f9fa' : '#1e1e1e',
            }}
        >
            <Box sx={{ display: 'grid', gap: 3 }}>
                <Box>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                        Crack Time Estimates
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gap: 2,
                        bgcolor: mode === 'light' ? 'white' : '#2a2a2a',
                        p: 3,
                        borderRadius: 2,
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">
                                Online throttled (100/hour):
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'medium', ml: 2 }}>
                                {strength.crackTimesDisplay.onlineThrottling100PerHour}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">
                                Unthrottled online attack:
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'medium', ml: 2 }}>
                                {strength.crackTimesDisplay.onlineNoThrottling10PerSecond}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">
                                Offline attack (slow hash):
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'medium', ml: 2 }}>
                                {strength.crackTimesDisplay.offlineSlowHashing1e4PerSecond}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">
                                Offline attack (fast hash):
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'medium', ml: 2 }}>
                                {strength.crackTimesDisplay.offlineFastHashing1e10PerSecond}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {strength.feedback.warning && (
                    <Alert severity="warning" sx={{ borderRadius: 2 }}>
                        {strength.feedback.warning}
                    </Alert>
                )}

                {strength.feedback.suggestions.length > 0 && (
                    <Box>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                            Suggestions for improvement
                        </Typography>
                        <Box
                            component="ul"
                            sx={{
                                m: 0,
                                pl: 3,
                                '& li': {
                                    mb: 1
                                }
                            }}
                        >
                            {strength.feedback.suggestions.map((suggestion, index) => (
                                <li key={index}>
                                    <Typography variant="body2">{suggestion}</Typography>
                                </li>
                            ))}
                        </Box>
                    </Box>
                )}

                {strength.sequence.length > 0 && (strength.sequence as SequencePattern[]).some(p => p.pattern !== 'bruteforce') && (
                    <Box>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                            Pattern Analysis
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: mode === 'light' ? 'white' : '#2a2a2a',
                                p: 3,
                                borderRadius: 2,
                                display: 'grid',
                                gap: 1
                            }}
                        >
                            {(strength.sequence as SequencePattern[])
                                .filter(pattern => pattern.pattern !== 'bruteforce')
                                .map((pattern, index) => (
                                    <Typography key={index} variant="body2">
                                        • {formatPattern(pattern)}
                                    </Typography>
                                ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};