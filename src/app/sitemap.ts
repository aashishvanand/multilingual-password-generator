/**
 * @file sitemap.ts
 * @description Generates the sitemap.xml for the website, helping search engines with indexing.
 */

export default function sitemap() {
    return [
        {
            url: 'https://passwords.aashishvanand.me/',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        }
    ]
}