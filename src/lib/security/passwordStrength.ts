import { useMemo, useEffect } from 'react'
import { zxcvbn } from '@zxcvbn-ts/core'
import { getZxcvbnManager, createPasswordAnalyzer } from './zxcvbnManager'

/**
 * Custom hook for calculating password strength using zxcvbn
 * Provides detailed analysis of password security and cracking time estimates
 */

/**
 * Password Strength Analysis Implementation
 * 
 * Scoring Algorithm:
 * - Score 0: Too guessable (< 10^3 guesses)
 * - Score 1: Very guessable (< 10^6 guesses)
 * - Score 2: Somewhat guessable (< 10^8 guesses)
 * - Score 3: Safely unguessable (< 10^10 guesses)
 * - Score 4: Very unguessable (≥ 10^10 guesses)
 * 
 * Security Implications:
 * - Provides estimate of password cracking difficulty
 * - Identifies common patterns and weaknesses
 * - Calculates entropy based on character composition
 * - Now properly includes user context in analysis
 * 
 * Example Usage:
 * ```typescript
 * // Basic usage
 * const strength = usePasswordStrength('myPassword123');
 * 
 * // With user context (properly implemented now)
 * const strength = usePasswordStrength('johnDoe123', ['john', 'doe', 'company']);
 * 
 * // With multi-language support
 * const strength = usePasswordStrength('password123', ['user'], ['en', 'common']);
 * ```
 * 
 * @security Password strength is an estimate and should not be solely relied upon
 * @warning Local analysis only - no passwords are transmitted
 */

// Define strength calculation result interface
export interface StrengthResult {
    score: number;
    guessesLog10: number;
    crackTimesDisplay: {
        offlineFastHashing1e10PerSecond: string;
        offlineSlowHashing1e4PerSecond: string;
        onlineNoThrottling10PerSecond: string;
        onlineThrottling100PerHour: string;
    };
    feedback: {
        warning: string | null;
        suggestions: string[];
    };
    calcTime: number;
    sequence: Array<{
        pattern: string;
        token: string;
        i: number;
        j: number;
    }>;
}

// Default strength result when no password is provided
const DEFAULT_RESULT: StrengthResult = Object.freeze({
    score: 0,
    guessesLog10: 0,
    crackTimesDisplay: {
        offlineFastHashing1e10PerSecond: '',
        offlineSlowHashing1e4PerSecond: '',
        onlineNoThrottling10PerSecond: '',
        onlineThrottling100PerHour: ''
    },
    feedback: {
        warning: null,
        suggestions: []
    },
    calcTime: 0,
    sequence: []
})

/**
 * Hook to analyze password strength and provide feedback
 * @param password - Password string to analyze
 * @param userInputs - Optional array of user-specific words to check against
 * @param languages - Optional array of language codes to include in analysis
 * @returns Password strength analysis result
 */
export const usePasswordStrength = (
    password: string, 
    userInputs: string[] = [],
    languages: string[] = ['en']
): StrengthResult => {
    // Get the zxcvbn manager instance
    const manager = getZxcvbnManager()

    // Memoize normalized user inputs to prevent unnecessary recalculations
    const normalizedUserInputs = useMemo(() => {
        return userInputs
            .filter(input => input && typeof input === 'string')
            .map(input => input.toLowerCase().trim())
            .filter(input => input.length > 0)
    }, [userInputs])

    // Memoize languages array
    const normalizedLanguages = useMemo(() => {
        return languages.length > 0 ? languages : ['en']
    }, [languages])

    // Create password analyzer with current inputs and languages
    const analyzer = useMemo(() => {
        return createPasswordAnalyzer(normalizedUserInputs, normalizedLanguages)
    }, [normalizedUserInputs, normalizedLanguages])

    // Memoize the analysis result
    const strengthResult = useMemo(() => {
        if (!password || password.length === 0) {
            return DEFAULT_RESULT
        }

        return analyzer(() => {
            const result = zxcvbn(password)

            return {
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
                    suggestions: [...result.feedback.suggestions] // Create copy to avoid mutation
                },
                calcTime: result.calcTime,
                sequence: result.sequence.map(seq => ({
                    pattern: seq.pattern,
                    token: seq.token,
                    i: seq.i,
                    j: seq.j
                }))
            }
        })
    }, [password, analyzer])

    // Cleanup effect to ensure manager is reset if component unmounts unexpectedly
    useEffect(() => {
        return () => {
            // The manager handles its own cleanup, but we can ensure it's reset
            // if there are any issues
            if (!manager.isReady()) {
                manager.reset()
            }
        }
    }, [manager])

    return strengthResult
}

/**
 * Utility function to get password strength score without full analysis
 * Useful for quick checks or when you only need the score
 * @param password - Password to analyze
 * @param userInputs - Optional user inputs
 * @param languages - Optional language codes
 * @returns Score from 0-4
 */
export const getPasswordScore = (
    password: string, 
    userInputs: string[] = [],
    languages: string[] = ['en']
): number => {
    if (!password) return 0
    
    const analyzer = createPasswordAnalyzer(userInputs, languages)
    
    return analyzer(() => {
        const result = zxcvbn(password)
        return result.score
    })
}

/**
 * Type guard to check if a strength result is valid
 * @param result - Result to check
 * @returns True if result is valid
 */
export const isValidStrengthResult = (result: unknown): result is StrengthResult => {
    if (!result || typeof result !== 'object') {
        return false
    }
    
    const r = result as Record<string, unknown>
    
    return (
        'score' in r &&
        typeof r.score === 'number' &&
        r.score >= 0 &&
        r.score <= 4 &&
        'guessesLog10' in r &&
        typeof r.guessesLog10 === 'number' &&
        'crackTimesDisplay' in r &&
        r.crackTimesDisplay &&
        typeof r.crackTimesDisplay === 'object' &&
        'feedback' in r &&
        r.feedback &&
        typeof r.feedback === 'object' &&
        r.feedback !== null &&
        'suggestions' in (r.feedback as Record<string, unknown>) &&
        Array.isArray((r.feedback as Record<string, unknown>).suggestions)
    )
}

/**
 * Utility function to get strength description from score
 * @param score - Password strength score (0-4)
 * @returns Human-readable strength description
 */
export const getStrengthDescription = (score: number): string => {
    switch (score) {
        case 0:
            return 'Very Weak'
        case 1:
            return 'Weak'
        case 2:
            return 'Fair'
        case 3:
            return 'Good'
        case 4:
            return 'Strong'
        default:
            return 'Unknown'
    }
}

/**
 * Utility function to get color associated with strength score
 * @param score - Password strength score (0-4)
 * @returns Color string suitable for UI
 */
export const getStrengthColor = (score: number): string => {
    switch (score) {
        case 0:
        case 1:
            return '#f44336' // Red
        case 2:
            return '#ff9800' // Orange
        case 3:
            return '#2196f3' // Blue
        case 4:
            return '#4caf50' // Green
        default:
            return '#757575' // Gray
    }
}