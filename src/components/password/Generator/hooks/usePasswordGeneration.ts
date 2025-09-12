/**
 * @file usePasswordGeneration.ts
 * @description A custom React hook to manage the state and logic for password generation.
 * This includes handling user options, generating passwords and passphrases, and checking for compromises.
 */

import { useState, useEffect, useCallback } from 'react'
import { passwordGenerator } from '@/lib/generators/passwordGenerator'
import { wordGenerator } from '@/lib/generators/wordGenerator'
import { checkPasswordCompromised } from '@/lib/security/checkPassword'
import { loadSelectedWordlists, getSelectedLanguages } from '@/lib/security'
import type { PasswordOptions } from '@/types'
import { DEFAULT_PASSWORD_LENGTH, DEFAULT_WORD_COUNT, SUPPORTED_LANGUAGES } from '@/lib/utils/constants'
import { StrengthResult } from '../../../../lib/security/passwordStrength'
import { zxcvbn } from '@zxcvbn-ts/core'
import { createPasswordAnalyzerWithWordlists } from '../../../../lib/security/zxcvbnManager'

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
    const [loadedWordlists, setLoadedWordlists] = useState<{ [language: string]: string[] }>({})
    const [passwordStrength, setPasswordStrength] = useState<StrengthResult | null>(null)

    const loadWordlistsForSelectedLanguages = useCallback(async (currentOptions: PasswordOptions) => {
        const selectedLanguages = getSelectedLanguages(currentOptions);

        if (selectedLanguages.length === 0) {
            console.log('🔸 No languages selected for wordlist loading');
            return;
        }

        try {
            console.log('🚀 Starting to load wordlists for password strength analysis...');
            const wordlists = await loadSelectedWordlists(selectedLanguages);
            setLoadedWordlists(wordlists);

            // Log summary of what was loaded
            console.log('📊 Wordlist loading summary:');
            Object.entries(wordlists).forEach(([language, words]) => {
                console.log(`  • ${language}: ${words.length} words`);
            });

        } catch (error) {
            console.error('❌ Error loading wordlists:', error);
        }
    }, []);

    const checkPasswordStrength = useCallback(async (pass: string) => {
        try {
            const compromised = await checkPasswordCompromised(pass);
            setIsCompromised(compromised);

            // Also analyze with custom wordlists
            console.log('🔍 Analyzing password strength with custom wordlists...');
        } catch (error) {
            console.error('Error checking password:', error);
            setIsCompromised(false);
        }
    }, []);

    useEffect(() => {
        if (password) {
            checkPasswordStrength(password);
        }
    }, [password, checkPasswordStrength]);

    const generateRandomPassword = useCallback(() => {
        return passwordGenerator.generate(length, options)
    }, [length, options])

    const generatePassphrase = useCallback(async () => {
        const selectedLanguages = Object.entries(options)
            .filter(([, enabled]) => enabled)
            .map(([lang]) => lang as string)

        if (selectedLanguages.length === 0) {
            selectedLanguages.push('english');
        }

        // Use Promise.all to fetch words concurrently
        const words: string[] = await Promise.all(Array.from({ length: wordCount }, async () => {
            const lang = selectedLanguages[Math.floor(Math.random() * selectedLanguages.length)];
            // Await the generate method for each word
            const word = await wordGenerator.generate({
                language: lang,
                minLength: 3,
                maxLength: 8
            });
            return word.charAt(0).toUpperCase() + word.slice(1);
        }));

        const randomNum = Math.floor(Math.random() * 900) + 100;
        return `${words.join('-')}${randomNum}`;
    }, [options, wordCount]);

    const generatePassword = useCallback(async () => {
        if (!isClient) return;

        // Await the result of the generation
        const newPassword = await (type === 'passphrase'
            ? generatePassphrase()
            : generateRandomPassword());

        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    }, [type, generatePassphrase, generateRandomPassword, isClient, checkPasswordStrength]);

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
                const passphraseLanguages = Object.values(SUPPORTED_LANGUAGES.PASSPHRASE).flatMap(continent => continent.map(lang => lang.code));
                hasAnyOption = Object.entries(options)
                    .filter(([key]) => (passphraseLanguages as readonly string[]).includes(key))
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

    useEffect(() => {
        if (isClient) {
            loadWordlistsForSelectedLanguages(options);
        }
    }, [options, isClient, loadWordlistsForSelectedLanguages]);

    // Password strength analysis with custom wordlists
    useEffect(() => {
        if (password && Object.keys(loadedWordlists).length > 0) {
            try {
                const analyzer = createPasswordAnalyzerWithWordlists(loadedWordlists, []);
                const result = analyzer(() => zxcvbn(password));

                // Define the type for zxcvbn sequence items
                interface ZxcvbnSequence {
                    pattern: string;
                    token: string;
                    i: number;
                    j: number;
                    dictionary_name?: string;
                }

                // Create detailed analysis for UI
                const detailedAnalysis: StrengthResult = {
                    score: result.score,
                    guessesLog10: result.guessesLog10,
                    crackTimesDisplay: {
                        offlineFastHashing1e10PerSecond: result.crackTimesDisplay.offlineFastHashing1e10PerSecond,
                        offlineSlowHashing1e4PerSecond: result.crackTimesDisplay.offlineSlowHashing1e4PerSecond,
                        onlineNoThrottling10PerSecond: result.crackTimesDisplay.onlineNoThrottling10PerSecond,
                        onlineThrottling100PerHour: result.crackTimesDisplay.onlineThrottling100PerHour
                    },
                    feedback: {
                        warning: result.feedback.warning || null,
                        suggestions: [...result.feedback.suggestions]
                    },
                    calcTime: result.calcTime,
                    sequence: result.sequence.map((seq: ZxcvbnSequence) => ({
                        pattern: seq.pattern,
                        token: seq.token,
                        i: seq.i,
                        j: seq.j
                    })),
                    // Add our custom analysis
                    customAnalysis: {
                        usesCustomWordlists: true,
                        loadedLanguages: Object.keys(loadedWordlists),
                        totalCustomWords: Object.values(loadedWordlists).reduce((sum, words) => sum + words.length, 0),
                        detectedPatterns: result.sequence.map((seq: ZxcvbnSequence) => seq.pattern),
                        foundInCustomDictionary: result.sequence.some((seq: ZxcvbnSequence) => seq.dictionary_name?.startsWith('custom_'))
                    }
                };

                // Update state with the detailed analysis
                setPasswordStrength(detailedAnalysis);

                // Log for debugging (optional - can remove later)
                console.log('Password strength with custom wordlists:', {
                    score: result.score,
                    patterns: result.sequence.map((seq: ZxcvbnSequence) => seq.pattern),
                    customWords: detailedAnalysis.customAnalysis?.totalCustomWords
                });

            } catch (error) {
                console.error('Error with password strength analysis:', error);
                // Set default strength result on error
                setPasswordStrength({
                    score: 0,
                    guessesLog10: 0,
                    crackTimesDisplay: {
                        offlineFastHashing1e10PerSecond: '',
                        offlineSlowHashing1e4PerSecond: '',
                        onlineNoThrottling10PerSecond: '',
                        onlineThrottling100PerHour: ''
                    },
                    feedback: { warning: null, suggestions: [] },
                    calcTime: 0,
                    sequence: [],
                    customAnalysis: {
                        usesCustomWordlists: false,
                        loadedLanguages: [],
                        totalCustomWords: 0,
                        detectedPatterns: [],
                        foundInCustomDictionary: false
                    }
                });
            }
        }
    }, [password, loadedWordlists]);

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
        loadedWordlists,
        passwordStrength,
        strengthAnalysis: passwordStrength,
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

                if (optionName === 'english') {
                    updatedOptions.uppercase = newValue;
                    updatedOptions.lowercase = newValue;
                } else if (isLatinCharset && newValue) {
                    updatedOptions.english = true;
                } else if (!updatedOptions.uppercase && !updatedOptions.lowercase) {
                    updatedOptions.english = false;
                }
            }
            setOptions(updatedOptions);
        },
        generatePassword,
        loadWordlistsForSelectedLanguages
    }
}