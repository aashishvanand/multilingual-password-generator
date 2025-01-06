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
  INDIAN: [
    { code: 'hindi', label: 'Hindi', script: 'देवनागरी' },
    { code: 'tamil', label: 'Tamil', script: 'தமிழ்' },
    { code: 'telugu', label: 'Telugu', script: 'తెలుగు' },
    { code: 'bengali', label: 'Bengali', script: 'বাংলা' },
    { code: 'gujarati', label: 'Gujarati', script: 'ગુજરાતી' },
    { code: 'kannada', label: 'Kannada', script: 'ಕನ್ನಡ' },
    { code: 'malayalam', label: 'Malayalam', script: 'മലയാളം' },
    { code: 'odia', label: 'Odia', script: 'ଓଡ଼ିଆ' },
    { code: 'punjabi', label: 'Punjabi', script: 'ਪੰਜਾਬੀ' },
    { code: 'urdu', label: 'Urdu', script: 'اردو' },
    { code: 'santali', label: 'Santali', script: 'ᱥᱟᱱᱛᱟᱲᱤ' },
    { code: 'manipuri', label: 'Manipuri', script: 'মৈতৈলোন্' }
  ],
  INTERNATIONAL: [
    { code: 'english', label: 'English', script: 'Latin' },
    { code: 'mandarin', label: 'Mandarin', script: '中文' },
    { code: 'spanish', label: 'Spanish', script: 'Español' },
    { code: 'russian', label: 'Russian', script: 'Русский' },
    { code: 'japanese', label: 'Japanese', script: '日本語' },
    { code: 'vietnamese', label: 'Vietnamese', script: 'Tiếng Việt' },
    { code: 'turkish', label: 'Turkish', script: 'Türkçe' },
    { code: 'korean', label: 'Korean', script: '한국어' },
    { code: 'french', label: 'French', script: 'Français' },
    { code: 'italian', label: 'Italian', script: 'Italiano' },
    { code: 'iranianPersian', label: 'Iranian Persian', script: 'فارسی' },
    { code: 'javanese', label: 'Javanese', script: 'ꦧꦱꦗꦮ' }
  ]
} as const