import { SUPPORTED_LANGUAGES } from "@/lib/utils/constants";

// Dynamically create a union type of all language codes from the constants
type IndianLanguageCode = typeof SUPPORTED_LANGUAGES.INDIAN[number]['code'];
type InternationalLanguageCode = typeof SUPPORTED_LANGUAGES.INTERNATIONAL[number]['code'];
type PassphraseLanguageCode = typeof SUPPORTED_LANGUAGES.PASSPHRASE[number]['code'];

export type LanguageCode = 
    | 'uppercase' 
    | 'lowercase' 
    | 'numbers' 
    | 'symbols' 
    | IndianLanguageCode 
    | InternationalLanguageCode
    | PassphraseLanguageCode;

/**
 * Type definitions for password generation options
 */

export interface PasswordOptions {
  // Character sets
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean

  // Indian Scripts
  hindi: boolean
  tamil: boolean
  telugu: boolean
  bengali: boolean
  gujarati: boolean
  kannada: boolean
  malayalam: boolean
  odia: boolean
  punjabi: boolean
  urdu: boolean
  santali: boolean
  manipuri: boolean

  // International Scripts
  english: boolean
  dutch: boolean
  swedish: boolean
  danish: boolean
  hungarian: boolean
  lithuanian: boolean
  maltese: boolean
  estonian: boolean
  bulgarian: boolean
  czech: boolean
  croatian: boolean
  latvian: boolean
  romanian: boolean
  slovenian: boolean
  welsh: boolean
  mandarin: boolean
  spanish: boolean
  russian: boolean
  japanese: boolean
  vietnamese: boolean
  turkish: boolean
  korean: boolean
  french: boolean
  italian: boolean
  iranianPersian: boolean
  javanese: boolean
  greek: boolean,
  thai: boolean

  [key: string]: boolean
}

/**
 * Language configuration interface
 */
export interface Language {
  code: string
  label: string
  script: string
}

/**
 * Password generation configuration interface
 */
export interface GenerationConfig {
  type: 'password' | 'passphrase'
  length: number
  wordCount: number
  options: PasswordOptions
}