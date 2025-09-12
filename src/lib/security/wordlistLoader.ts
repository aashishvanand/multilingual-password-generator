/**
 * @file wordlistLoader.ts
 * @description Utility for loading wordlists for password strength analysis
 * Loads wordlists from public/wordlists based on user language selection
 */

import { getLanguageCode } from '../utils/languageCodes';
import type { PasswordOptions } from '@/types';

// Simple cache to prevent re-fetching same wordlists
const wordlistCache = new Map<string, string[]>();

/**
 * Load a single wordlist for a given language
 * @param {string} language - The language name (e.g., 'tamil', 'hindi')
 * @returns {Promise<string[]>} Array of words from the wordlist
 */
export async function loadWordlist(language: string): Promise<string[]> {
    const langCode = getLanguageCode(language);

    // Check cache first
    if (wordlistCache.has(langCode)) {
        console.log(`✅ Using cached wordlist for ${language} (${langCode})`);
        return wordlistCache.get(langCode)!;
    }

    try {
        console.log(`📥 Loading wordlist for ${language} (${langCode})...`);
        
        const response = await fetch(`/wordlists/${langCode}_words.json`);
        
        if (!response.ok) {
            throw new Error(`Wordlist not found for language: ${language} (${langCode})`);
        }

        const words: string[] = await response.json();
        wordlistCache.set(langCode, words);
        
        console.log(`✅ Wordlist loaded for ${language} (${langCode}): ${words.length} words`);
        return words;
    } catch (error) {
        console.error(`❌ Failed to load wordlist for ${language}:`, error);
        return [];
    }
}

/**
 * Load multiple wordlists based on user selection
 * @param {string[]} selectedLanguages - Array of selected language names
 * @returns {Promise<{[language: string]: string[]}>} Object mapping languages to their wordlists
 */
export async function loadSelectedWordlists(selectedLanguages: string[]): Promise<{[language: string]: string[]}> {
    console.log(`🔄 Loading wordlists for selected languages:`, selectedLanguages);
    
    const results: {[language: string]: string[]} = {};
    
    // Load all wordlists concurrently
    const loadPromises = selectedLanguages.map(async (language) => {
        const words = await loadWordlist(language);
        return { language, words };
    });
    
    const loadedWordlists = await Promise.all(loadPromises);
    
    // Populate results object
    for (const { language, words } of loadedWordlists) {
        results[language] = words;
    }
    
    const totalWords = Object.values(results).reduce((sum, words) => sum + words.length, 0);
    console.log(`🎉 All wordlists loaded! Total words: ${totalWords}`);
    
    return results;
}

/**
 * Get selected languages from PasswordOptions
 * Filters out character sets (uppercase, lowercase, etc.) and returns only language names
 * @param {PasswordOptions} options - PasswordOptions object
 * @returns {string[]} Array of selected language names
 */
export function getSelectedLanguages(options: PasswordOptions): string[] {
    // Character sets that should be excluded from language wordlists
    const characterSets = ['uppercase', 'lowercase', 'numbers', 'symbols'];
    
    const selectedLanguages = Object.entries(options)
        .filter(([key, enabled]) => enabled && !characterSets.includes(key))
        .map(([language]) => language);
    
    console.log(`🌍 Selected languages:`, selectedLanguages);
    return selectedLanguages;
}

/**
 * Clear the wordlist cache (useful for testing or memory management)
 */
export function clearWordlistCache(): void {
    wordlistCache.clear();
    console.log(`🧹 Wordlist cache cleared`);
}