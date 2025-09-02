/**
 * @file robots.ts
 * @description Generates the robots.txt file for the website, controlling web crawler access.
 */

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/'
            }
        ],
        sitemap: 'https://your-domain.com/sitemap.xml',
        host: 'https://passwords.aashishvanand.me'
    }
}