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
                            control={<Checkbox checked={options.uppercase} onChange={onChange('uppercase')} />}
                            label="A-Z"
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={options.lowercase} onChange={onChange('lowercase')} />}
                            label="a-z"
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={options.numbers} onChange={onChange('numbers')} />}
                            label="0-9"
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={options.symbols} onChange={onChange('symbols')} />}
                            label="!@#$%^&*"
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                        />
                    </Stack>
                </FormGroup>

                {/* Indian Scripts Section */}
                <Typography variant="subtitle1" color="primary" fontWeight="medium" sx={{ mt: 3 }}>
                    Indian Scripts
                </Typography>
                <FormGroup>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                        {[
                            { key: 'bengali', label: 'Bengali' },
                            { key: 'gujarati', label: 'Gujarati' },
                            { key: 'hindi', label: 'Hindi' },
                            { key: 'kannada', label: 'Kannada' },
                            { key: 'malayalam', label: 'Malayalam' },
                            { key: 'manipuri', label: 'Manipuri' },
                            { key: 'odia', label: 'Odia' },
                            { key: 'punjabi', label: 'Punjabi' },
                            { key: 'santali', label: 'Santali' },
                            { key: 'tamil', label: 'Tamil' },
                            { key: 'telugu', label: 'Telugu' },
                            { key: 'urdu', label: 'Urdu' }
                        ].map(({ key, label }) => (
                            <FormControlLabel
                                key={key}
                                control={<Checkbox checked={options[key as keyof PasswordOptions]} onChange={onChange(key)} />}
                                label={label}
                                sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                            />
                        ))}
                    </Stack>
                </FormGroup>

                {/* International Scripts Section */}
                <Typography variant="subtitle1" color="primary" fontWeight="medium" sx={{ mt: 3 }}>
                    International Scripts
                </Typography>
                <FormGroup>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                        {[
                            { key: 'bulgarian', label: 'Bulgarian' },
                            { key: 'croatian', label: 'Croatian' },
                            { key: 'czech', label: 'Czech' },
                            { key: 'danish', label: 'Danish' },
                            { key: 'dutch', label: 'Dutch' },
                            { key: 'english', label: 'English' },
                            { key: 'estonian', label: 'Estonian' },
                            { key: 'french', label: 'French' },
                            { key: 'greek', label: 'Greek' },
                            { key: 'hungarian', label: 'Hungarian' },
                            { key: 'iranianPersian', label: 'Iranian Persian' },
                            { key: 'italian', label: 'Italian' },
                            { key: 'japanese', label: 'Japanese' },
                            { key: 'javanese', label: 'Javanese' },
                            { key: 'korean', label: 'Korean' },
                            { key: 'latvian', label: 'Latvian' },
                            { key: 'lithuanian', label: 'Lithuanian' },
                            { key: 'maltese', label: 'Maltese' },
                            { key: 'mandarin', label: 'Mandarin' },
                            { key: 'romanian', label: 'Romanian' },
                            { key: 'russian', label: 'Russian' },
                            { key: 'slovenian', label: 'Slovenian' },
                            { key: 'spanish', label: 'Spanish' },
                            { key: 'swedish', label: 'Swedish' },
                            { key: 'thai', label: 'Thai' },
                            { key: 'turkish', label: 'Turkish' },
                            { key: 'vietnamese', label: 'Vietnamese' },
                            { key: 'welsh', label: 'Welsh' }
                        ].map(({ key, label }) => (
                            <FormControlLabel
                                key={key}
                                control={<Checkbox checked={options[key as keyof PasswordOptions]} onChange={onChange(key)} />}
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