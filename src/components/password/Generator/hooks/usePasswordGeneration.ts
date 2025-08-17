import { useState, useEffect, useCallback } from 'react'
import { passwordGenerator } from '@/lib/generators/passwordGenerator'
import { wordGenerator } from '@/lib/generators/wordGenerator'
import { checkPasswordCompromised } from '@/lib/security/checkPassword'
import type { PasswordOptions } from '@/types'
import { DEFAULT_PASSWORD_LENGTH, DEFAULT_WORD_COUNT, SUPPORTED_LANGUAGES } from '@/lib/utils/constants'

const DEFAULT_PASSPHRASE_OPTIONS: PasswordOptions = {
    // Character sets
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,

    // Indian Scripts
    hindi: false,
    tamil: false,
    telugu: false,
    bengali: false,
    gujarati: false,
    kannada: false,
    malayalam: false,
    odia: false,
    punjabi: false,
    urdu: false,
    santali: false,
    manipuri: false,

    // International Scripts
    english: true,
    dutch: false,
    swedish: false,
    danish: false,
    hungarian: false,
    lithuanian: false,
    maltese: false,
    estonian: false,
    bulgarian: false,
    czech: false,
    croatian: false,
    latvian: false,
    romanian: false,
    slovenian: false,
    welsh: false,
    mandarin: false,
    spanish: false,
    russian: false,
    japanese: false,
    vietnamese: false,
    turkish: false,
    korean: false,
    french: false,
    italian: false,
    iranianPersian: false,
    javanese: false,
    greek: false,
    thai: false
}

// You should also update DEFAULT_PASSWORD_OPTIONS similarly:
const DEFAULT_PASSWORD_OPTIONS: PasswordOptions = {
    // Character sets
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,

    // Indian Scripts
    hindi: false,
    tamil: false,
    telugu: false,
    bengali: false,
    gujarati: false,
    kannada: false,
    malayalam: false,
    odia: false,
    punjabi: false,
    urdu: false,
    santali: false,
    manipuri: false,

    // International Scripts
    english: true,
    dutch: false,
    swedish: false,
    danish: false,
    hungarian: false,
    lithuanian: false,
    maltese: false,
    estonian: false,
    bulgarian: false,
    czech: false,
    croatian: false,
    latvian: false,
    romanian: false,
    slovenian: false,
    welsh: false,
    mandarin: false,
    spanish: false,
    russian: false,
    japanese: false,
    vietnamese: false,
    turkish: false,
    korean: false,
    french: false,
    italian: false,
    iranianPersian: false,
    javanese: false,
    greek: false,
    thai: false
}

type PassphraseLanguage = 'english' | 'hindi' | 'tamil' | 'telugu';

