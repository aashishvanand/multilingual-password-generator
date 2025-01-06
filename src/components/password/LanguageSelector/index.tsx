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
}

export default function LanguageSelector({ options, onChange, type }: LanguageSelectorProps) {
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
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.lowercase}
                                    onChange={onChange('lowercase')}
                                />
                            }
                            label="a-z"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.numbers}
                                    onChange={onChange('numbers')}
                                />
                            }
                            label="0-9"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.symbols}
                                    onChange={onChange('symbols')}
                                />
                            }
                            label="!@#$%^&*"
                        />
                    </Stack>
                </FormGroup>

                {/* Script Sections */}
                <Typography variant="subtitle1" color="primary" fontWeight="medium" className="mt-6">
                    Indian Scripts
                </Typography>
                <FormGroup>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.hindi}
                                    onChange={onChange('hindi')}
                                />
                            }
                            label="Hindi"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.tamil}
                                    onChange={onChange('tamil')}
                                />
                            }
                            label="Tamil"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.telugu}
                                    onChange={onChange('telugu')}
                                />
                            }
                            label="Telugu"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.bengali}
                                    onChange={onChange('bengali')}
                                />
                            }
                            label="Bengali"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.gujarati}
                                    onChange={onChange('gujarati')}
                                />
                            }
                            label="Gujarati"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.kannada}
                                    onChange={onChange('kannada')}
                                />
                            }
                            label="Kannada"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.malayalam}
                                    onChange={onChange('malayalam')}
                                />
                            }
                            label="Malayalam"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.odia}
                                    onChange={onChange('odia')}
                                />
                            }
                            label="Odia"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.punjabi}
                                    onChange={onChange('punjabi')}
                                />
                            }
                            label="Punjabi"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.urdu}
                                    onChange={onChange('urdu')}
                                />
                            }
                            label="Urdu"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.santali}
                                    onChange={onChange('santali')}
                                />
                            }
                            label="Santali"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.manipuri}
                                    onChange={onChange('manipuri')}
                                />
                            }
                            label="Manipuri"
                        />
                    </Stack>
                </FormGroup>

                <Typography variant="subtitle1" color="primary" fontWeight="medium" className="mt-6">
                    International Scripts
                </Typography>
                <FormGroup>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.mandarin}
                                    onChange={onChange('mandarin')}
                                />
                            }
                            label="Mandarin"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.spanish}
                                    onChange={onChange('spanish')}
                                />
                            }
                            label="Spanish"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.russian}
                                    onChange={onChange('russian')}
                                />
                            }
                            label="Russian"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.japanese}
                                    onChange={onChange('japanese')}
                                />
                            }
                            label="Japanese"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.vietnamese}
                                    onChange={onChange('vietnamese')}
                                />
                            }
                            label="Vietnamese"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.turkish}
                                    onChange={onChange('turkish')}
                                />
                            }
                            label="Turkish"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.korean}
                                    onChange={onChange('korean')}
                                />
                            }
                            label="Korean"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.french}
                                    onChange={onChange('french')}
                                />
                            }
                            label="French"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.italian}
                                    onChange={onChange('italian')}
                                />
                            }
                            label="Italian"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.iranianPersian}
                                    onChange={onChange('iranianPersian')}
                                />
                            }
                            label="Iranian Persian"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={options.javanese}
                                    onChange={onChange('javanese')}
                                />
                            }
                            label="Javanese"
                        />
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
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={options.hindi}
                                onChange={onChange('hindi')}
                            />
                        }
                        label="Hindi"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={options.tamil}
                                onChange={onChange('tamil')}
                            />
                        }
                        label="Tamil"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={options.telugu}
                                onChange={onChange('telugu')}
                            />
                        }
                        label="Telugu"
                    />
                </Stack>
            </FormGroup>
        </Box>
    )
}