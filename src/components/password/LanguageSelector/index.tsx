import { Box, FormGroup, Stack, FormControlLabel, Checkbox, Typography } from '@mui/material'
import type { PasswordOptions, LanguageCode } from '@/types'
import { SUPPORTED_LANGUAGES } from '@/lib/utils/constants'

/**
 * Component for selecting character sets and languages
 * Handles both password and passphrase mode options
 */

interface LanguageSelectorProps {
    options: PasswordOptions
    onChange: (name: LanguageCode) => (event: React.ChangeEvent<HTMLInputElement>) => void
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
                        {SUPPORTED_LANGUAGES.INDIAN.map(({ code, label }) => (
                            <FormControlLabel
                                key={code}
                                control={<Checkbox checked={options[code]} onChange={onChange(code)} />}
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
                        {SUPPORTED_LANGUAGES.INTERNATIONAL.map(({ code, label }) => (
                            <FormControlLabel
                                key={code}
                                control={<Checkbox checked={options[code]} onChange={onChange(code)} />}
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
                    {SUPPORTED_LANGUAGES.PASSPHRASE.map(({ code, label }) => (
                        <FormControlLabel
                            key={code}
                            control={<Checkbox checked={options[code]} onChange={onChange(code)} />}
                            label={label}
                            sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'inherit' }}
                        />
                    ))}
                </Stack>
            </FormGroup>
        </Box>
    )
}