export function usePasswordGeneration() {
    const [password, setPassword] = useState('')
    const [wordCount, setWordCount] = useState(DEFAULT_WORD_COUNT)
    const [type, setType] = useState<'password' | 'passphrase'>('password')
    const [copied, setCopied] = useState(false)
    const [isCompromised, setIsCompromised] = useState(false)
    const [length, setLength] = useState(DEFAULT_PASSWORD_LENGTH)
    const [hasError, setHasError] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [options, setOptions] = useState<PasswordOptions>(DEFAULT_PASSWORD_OPTIONS)
    const [isDragging, setIsDragging] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const checkPasswordStrength = useCallback(async (pass: string) => {
        try {
            const compromised = await checkPasswordCompromised(pass);
            setIsCompromised(compromised);
        } catch (error) {
            console.error('Error checking password:', error);
            setIsCompromised(false); // Default to not compromised on error
        }
    }, []);

    const generateRandomPassword = useCallback(() => {
        return passwordGenerator.generate(length, options)
    }, [length, options])

    const generatePassphrase = useCallback(() => {
        const selectedLanguages = Object.entries(options)
            .filter(([, enabled]) => enabled)
            .map(([lang]) => lang as PassphraseLanguage)

        if (selectedLanguages.length === 0) {
            selectedLanguages.push('english')
        }

        const words = Array.from({ length: wordCount }, () => {
            const lang = selectedLanguages[Math.floor(Math.random() * selectedLanguages.length)]
            const word = wordGenerator.generate({
                language: lang,
                minLength: 3,
                maxLength: 8
            }) as string
            return word.charAt(0).toUpperCase() + word.slice(1)
        })

        const randomNum = Math.floor(Math.random() * 900) + 100
        return `${words.join('-')}${randomNum}`
    }, [options, wordCount])
    
    const generatePassword = useCallback(() => {
        if (!isClient) return

        const newPassword = type === 'passphrase'
            ? generatePassphrase()
            : generateRandomPassword()

        setPassword(newPassword)
        checkPasswordStrength(newPassword)
    }, [type, generatePassphrase, generateRandomPassword, isClient, checkPasswordStrength])


    const handleLengthChange = (newValue: number) => {
        setLength(newValue)
        // Only generate new password when not dragging
        if (!isDragging) {
            generatePassword()
        }
    }

    const handleDragStart = () => {
        setIsDragging(true)
    }

    const handleDragEnd = () => {
        setIsDragging(false)
        generatePassword()
    }

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
    if (password) {
        checkPasswordStrength(password);
    }
}, [password, checkPasswordStrength]);

    useEffect(() => {
        if (isClient) {
            generatePassword()
        }
    }, [isClient, generatePassword])

    useEffect(() => {
        if (!isDragging) {
            let hasAnyOption = false;
            if (type === 'password') {
                // Check if at least one option is enabled
                hasAnyOption = Object.values(options).some(value => value === true);
            } else { // passphrase
                const passphraseLanguages = SUPPORTED_LANGUAGES.PASSPHRASE.map(lang => lang.code);
                hasAnyOption = Object.entries(options)
                    .filter(([key]) => passphraseLanguages.includes(key)) 
                    .some(([, value]) => value === true);
            }

            if (!hasAnyOption) {
                setHasError(true);
                return;
            }

            setHasError(false);
            generatePassword();
        }
    }, [type, length, wordCount, options, generatePassword, isDragging]);

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return {
        password,
        wordCount,
        type,
        copied,
        length,
        hasError,
        isEditing,
        isClient,
        options,
        isCompromised,
        snackbarOpen,
        setSnackbarOpen,
        setPassword,
        setWordCount,
        setLength: handleLengthChange,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        setIsEditing,
        handleCopy: () => {
            navigator.clipboard.writeText(password)
            setCopied(true)
            setSnackbarOpen(true);
            setTimeout(() => setCopied(false), 2000)
        },
        handleSnackbarClose,
        handleTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            const newType = event.target.value as 'password' | 'passphrase'
            setType(newType)
            setOptions(newType === 'passphrase' ? DEFAULT_PASSPHRASE_OPTIONS : DEFAULT_PASSWORD_OPTIONS)
            setHasError(false)
        },
        handleOptionsChange: (optionName: string) => (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            const newValue = event.target.checked;
            const updatedOptions = { ...options, [optionName]: newValue };

            if (type === 'password') {
                const isLatinCharset = optionName === 'uppercase' || optionName === 'lowercase';
                const isNonLatinScript = !['uppercase', 'lowercase', 'numbers', 'symbols', 'english'].includes(optionName);

                if (optionName === 'english') {
                    updatedOptions.uppercase = newValue;
                    updatedOptions.lowercase = newValue;
                } else if (isLatinCharset && newValue) {
                    updatedOptions.english = true;
                } else if (!updatedOptions.uppercase && !updatedOptions.lowercase) {
                    updatedOptions.english = false;
                }
                
                if ((isLatinCharset || optionName === 'english') && newValue) {
                    Object.keys(updatedOptions).forEach(key => {
                        if (!['uppercase', 'lowercase', 'numbers', 'symbols', 'english'].includes(key)) {
                            updatedOptions[key] = false;
                        }
                    });
                } else if (isNonLatinScript && newValue) {
                    updatedOptions.english = false;
                    updatedOptions.uppercase = false;
                    updatedOptions.lowercase = false;
                }
            }
            setOptions(updatedOptions);
        },
        generatePassword
    }
}