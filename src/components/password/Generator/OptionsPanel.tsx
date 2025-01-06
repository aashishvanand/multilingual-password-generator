import { Box, Typography, Slider, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material'
import LanguageSelector from '../LanguageSelector'
import type { PasswordOptions } from '@/types'

interface OptionsPanelProps {
    type: 'password' | 'passphrase'
    length: number
    wordCount: number
    options: PasswordOptions
    hasError: boolean
    onTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onLengthChange: (value: number) => void
    onWordCountChange: (value: number) => void
    onOptionsChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function OptionsPanel({
    type,
    length,
    wordCount,
    options,
    hasError,
    onTypeChange,
    onLengthChange,
    onWordCountChange,
    onOptionsChange,
}: OptionsPanelProps) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Generation Options
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, mb: 4 }}>
                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Type
                    </Typography>
                    <RadioGroup row value={type} onChange={onTypeChange}>
                        <FormControlLabel value="password" control={<Radio />} label="Password" />
                        <FormControlLabel value="passphrase" control={<Radio />} label="Passphrase" />
                    </RadioGroup>
                </Box>

                <Box>
                    {type === 'password' ? (
                        <>
                            <Typography gutterBottom>
                                Characters: {length}
                            </Typography>
                            <Slider
                                value={length}
                                onChange={(_, value) => onLengthChange(value as number)}
                                min={8}
                                max={128}
                                marks={[
                                    { value: 8, label: '8' },
                                    { value: 32, label: '32' },
                                    { value: 64, label: '64' },
                                    { value: 128, label: '128' },
                                ]}
                                valueLabelDisplay="auto"
                            />
                        </>
                    ) : (
                        <>
                            <Typography gutterBottom>
                                Number of Words: {wordCount}
                            </Typography>
                            <Slider
                                value={wordCount}
                                onChange={(_, value) => onWordCountChange(value as number)}
                                min={3}
                                max={8}
                                marks={[
                                    { value: 3, label: '3' },
                                    { value: 5, label: '5' },
                                    { value: 8, label: '8' },
                                ]}
                                valueLabelDisplay="auto"
                            />
                        </>
                    )}
                </Box>
            </Box>

            {hasError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Please select at least one {type === 'password' ? 'character set' : 'language'} option
                </Alert>
            )}

            <LanguageSelector
                options={options}
                onChange={onOptionsChange}
                type={type}
            />
        </Box>
    )
}