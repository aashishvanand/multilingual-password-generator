/**
 * Simplified zxcvbn Configuration Manager
 * 
 * This utility helps manage zxcvbn options safely without causing memory leaks
 * or global state pollution. Simplified to work with the actual zxcvbn API.
 */

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
        const config = { ...DEFAULT_CONFIG }

        // Add language dictionaries
        const combinedDictionary = { ...DEFAULT_CONFIG.dictionary }
        
        for (const lang of languages) {
            const langConfig = LANGUAGE_CONFIGS[lang]
            if (langConfig) {
                Object.assign(combinedDictionary, langConfig.dictionary)
                // Use the last language's translations
                config.translations = langConfig.translations
                if (langConfig.graphs) {
                    config.graphs = langConfig.graphs
                }
            }
        }

        // Add user inputs as a dictionary array (zxcvbn expects arrays)
        if (userInputs.length > 0) {
            const userInputDict = this.createUserInputDictionary(userInputs)
            // Use type assertion to add userInputs property
            (combinedDictionary as Record<string, string[] | number>).userInputs = userInputDict
        }

        config.dictionary = combinedDictionary
        return config
    }

    /**
     * Convert user inputs to dictionary format that zxcvbn expects
     * @param userInputs - Array of user input strings
     * @returns Array of normalized user inputs
     */
    private createUserInputDictionary(userInputs: string[]): string[] {
        const dictionary: string[] = []
        
        userInputs.forEach(input => {
            if (typeof input === 'string' && input.trim().length > 0) {
                // Normalize input: lowercase, trim, and handle common variations
                const normalized = input.toLowerCase().trim()
                
                // Add the input itself
                dictionary.push(normalized)
                
                // Add common variations if input is long enough
                if (normalized.length >= 3) {
                    // Add without common suffixes/prefixes
                    const withoutNumbers = normalized.replace(/\d+$/g, '')
                    if (withoutNumbers.length >= 3 && withoutNumbers !== normalized) {
                        dictionary.push(withoutNumbers)
                    }
                    
                    // Add reversed (for passwords like "password" -> "drowssap")
                    const reversed = normalized.split('').reverse().join('')
                    if (reversed !== normalized) {
                        dictionary.push(reversed)
                    }
                }
            }
        })
        
        return dictionary
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