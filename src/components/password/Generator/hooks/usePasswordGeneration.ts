import { useState, useEffect, useCallback } from 'react'
import { passwordGenerator } from '@/lib/generators/passwordGenerator'
import { wordGenerator } from '@/lib/generators/wordGenerator'
import { checkPasswordCompromised } from '@/lib/security/checkPassword'
import type { PasswordOptions } from '@/types'
import { DEFAULT_PASSWORD_LENGTH, DEFAULT_WORD_COUNT } from '@/lib/utils/constants'

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
    javanese: false
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
    javanese: false
}

export function usePasswordGeneration() {
    const [password, setPassword] = useState('')
    const [wordCount, setWordCount] = useState(DEFAULT_WORD_COUNT)
    const [type, setType] = useState<'password' | 'passphrase'>('password')
    const [copied, setCopied] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isCompromised, setIsCompromised] = useState(false)
    const [length, setLength] = useState(DEFAULT_PASSWORD_LENGTH)
    const [hasError, setHasError] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [options, setOptions] = useState<PasswordOptions>(DEFAULT_PASSWORD_OPTIONS)
    const [isDragging, setIsDragging] = useState(false)

    const generateRandomPassword = useCallback(() => {
        return passwordGenerator.generate(length, options)
    }, [length, options])

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

    const generatePassword = useCallback(() => {
        if (!isClient) return

        const newPassword = type === 'passphrase'
            ? generatePassphrase()
            : generateRandomPassword()

        setPassword(newPassword)
        checkPasswordStrength(newPassword)
    }, [type, generatePassphrase, generateRandomPassword, isClient])

    const checkPasswordStrength = async (pass: string) => {
        try {
            const compromised = await checkPasswordCompromised(pass)
            setIsCompromised(compromised)
        } catch (error) {
            console.error('Error checking password:', error)
            setIsCompromised(false)
        }
    }

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
            const hasAnyOption = type === 'password'
                ? (options.uppercase || options.lowercase || options.numbers || options.symbols)
                : (options.english || options.hindi || options.tamil || options.telugu)

            if (!hasAnyOption) {
                setHasError(true)
                return
            }

            setHasError(false)
            generatePassword()
        }
    }, [type, length, wordCount, options, generatePassword, isDragging])

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
        setPassword,
        setWordCount,
        setLength: handleLengthChange,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        setIsEditing,
        handleCopy: () => {
            navigator.clipboard.writeText(password)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        },
        handleTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            const newType = event.target.value as 'password' | 'passphrase'
            setType(newType)
            setOptions(newType === 'passphrase' ? DEFAULT_PASSPHRASE_OPTIONS : DEFAULT_PASSWORD_OPTIONS)
            setHasError(false)
        },
        handleOptionsChange: (optionName: string) => (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            const newValue = event.target.checked
            const updatedOptions = { ...options, [optionName]: newValue }

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

            setOptions(updatedOptions)
        },
        generatePassword
    }
}