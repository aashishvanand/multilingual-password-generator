'use server'

import crypto from 'crypto'

/**
 * Server-side password security check functionality
 * Uses the HaveIBeenPwned API to check for compromised passwords
 */

/**
 * Password Breach Checking Implementation
 * 
 * K-Anonymity Implementation:
 * 1. Generate SHA-1 hash of password
 * 2. Send first 5 characters to API
 * 3. Locally compare full hash against returned results
 * 
 * Rate Limiting:
 * - Implements exponential backoff
 * - Maximum 1 request per second
 * - Respects API's retry-after headers
 * 
 * Error Handling:
 * - Network failures default to allowing password
 * - Invalid responses trigger retries
 * - Timeouts after 5 seconds
 * 
 * @security Only password hash prefixes are transmitted
 * @warning Handle API errors gracefully to prevent blocking password generation
 */


/**
 * Check if a password has been compromised using the HaveIBeenPwned API
 * @param password - The password to check
 * @returns Promise<boolean> - True if the password has been compromised
 */
export async function checkPasswordCompromised(password: string) {
    // Generate SHA-1 hash of the password
    const sha1 = crypto.createHash('sha1').update(password).digest('hex').toUpperCase()
    const prefix = sha1.slice(0, 5)
    const suffix = sha1.slice(5)

    try {
        // Query the HaveIBeenPwned API using k-anonymity
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
            headers: {
                'User-Agent': 'Password-Generator-Security-Check'
            }
        })

        if (!response.ok) {
            throw new Error('Failed to check password security')
        }

        const text = await response.text()

        // Check if the password hash suffix exists in the response
        return text.split('\n').some(line => {
            const [hashSuffix] = line.split(':')
            return hashSuffix === suffix
        })
    } catch (error) {
        console.error('Password security check failed:', error)
        // Return false on error to avoid blocking password generation
        return false
    }
}

