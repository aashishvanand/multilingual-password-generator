import { Box, Paper, Typography, Divider, Tooltip, IconButton, LinearProgress, Alert } from '@mui/material';
import { InfoOutlined, WarningAmber } from '@mui/icons-material';
import type { StrengthResult } from '@/lib/security/passwordStrength';

interface PasswordAnalysisProps {
    password: string;
    strength: StrengthResult;
    isCompromised: boolean;
    mode: 'light' | 'dark';
}

const strengthLevels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
const strengthColors = ['#ff4444', '#ffbb33', '#ffbb33', '#00C851', '#007E33'];

const getStrengthColor = (score: number) => strengthColors[score] || '#ff4444';
const getStrengthText = (score: number) => strengthLevels[score] || 'Unknown';

const InfoTooltip = ({ title }: { title: string }) => (
    <Tooltip title={title}>
        <IconButton size="small" sx={{ ml: 0.5 }}>
            <InfoOutlined fontSize="inherit" />
        </IconButton>
    </Tooltip>
);

export const PasswordAnalysis = ({ password, strength, isCompromised, mode }: PasswordAnalysisProps) => {
    const score = strength.score;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                bgcolor: mode === 'light' ? '#f8f9fa' : '#1e1e1e',
                borderRadius: 4,
                mt: 4,
            }}
        >
            <Typography variant="h6" gutterBottom color="primary">
                Password Analysis
            </Typography>

            {/* Display breach warning at the top if compromised */}
            {isCompromised && (
                <Alert severity="error" icon={<WarningAmber />} sx={{ mb: 2 }}>
                    This password has been exposed in a data breach. It is strongly recommended not to use it.
                </Alert>
            )}

            {/* Strength Meter */}
            <Box sx={{ width: '100%', mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                        Password Strength
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: getStrengthColor(score) }}
                    >
                        {getStrengthText(score)}
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={(score + 1) * 20}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                        '& .MuiLinearProgress-bar': {
                            bgcolor: getStrengthColor(score),
                            borderRadius: 4,
                        },
                    }}
                />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'grid', gap: 1 }}>
                <Typography variant="body1">
                    <strong>Password:</strong> {password}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">
                        <strong>Guesses Log10:</strong> {strength.guessesLog10.toFixed(2)}
                    </Typography>
                    <InfoTooltip title="The estimated number of guesses needed to crack your password, on a logarithmic scale. Higher is better." />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">
                        <strong>Score:</strong> {score} / 4
                    </Typography>
                    <InfoTooltip title="A score from 0 to 4 representing the password's overall strength." />
                </Box>
                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">
                       <strong>Function Runtime (ms):</strong> {strength.calcTime}
                    </Typography>
                    <InfoTooltip title="The time in milliseconds it took to analyze the password." />
                </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom color="primary">
                Crack Time Estimates
                <InfoTooltip title="Estimated time to crack the password under different attack scenarios." />
            </Typography>
            <Box sx={{ pl: 2 }}>
                <Typography variant="body2">
                    <strong>Online (throttled):</strong> {strength.crackTimesDisplay.onlineThrottling100PerHour}
                </Typography>
                <Typography variant="body2">
                    <strong>Online (unthrottled):</strong> {strength.crackTimesDisplay.onlineNoThrottling10PerSecond}
                </Typography>
                <Typography variant="body2">
                    <strong>Offline (slow hash):</strong> {strength.crackTimesDisplay.offlineSlowHashing1e4PerSecond}
                </Typography>
                <Typography variant="body2">
                    <strong>Offline (fast hash):</strong> {strength.crackTimesDisplay.offlineFastHashing1e10PerSecond}
                </Typography>
            </Box>
            
            {strength.feedback.warning && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom color="error">
                        Warning
                    </Typography>
                    <Typography variant="body2" color="error">
                        {strength.feedback.warning}
                    </Typography>
                </>
            )}

            {strength.feedback.suggestions.length > 0 && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom color="primary">
                        Suggestions
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {strength.feedback.suggestions.map((suggestion, index) => (
                            <li key={index}>
                                <Typography variant="body2">{suggestion}</Typography>
                            </li>
                        ))}
                    </Box>
                </>
            )}
        </Paper>
    );
};