/**
 * Custom hook managing password generation state and logic
 * Handles both random password and passphrase generation
 */
import { useState, useEffect, useCallback } from 'react'
import { passwordGenerator } from '@/lib/generators/passwordGenerator'
import { wordGenerator } from '@/lib/generators/wordGenerator'
import { checkPasswordCompromised } from '@/lib/security/checkPassword'
import type { PasswordOptions } from '@/types'
import { DEFAULT_PASSWORD_LENGTH, DEFAULT_WORD_COUNT } from '@/lib/utils/constants'

// Default options for password mode
const DEFAULT_PASSWORD_OPTIONS: PasswordOptions = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    english: true,
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
}

// Default options for passphrase mode
const DEFAULT_PASSPHRASE_OPTIONS: PasswordOptions = {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
    english: true,
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
}

export function usePasswordGeneration() {
    // State management for password generation
    const [password, setPassword] = useState('')
    const [wordCount, setWordCount] = useState(DEFAULT_WORD_COUNT)
    const [type, setType] = useState<'password' | 'passphrase'>('password')
    const [copied, setCopied] = useState(false)
    const [isCompromised, setIsCompromised] = useState(false)
    const [length, setLength] = useState(DEFAULT_PASSWORD_LENGTH)
    const [hasError, setHasError] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [options, setOptions] = useState<PasswordOptions>({
        ...DEFAULT_PASSWORD_OPTIONS,
        // Initialize all other options to false
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
    } as PasswordOptions)

    /**
     * Generate a random password using the passwordGenerator
     */
    const generateRandomPassword = useCallback(() => {
        return passwordGenerator.generate(length, options)
    }, [length, options])

    /**
     * Generate a passphrase by combining words from selected languages
     */
    const generatePassphrase = useCallback(() => {
        const selectedLanguages = Object.entries(options)
            .filter(([, enabled]) => enabled)
            .map(([lang]) => lang)

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

    /**
     * Check if generated password has been compromised
     */
    const checkPasswordStrength = async (pass: string) => {
        try {
            const compromised = await checkPasswordCompromised(pass)
            setIsCompromised(compromised)
        } catch (error) {
            console.error('Error checking password:', error)
            setIsCompromised(false)
        }
    }

    /**
     * Handle changes to password generation options
     */
    const handleOptionsChange = (optionName: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newValue = event.target.checked
        const updatedOptions = { ...options, [optionName]: newValue }

        // Special handling for password type options
        if (type === 'password') {
            if (optionName === 'uppercase' || optionName === 'lowercase') {
                if (newValue ||
                    (optionName === 'uppercase' && options.lowercase) ||
                    (optionName === 'lowercase' && options.uppercase)) {
                    updatedOptions.english = true
                } else if (!newValue &&
                    !(optionName === 'uppercase' ? options.lowercase : options.uppercase)) {
                    updatedOptions.english = false
                }
            }

            if (optionName === 'english' && (options.uppercase || options.lowercase)) {
                updatedOptions.english = true
                return
            }
        }

        // Validate that at least one option is selected
        const hasAnyOption = type === 'password'
            ? (updatedOptions.uppercase || updatedOptions.lowercase ||
                updatedOptions.numbers || updatedOptions.symbols)
            : (updatedOptions.english || updatedOptions.hindi ||
                updatedOptions.tamil || updatedOptions.telugu)

        setOptions(updatedOptions)
        setHasError(!hasAnyOption)
    }

    /**
     * Handle switching between password and passphrase modes
     */
    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newType = event.target.value as 'password' | 'passphrase'
        setType(newType)
        
        // Reset options based on the new type
        if (newType === 'passphrase') {
            setOptions(DEFAULT_PASSPHRASE_OPTIONS)
        } else {
            setOptions(DEFAULT_PASSWORD_OPTIONS)
        }
        
        setHasError(false)
    }

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
        // Update length to match new password length when manually editing
        setLength(newPassword.length);
    };

    // Generate new password when options change
    useEffect(() => {
        const timer = setTimeout(() => {
            const hasAnyOption = type === 'password'
                ? (options.uppercase || options.lowercase || options.numbers || options.symbols)
                : (options.english || options.hindi || options.tamil || options.telugu)

            if (!hasAnyOption) {
                setHasError(true)
                return
            }

            setHasError(false)
            const newPassword = type === 'passphrase'
                ? generatePassphrase()
                : generateRandomPassword()
            setPassword(newPassword)
            checkPasswordStrength(newPassword)
        }, 300)

        return () => clearTimeout(timer)
    }, [type, length, wordCount, options, generatePassphrase, generateRandomPassword])

    return {
        password,
        wordCount,
        type,
        copied,
        isCompromised,
        length,
        hasError,
        isEditing,
        options,
        setPassword: handlePasswordChange,
        setWordCount,
        setLength,
        setIsEditing,
        handleCopy: () => {
            navigator.clipboard.writeText(password)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        },
        handleTypeChange,
        handleOptionsChange,
        generatePassword: () => {
            const newPassword = type === 'passphrase'
                ? generatePassphrase()
                : generateRandomPassword()
            setPassword(newPassword)
            setLength(newPassword.length)
            checkPasswordStrength(newPassword)
        },
    }
}