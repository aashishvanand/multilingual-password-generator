import { Stack, Button } from '@mui/material'
import { ContentCopy, Refresh, Check } from '@mui/icons-material'

/**
 * Control buttons component for password actions
 * Provides copy to clipboard and regenerate functionality
 */

interface ControlButtonsProps {
    copied: boolean;
    onCopy: () => void;
    onGenerate: () => void;
    mode: 'light' | 'dark';
}

export function ControlButtons({ copied, onCopy, onGenerate, mode }: ControlButtonsProps) {
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
        </Stack>
    );
}