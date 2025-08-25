'use client'

import seedrandom from 'seedrandom';
import { getLanguageCode } from '../utils/languageCodes';

// Define the structure for the options passed to the generator
type GenerateOptions = {
  language?: string
  minLength?: number
  maxLength?: number
  seed?: string
}

// A simple in-memory cache to store fetched wordlists.
// This prevents the app from re-fetching the same language file repeatedly.
const wordlistCache = new Map<string, string[]>()

/**
 * Asynchronously fetches a wordlist for a given language.
 * Wordlists are expected to be in the `/public/wordlists/` directory.
 * @param {string} language - The language code (e.g., 'en', 'hi').
 * @returns {Promise<string[]>} A promise that resolves to an array of words.
 */
async function getWordlist(language: string): Promise<string[]> {
    const langCode = getLanguageCode(language); // Get the 2-letter code

    if (wordlistCache.has(langCode)) {
        return wordlistCache.get(langCode)!
    }

    try {
        // Use the language code to build the correct URL
        const response = await fetch(`/wordlists/${langCode}_words.json`)

        if (!response.ok) {
            throw new Error(`Wordlist not found for language: ${language} (${langCode})`)
        }

        const words: string[] = await response.json()
        wordlistCache.set(langCode, words)
        return words
    } catch (error) {
        console.error(`Failed to load wordlist for ${language}:`, error)
        return []
    }
}

export const wordGenerator = {
    /**
     * Generates a random word based on the provided options.
     * It fetches the required wordlist asynchronously.
     * @param {GenerateOptions} options - Configuration for word generation.
     * @returns {Promise<string>} A promise that resolves to a random word.
     */
    generate: async (options: GenerateOptions = {}): Promise<string> => {
        const { language = 'english', minLength = 3, maxLength = 8, seed } = options
        
        const wordlist = await getWordlist(language) // No change needed here

        if (wordlist.length === 0) {
            return 'Error'
        }

        const suitableWords = wordlist.filter(
            (word) => word.length >= minLength && word.length <= maxLength
        )

        const targetList = suitableWords.length > 0 ? suitableWords : wordlist;
        
        const rng = seed ? seedrandom(seed) : Math.random;
        const randomIndex = Math.floor(rng() * targetList.length);

        return targetList[randomIndex]
    }
}