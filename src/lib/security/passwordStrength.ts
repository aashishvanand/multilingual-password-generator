import { useMemo } from 'react'
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

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
 * 
 * Example Usage:
 * ```typescript
 * const strength = usePasswordStrength('myPassword123');
 * console.log(strength.score); // 0-4
 * console.log(strength.feedback.suggestions);
 * ```
 * 
 * @security Password strength is an estimate and should not be solely relied upon
 * @warning Local analysis only - no passwords are transmitted
 */

// Configure zxcvbn with common dictionaries and translations
const baseOptions = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
    },
}

zxcvbnOptions.setOptions(baseOptions)

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
    sequence: unknown[];
}

// Default strength result when no password is provided
const defaultResult: StrengthResult = {
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
};

/**
 * Hook to analyze password strength and provide feedback
 * @param password - Password string to analyze
 * @param userInputs - Optional array of user-specific words to check against
 * @returns Password strength analysis result
 */
export const usePasswordStrength = (password: string, userInputs: string[] = []): StrengthResult => {
    // Remove the userInputsString and memoizedUserInputs as they're not needed

    // Calculate and memoize strength result
    const strengthResult = useMemo(() => {
        if (!password) return defaultResult;

        // Add user inputs to dictionary if provided
        if (userInputs.length > 0) {
            zxcvbnOptions.setOptions({
                ...baseOptions,
                dictionary: {
                    ...baseOptions.dictionary,
                    userInputs: userInputs,
                },
            });
        }

        const result = zxcvbn(password);

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
                suggestions: result.feedback.suggestions
            },
            calcTime: result.calcTime,
            sequence: result.sequence
        };
    }, [password, userInputs]); // Added userInputs to the dependency array

    return strengthResult;
};