/**
 * Application-wide constants for password generation and configuration
 */

export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 128
export const DEFAULT_PASSWORD_LENGTH = 14
export const MIN_WORD_COUNT = 3
export const MAX_WORD_COUNT = 8
export const DEFAULT_WORD_COUNT = 4

/**
 * Labels for password strength levels
 */
export const PASSWORD_STRENGTH_LABELS = [
  'Very Weak',
  'Weak',
  'Medium',
  'Strong',
  'Very Strong'
] as const

/**
 * Supported languages configuration for password generation
 * Grouped by region for better organization
 */
export const SUPPORTED_LANGUAGES = {
  PASSWORD: {
    ASIA: [
        { code: 'bengali', label: 'Bengali' },
        { code: 'gujarati', label: 'Gujarati' },
        { code: 'hindi', label: 'Hindi' },
        { code: 'iranianPersian', label: 'Iranian Persian' },
        { code: 'japanese', label: 'Japanese' },
        { code: 'javanese', label: 'Javanese' },
        { code: 'kannada', label: 'Kannada' },
        { code: 'korean', label: 'Korean' },
        { code: 'malayalam', label: 'Malayalam' },
        { code: 'mandarin', label: 'Mandarin' },
        { code: 'manipuri', label: 'Manipuri' },
        { code: 'odia', label: 'Odia' },
        { code: 'punjabi', label: 'Punjabi' },
        { code: 'santali', label: 'Santali' },
        { code: 'tamil', label: 'Tamil' },
        { code: 'telugu', label: 'Telugu' },
        { code: 'thai', label: 'Thai' },
        { code: 'turkish', label: 'Turkish' },
        { code: 'urdu', label: 'Urdu' },
        { code: 'vietnamese', label: 'Vietnamese' },
    ],
    EUROPE: [
        { code: 'bulgarian', label: 'Bulgarian' },
        { code: 'croatian', label: 'Croatian' },
        { code: 'czech', label: 'Czech' },
        { code: 'danish', label: 'Danish' },
        { code: 'dutch', label: 'Dutch' },
        { code: 'english', label: 'English' },
        { code: 'estonian', label: 'Estonian' },
        { code: 'french', label: 'French' },
        { code: 'greek', label: 'Greek' },
        { code: 'hungarian', label: 'Hungarian' },
        { code: 'italian', label: 'Italian' },
        { code: 'latvian', label: 'Latvian' },
        { code: 'lithuanian', label: 'Lithuanian' },
        { code: 'maltese', label: 'Maltese' },
        { code: 'romanian', label: 'Romanian' },
        { code: 'russian', label: 'Russian' },
        { code: 'slovenian', label: 'Slovenian' },
        { code: 'spanish', label: 'Spanish' },
        { code: 'swedish', label: 'Swedish' },
        { code: 'welsh', label: 'Welsh' },
    ]
  },
  PASSPHRASE: {
    ASIA: [
        { code: 'bengali', label: 'Bengali' },
        { code: 'gujarati', label: 'Gujarati' },
        { code: 'hindi', label: 'Hindi' },
        { code: 'iranianPersian', label: 'Iranian Persian' },
        { code: 'japanese', label: 'Japanese' },
        { code: 'javanese', label: 'Javanese' },
        { code: 'kannada', label: 'Kannada' },
        { code: 'korean', label: 'Korean' },
        { code: 'malayalam', label: 'Malayalam' },
        { code: 'mandarin', label: 'Mandarin' },
        { code: 'manipuri', label: 'Manipuri' },
        { code: 'odia', label: 'Odia' },
        { code: 'punjabi', label: 'Punjabi' },
        { code: 'santali', label: 'Santali' },
        { code: 'tamil', label: 'Tamil' },
        { code: 'telugu', label: 'Telugu' },
        { code: 'thai', label: 'Thai' },
        { code: 'turkish', label: 'Turkish' },
        { code: 'urdu', label: 'Urdu' },
        { code: 'vietnamese', label: 'Vietnamese' },
    ],
    EUROPE: [
        { code: 'bulgarian', label: 'Bulgarian' },
        { code: 'croatian', label: 'Croatian' },
        { code: 'czech', label: 'Czech' },
        { code: 'danish', label: 'Danish' },
        { code: 'dutch', label: 'Dutch' },
        { code: 'english', label: 'English' },
        { code: 'estonian', label: 'Estonian' },
        { code: 'french', label: 'French' },
        { code: 'greek', label: 'Greek' },
        { code: 'hungarian', label: 'Hungarian' },
        { code: 'italian', label: 'Italian' },
        { code: 'latvian', label: 'Latvian' },
        { code: 'lithuanian', label: 'Lithuanian' },
        { code: 'maltese', label: 'Maltese' },
        { code: 'romanian', label: 'Romanian' },
        { code: 'russian', label: 'Russian' },
        { code: 'slovenian', label: 'Slovenian' },
        { code: 'spanish', label: 'Spanish' },
        { code: 'swedish', label: 'Swedish' },
        { code: 'welsh', label: 'Welsh' },
    ]
  }
} as const;