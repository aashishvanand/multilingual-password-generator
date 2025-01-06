import { Box, FormGroup, Stack, FormControlLabel, Checkbox, Typography } from '@mui/material'
import type { PasswordOptions } from '@/types'

/**
 * Component for selecting character sets and languages
 * Handles both password and passphrase mode options
 */

interface LanguageSelectorProps {
    options: PasswordOptions
    onChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
    type: 'password' | 'passphrase'
    mode: 'light' | 'dark'
}

export default function LanguageSelector({ options, onChange, type, mode }: LanguageSelectorProps) {
    // Render different sets of options based on the generation type
    if (type === 'password') {
        return (
            <Box>
                {/* Character Sets Section */}
                <Typography variant="subtitle1" color="primary" fontWeight="medium">
                    Character Sets
                </Typography>
                <FormGroup>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.uppercase}
                                    onChange={onChange('uppercase')}
                                />
                            }
                            label="A-Z"
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.lowercase}
                                    onChange={onChange('lowercase')}
                                />
                            }
                            label="a-z"
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.numbers}
                                    onChange={onChange('numbers')}
                                />
                            }
                            label="0-9"
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.symbols}
                                    onChange={onChange('symbols')}
                                />
                            }
                            label="!@#$%^&*"
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                        />
                    </Stack>
                </FormGroup>

                {/* Script Sections */}
                <Typography variant="subtitle1" color="primary" fontWeight="medium" sx={{ mt: 3 }}>
                    Indian Scripts
                </Typography>
                <FormGroup>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                        {[
                            { key: 'hindi', label: 'Hindi' },
                            { key: 'tamil', label: 'Tamil' },
                            { key: 'telugu', label: 'Telugu' },
                            { key: 'bengali', label: 'Bengali' },
                            { key: 'gujarati', label: 'Gujarati' },
                            { key: 'kannada', label: 'Kannada' },
                            { key: 'malayalam', label: 'Malayalam' },
                            { key: 'odia', label: 'Odia' },
                            { key: 'punjabi', label: 'Punjabi' },
                            { key: 'urdu', label: 'Urdu' },
                            { key: 'santali', label: 'Santali' },
                            { key: 'manipuri', label: 'Manipuri' }
                        ].map(({ key, label }) => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={options[key as keyof PasswordOptions]}
                                        onChange={onChange(key)}
                                    />
                                }
                                label={label}
                                sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                            />
                        ))}
                    </Stack>
                </FormGroup>

                <Typography variant="subtitle1" color="primary" fontWeight="medium" sx={{ mt: 3 }}>
                    International Scripts
                </Typography>
                <FormGroup>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                        {[
                            { key: 'english', label: 'English' },
                            { key: 'mandarin', label: 'Mandarin' },
                            { key: 'spanish', label: 'Spanish' },
                            { key: 'russian', label: 'Russian' },
                            { key: 'japanese', label: 'Japanese' },
                            { key: 'vietnamese', label: 'Vietnamese' },
                            { key: 'turkish', label: 'Turkish' },
                            { key: 'korean', label: 'Korean' },
                            { key: 'french', label: 'French' },
                            { key: 'italian', label: 'Italian' },
                            { key: 'iranianPersian', label: 'Iranian Persian' },
                            { key: 'javanese', label: 'Javanese' }
                        ].map(({ key, label }) => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={options[key as keyof PasswordOptions]}
                                        onChange={onChange(key)}
                                    />
                                }
                                label={label}
                                sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                            />
                        ))}
                    </Stack>
                </FormGroup>
            </Box>
        )
    }

    // Passphrase language selection
    return (
        <Box>
            <Typography variant="subtitle1" color="primary" fontWeight="medium">
                Languages
            </Typography>
            <FormGroup>
                <Stack direction="row" flexWrap="wrap" gap={2}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={options.english}
                                onChange={onChange('english')}
                            />
                        }
                        label="English"
                        sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={options.hindi}
                                onChange={onChange('hindi')}
                            />
                        }
                        label="Hindi"
                        sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={options.tamil}
                                onChange={onChange('tamil')}
                            />
                        }
                        label="Tamil"
                        sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={options.telugu}
                                onChange={onChange('telugu')}
                            />
                        }
                        label="Telugu"
                        sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                    />
                </Stack>
            </FormGroup>
        </Box>
    )
}