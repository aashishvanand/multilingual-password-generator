# Multilingual Password Generator

A secure, feature-rich password generator supporting multiple languages and scripts, with comprehensive password strength analysis and breach checking capabilities.

## 🔑 Key Features

- **Multi-language Support**: Generate passwords using characters from 24+ languages and scripts
- **Dual Generation Modes**: 
  - Traditional password generation with customizable character sets
  - Passphrase generation using words from selected languages
- **Advanced Security Features**:
  - Real-time password strength analysis using zxcvbn
  - Password breach checking via HaveIBeenPwned API
  - Cryptographically secure random generation
  - Password pattern analysis and feedback
- **Modern UI/UX**:
  - Responsive Material-UI design
  - Dark/Light theme support
  - Copy to clipboard functionality
  - Real-time password strength feedback
  - Keyboard shortcuts for common actions
- **Accessibility**: Full keyboard navigation and screen reader support

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15.1.3
- **UI Library**: React 19.0.0
- **Language**: TypeScript 5
- **Styling**: Material-UI (MUI) v6.3.1 + Emotion

### Security Libraries
- **Password Analysis**: zxcvbn-ts v3.0.4
- **Random Generation**: seedrandom v3.0.5
- **API Integration**: HaveIBeenPwned API

### Development Tools
- ESLint v9 with Next.js configuration
- TypeScript strict mode
- Turbopack for development

## 🌍 Supported Languages

### Indian Scripts
- Hindi (हिन्दी)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Bengali (বাংলা)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Odia (ଓଡ଼ିଆ)
- Punjabi (ਪੰਜਾਬੀ)
- Urdu (اردو)
- Santali (ᱥᱟᱱᱛᱟᱲᱤ)
- Manipuri (মৈতৈলোন্)

### International Scripts
- English (Latin)
- Mandarin (中文)
- Spanish (Español)
- Russian (Русский)
- Japanese (日本語)
- Vietnamese (Tiếng Việt)
- Turkish (Türkçe)
- Korean (한국어)
- French (Français)
- Italian (Italiano)
- Iranian Persian (فارسی)
- Javanese (ꦧꦱꦗꦮ)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/multilingual-password-generator.git

# Navigate to project directory
cd multilingual-password-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Usage

1. Select generation mode (Password/Passphrase)
2. Choose desired languages and character sets
3. Adjust length/word count as needed
4. Generate and copy secure passwords

### Keyboard Shortcuts
- `Ctrl/Cmd + C`: Copy password
- `Ctrl/Cmd + R`: Generate new password

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js app directory
├── components/                   # React components
│   ├── password/                # Password-related components
│   └── ui/                      # Shared UI components
├── lib/                         # Core functionality
│   ├── generators/              # Password generation logic
│   ├── security/                # Security features
│   └── utils/                   # Utility functions
├── styles/                      # Global styles
└── types/                       # TypeScript definitions
```

## 🔒 Security Considerations

### Password Generation
- Uses cryptographically secure random number generation
- Implements entropy pooling for enhanced randomness
- Avoids predictable patterns in generated passwords

### Password Analysis
- Real-time strength calculation using multiple factors
- Pattern recognition for common vulnerabilities
- Comprehensive crack time estimation

### API Security
- K-anonymity for breach checking
- Rate limiting on API requests
- Secure HTTPS communication

## 🧪 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup Development Environment
```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Run linting
npm run lint
```

### Testing
```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode guidelines
- Maintain accessibility standards
- Add tests for new features
- Update documentation as needed

## 📄 License

MIT License - see LICENSE.md for details

## 🙏 Acknowledgments

### Libraries
- [zxcvbn-ts](https://github.com/zxcvbn-ts/zxcvbn) - Password strength estimation
- [Material-UI](https://mui.com/) - UI components
- [seedrandom](https://github.com/davidbau/seedrandom) - Random number generation
- [Next.js](https://nextjs.org/) - React framework

### Word Lists and Resources
- Word lists derived from various open-source language resources
- Security best practices from OWASP guidelines
- Unicode character sets from Unicode Consortium

### Services
- [HaveIBeenPwned](https://haveibeenpwned.com/) - Password breach checking

## 🤝 Support

For support, please open an issue in the repository or contact the maintainers.