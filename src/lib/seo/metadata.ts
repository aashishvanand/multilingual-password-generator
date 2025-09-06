/**
 * @file metadata.ts
 * @description This file contains the site's metadata for SEO and social sharing.
 * It provides a centralized configuration for titles, descriptions, and other important SEO tags.
 */

export const siteMetadata = {
    title: 'Multilingual Password Generator - Secure Passwords in 35+ Languages',
    description: 'Generate secure, customizable passwords in 35+ languages including Hindi, Tamil, Chinese, and more. Features password strength analysis, breach checking, and multiple character sets.',
    keywords: [
        'password generator',
        'multilingual password',
        'secure password',
        'password strength',
        'password creator',
        'strong password generator',
        'random password',
        'password tool',
        'indian language password',
        'international password',
        'custom password',
        'password security',
        'safe password',
        'password maker',
        'password checker'
    ],
    openGraph: {
        title: 'Multilingual Password Generator - Create Strong Passwords in 35+ Languages',
        description: 'Generate secure passwords with support for multiple languages, scripts, and customizable options. Free, open-source, and privacy-focused.',
        type: 'website',
        locale: 'en_US',
        url: 'https://passwords.aashishvanand.me',
        siteName: 'Multilingual Password Generator',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Multilingual Password Generator Preview'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Generate Secure Multilingual Passwords',
        description: 'Create strong passwords with support for 24+ languages and scripts. Features password strength analysis and breach checking.',
        images: ['/og-image.png']
    },

}