interface JsonLdProps {
    canonicalUrl?: string;
}

export const JsonLd = ({ canonicalUrl = 'https://passwords.aashishvanand.me/' }: JsonLdProps) => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Multilingual Password Generator',
        description: 'Generate secure passwords with support for multiple languages and scripts',
        url: canonicalUrl,
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'All',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
        },
        featureList: [
            'Support for 35+ languages and scripts',
            'Password strength analysis',
            'Breach checking capabilities',
            'Customizable character sets',
            'Cryptographically secure generation',
            'Real-time strength feedback',
            'Dark/Light theme support'
        ],
        browserRequirements: 'Requires a modern web browser with JavaScript enabled',
        permissions: 'No special permissions required',
        softwareVersion: '0.1.0'
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};