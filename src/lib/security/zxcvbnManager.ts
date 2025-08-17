import { zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

/**
 * Configuration for different languages and their dictionaries
 */
interface LanguageConfig {
    translations: typeof zxcvbnEnPackage.translations
    dictionary: Record<string, string[] | number>
    graphs?: typeof zxcvbnCommonPackage.adjacencyGraphs
}

/**
 * Available language configurations
 */
const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
    en: {
        translations: zxcvbnEnPackage.translations,
        dictionary: zxcvbnEnPackage.dictionary,
        graphs: zxcvbnCommonPackage.adjacencyGraphs,
    },
    common: {
        translations: zxcvbnEnPackage.translations, // Fallback to English
        dictionary: zxcvbnCommonPackage.dictionary,
        graphs: zxcvbnCommonPackage.adjacencyGraphs,
    }
}

/**
 * Default base configuration
 */
const DEFAULT_CONFIG = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
    },
}

/**
 * L33t speak substitutions
 */
const leetSubstitutions: { [key: string]: string[] } = {
    'a': ['4', '@'],
    'b': ['8'],
    'e': ['3'],
    'g': ['6', '9'],
    'i': ['1', '!'],
    'l': ['1'],
    'o': ['0'],
    's': ['5', '$'],
    't': ['7', '+'],
    'z': ['2']
};

/**
 * Manager class for handling zxcvbn configurations
 */
export class ZxcvbnManager {
    private static instance: ZxcvbnManager
    private isInitialized: boolean = false

    private constructor() {
        this.initialize()
    }

    /**
     * Get singleton instance
     */
    public static getInstance(): ZxcvbnManager {
        if (!ZxcvbnManager.instance) {
            ZxcvbnManager.instance = new ZxcvbnManager()
        }
        return ZxcvbnManager.instance
    }

    /**
     * Initialize zxcvbn with default configuration
     */
    private initialize(): void {
        if (!this.isInitialized) {
            zxcvbnOptions.setOptions(DEFAULT_CONFIG)
            this.isInitialized = true
        }
    }

    /**
     * Create configuration with user inputs
     * @param userInputs - Array of user-specific words
     * @param languages - Array of language codes to include
     * @returns Configuration object with user inputs and language dictionaries
     */
    public createConfigWithUserInputs(
        userInputs: string[] = [],
        languages: string[] = ['en']
    ) {
        // Start with default configuration
        const config = { ...DEFAULT_CONFIG };

        // Add language dictionaries
        const combinedDictionary = { ...DEFAULT_CONFIG.dictionary };

        for (const lang of languages) {
            const langConfig = LANGUAGE_CONFIGS[lang];
            if (langConfig) {
                Object.assign(combinedDictionary, langConfig.dictionary);
                // Use the last language's translations
                config.translations = langConfig.translations;
                if (langConfig.graphs) {
                    config.graphs = langConfig.graphs;
                }
            }
        }

        // Add user inputs as a dictionary array (zxcvbn expects arrays)
        if (userInputs.length > 0) {
            // Directly call the method and assign its result
            (combinedDictionary as Record<string, string[] | number>).userInputs = this.createUserInputDictionary(userInputs);
        }

        config.dictionary = combinedDictionary;
        return config;
    }

    /**
     * Generate l33t speak variations of a word.
     * @param word - The word to generate variations for.
     * @returns An array of l33t speak variations.
     */
    private getLeetVariations(word: string): string[] {
        const variations = new Set<string>();
        const generate = (currentWord: string, index: number) => {
            if (index === word.length) {
                variations.add(currentWord);
                return;
            }

            const char = word[index].toLowerCase();
            generate(currentWord + word[index], index + 1);

            if (leetSubstitutions[char]) {
                leetSubstitutions[char].forEach(sub => {
                    generate(currentWord + sub, index + 1);
                });
            }
        };
        generate('', 0);
        return Array.from(variations);
    }

    /**
     * Generate common date format variations from a string if it's a valid date.
     * @param input - The input string to check for a date.
     * @returns An array of date variations.
     */
    private getDateVariations(input: string): string[] {
        const date = new Date(input);
        if (isNaN(date.getTime())) {
            return [];
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        const shortYear = year.slice(-2);

        return [
            `${day}${month}${year}`,
            `${month}${day}${year}`,
            `${year}${month}${day}`,
            `${day}${month}${shortYear}`,
            `${month}${day}${shortYear}`,
            `${shortYear}${month}${day}`,
        ];
    }


    /**
     * Convert user inputs to dictionary format that zxcvbn expects
     * @param userInputs - Array of user input strings
     * @returns Array of normalized user inputs
     */
    private createUserInputDictionary(userInputs: string[]): string[] {
        const dictionary: Set<string> = new Set();

        userInputs.forEach(input => {
            if (typeof input === 'string' && input.trim().length > 0) {
                const normalized = input.toLowerCase().trim();
                dictionary.add(normalized);

                // Add l33t speak variations
                this.getLeetVariations(normalized).forEach(v => dictionary.add(v));

                // Add date variations
                this.getDateVariations(normalized).forEach(v => dictionary.add(v));

                // Add common variations if input is long enough
                if (normalized.length >= 3) {
                    // Add without common suffixes/prefixes
                    const withoutNumbers = normalized.replace(/\d+$/g, '')
                    if (withoutNumbers.length >= 3 && withoutNumbers !== normalized) {
                        dictionary.add(withoutNumbers);
                    }

                    // Add reversed (for passwords like "password" -> "drowssap")
                    const reversed = normalized.split('').reverse().join('')
                    if (reversed !== normalized) {
                        dictionary.add(reversed);
                    }
                }
            }
        });

        // Add combinations of user inputs
        if (userInputs.length > 1 && userInputs.length <= 4) { // Limit combinations to avoid performance issues
            for (let i = 0; i < userInputs.length; i++) {
                for (let j = 0; j < userInputs.length; j++) {
                    if (i !== j) {
                        dictionary.add(userInputs[i].toLowerCase() + userInputs[j].toLowerCase());
                    }
                }
            }
        }

        return Array.from(dictionary);
    }

    /**
     * Temporarily apply configuration for analysis
     * @param config - Configuration to apply
     * @param analysisFunction - Function to run with the configuration
     * @returns Result of the analysis function
     */
    public withConfig<T>(config: typeof DEFAULT_CONFIG, analysisFunction: () => T): T {
        try {
            zxcvbnOptions.setOptions(config)
            return analysisFunction()
        } finally {
            // Always restore default configuration
            zxcvbnOptions.setOptions(DEFAULT_CONFIG)
        }
    }

    /**
     * Reset to default configuration
     */
    public reset(): void {
        zxcvbnOptions.setOptions(DEFAULT_CONFIG)
    }

    /**
     * Check if manager is properly initialized
     */
    public isReady(): boolean {
        return this.isInitialized
    }
}

/**
 * Convenience function to get the manager instance
 */
export const getZxcvbnManager = (): ZxcvbnManager => {
    return ZxcvbnManager.getInstance()
}

/**
 * Utility function to safely analyze password with user inputs
 * @param userInputs - User-specific words to include in analysis
 * @param languages - Languages to include in dictionary
 * @returns Analysis function that can be called with zxcvbn
 */
export const createPasswordAnalyzer = (
    userInputs: string[] = [],
    languages: string[] = ['en']
) => {
    const manager = getZxcvbnManager()
    const config = manager.createConfigWithUserInputs(userInputs, languages)

    return <T>(analysisFunction: () => T): T => {
        return manager.withConfig(config, analysisFunction)
    }
}