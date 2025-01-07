import { Box, Typography, Slider, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material'
import LanguageSelector from '../LanguageSelector'
import type { PasswordOptions } from '@/types'
import { useCallback, useState, useEffect, useRef } from 'react'

interface OptionsPanelProps {
    type: 'password' | 'passphrase'
    length: number
    wordCount: number
    options: PasswordOptions
    hasError: boolean
    mode: 'light' | 'dark'
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
    mode,
    onTypeChange,
    onLengthChange,
    onWordCountChange,
    onOptionsChange,
}: OptionsPanelProps) {
    // Local state for slider values
    const [localLength, setLocalLength] = useState(length);
    const [localWordCount, setLocalWordCount] = useState(wordCount);
    const isDraggingRef = useRef(false);

    // Sync local state with props when not dragging
    useEffect(() => {
        if (!isDraggingRef.current) {
            setLocalLength(length);
            setLocalWordCount(wordCount);
        }
    }, [length, wordCount]);

    // Length slider handlers
    const handleLengthChange = useCallback(
        (_event: Event | React.SyntheticEvent<Element, Event>, 
         newValue: number | number[]
        ) => {
            const value = Array.isArray(newValue) ? newValue[0] : newValue;
            setLocalLength(value);
            isDraggingRef.current = true;
        },
        []
    );

    const handleLengthChangeCommitted = useCallback(
        (_event: React.SyntheticEvent | Event, 
         newValue: number | number[]
        ) => {
            const value = Array.isArray(newValue) ? newValue[0] : newValue;
            isDraggingRef.current = false;
            onLengthChange(value);
        },
        [onLengthChange]
    );

    // Word count slider handlers
    const handleWordCountChange = useCallback(
        (_event: Event | React.SyntheticEvent<Element, Event>, 
         newValue: number | number[]
        ) => {
            const value = Array.isArray(newValue) ? newValue[0] : newValue;
            setLocalWordCount(value);
            isDraggingRef.current = true;
        },
        []
    );

    const handleWordCountChangeCommitted = useCallback(
        (_event: React.SyntheticEvent | Event, 
         newValue: number | number[]
        ) => {
            const value = Array.isArray(newValue) ? newValue[0] : newValue;
            isDraggingRef.current = false;
            onWordCountChange(value);
        },
        [onWordCountChange]
    );

    const handleTypeChangeWithCheck = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isDraggingRef.current) {
                onTypeChange(e);
            }
        },
        [onTypeChange]
    );

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
                    <RadioGroup row value={type} onChange={handleTypeChangeWithCheck}>
                        <FormControlLabel value="password" control={<Radio />} label="Password" />
                        <FormControlLabel value="passphrase" control={<Radio />} label="Passphrase" />
                    </RadioGroup>
                </Box>

                <Box>
                    {type === 'password' ? (
                        <Box sx={{ minHeight: 80 }}>
                            <Typography gutterBottom>
                                Characters: {Math.round(localLength)}
                            </Typography>
                            <Slider
                                value={localLength}
                                onChange={handleLengthChange}
                                onChangeCommitted={handleLengthChangeCommitted}
                                min={8}
                                max={128}
                                marks={[
                                    { value: 8, label: '8' },
                                    { value: 32, label: '32' },
                                    { value: 64, label: '64' },
                                    { value: 128, label: '128' }
                                ]}
                                sx={{
                                    mt: 2,
                                    '& .MuiSlider-thumb': {
                                        width: 14,
                                        height: 14,
                                        '&:before': {
                                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                        },
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: `0px 0px 0px 8px ${
                                                mode === 'dark' 
                                                    ? 'rgba(255, 255, 255, 0.16)' 
                                                    : 'rgba(0, 0, 0, 0.16)'
                                            }`,
                                        },
                                    },
                                    '& .MuiSlider-track': {
                                        height: 4,
                                        opacity: 1,
                                    },
                                    '& .MuiSlider-rail': {
                                        height: 4,
                                        opacity: 0.28,
                                    },
                                    '& .MuiSlider-mark': {
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                    },
                                }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ minHeight: 80 }}>
                            <Typography gutterBottom>
                                Number of Words: {Math.round(localWordCount)}
                            </Typography>
                            <Slider
                                value={localWordCount}
                                onChange={handleWordCountChange}
                                onChangeCommitted={handleWordCountChangeCommitted}
                                min={3}
                                max={8}
                                marks={[
                                    { value: 3, label: '3' },
                                    { value: 5, label: '5' },
                                    { value: 8, label: '8' }
                                ]}
                                sx={{
                                    mt: 2,
                                    '& .MuiSlider-thumb': {
                                        width: 14,
                                        height: 14,
                                        '&:before': {
                                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                        },
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: `0px 0px 0px 8px ${
                                                mode === 'dark' 
                                                    ? 'rgba(255, 255, 255, 0.16)' 
                                                    : 'rgba(0, 0, 0, 0.16)'
                                            }`,
                                        },
                                    },
                                    '& .MuiSlider-track': {
                                        height: 4,
                                        opacity: 1,
                                    },
                                    '& .MuiSlider-rail': {
                                        height: 4,
                                        opacity: 0.28,
                                    },
                                    '& .MuiSlider-mark': {
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                    },
                                }}
                            />
                        </Box>
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
                mode={mode}
            />
        </Box>
    )
}