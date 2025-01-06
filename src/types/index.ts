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