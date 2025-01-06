import { Box, Typography, LinearProgress } from '@mui/material'
import { usePasswordStrength } from '@/lib/security/passwordStrength'

interface StrengthMeterProps {
    password: string
    mode: 'light' | 'dark'
}

export function StrengthMeter({ password, mode }: StrengthMeterProps) {
    const strengthResult = usePasswordStrength(password)

    const getStrengthColor = (score: number) => {
        switch (score) {
            case 0: return '#ff4444'
            case 1: return '#ffbb33'
            case 2: return '#ffbb33'
            case 3: return '#00C851'
            case 4: return '#007E33'
            default: return '#ff4444'
        }
    }

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="textSecondary">
                    Password Strength
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: getStrengthColor(strengthResult.score) }}
                >
                    {['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][strengthResult.score]}
                </Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={(strengthResult.score + 1) * 20}
                sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                        bgcolor: getStrengthColor(strengthResult.score),
                        borderRadius: 4,
                    },
                }}
            />
        </Box>
    )
}