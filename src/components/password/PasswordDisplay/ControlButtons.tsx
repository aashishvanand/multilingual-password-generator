import { Stack, Button } from '@mui/material'
import { ContentCopy, Refresh, Check, Analytics } from '@mui/icons-material'

/**
 * Control buttons component for password actions
 * Provides copy to clipboard, regenerate, and analyze functionality
 */

interface ControlButtonsProps {
    copied: boolean;
    onCopy: () => void;
    onGenerate: () => void;
    onAnalyze: () => void;
    mode: 'light' | 'dark';
}

export function ControlButtons({ copied, onCopy, onGenerate, onAnalyze, mode }: ControlButtonsProps) {
    return (
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Button
                variant="contained"
                startIcon={copied ? <Check /> : <ContentCopy />}
                onClick={onCopy}
                fullWidth
                sx={{
                    bgcolor: mode === 'light' ? '#000032' : '#1976d2',
                    color: '#fff',
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                        bgcolor: mode === 'light' ? '#000050' : '#1565c0'
                    }
                }}
            >
                Copy to Clipboard
            </Button>
            <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={onGenerate}
                fullWidth
                sx={{
                    bgcolor: mode === 'light' ? '#1976d2' : '#2196f3',
                    color: '#fff',
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                        bgcolor: mode === 'light' ? '#1565c0' : '#1976d2'
                    }
                }}
            >
                Regenerate
            </Button>
            <Button
                variant="outlined"
                startIcon={<Analytics />}
                onClick={onAnalyze}
                fullWidth
                sx={{
                    color: mode === 'light' ? '#000032' : '#fff',
                    borderColor: mode === 'light' ? '#000032' : '#fff',
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                        bgcolor: mode === 'light' ? 'rgba(0, 0, 50, 0.08)' : 'rgba(255, 255, 255, 0.08)',
                        borderColor: mode === 'light' ? '#000050' : '#fff'
                    }
                }}
            >
                Analyze my password
            </Button>
        </Stack>
    );
}