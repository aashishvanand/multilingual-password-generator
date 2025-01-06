'use client'

import { Box, Paper, Container, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { usePasswordGeneration } from './hooks/usePasswordGeneration'
import { usePasswordStrength } from '@/lib/security/passwordStrength'
import { PasswordDisplay } from '../PasswordDisplay'
import { OptionsPanel } from './OptionsPanel'
import { ControlButtons } from '../PasswordDisplay/ControlButtons'
import { useTheme } from '@/components/ui/theme/hooks/useTheme'
import { ErrorBoundary } from './ErrorBoundary'
import ThemeToggle from './ThemeToggle'

/**
 * Main Password Generator component that orchestrates the password generation UI
 * Handles the display of password, generation options, and strength analysis
 */

export function PasswordGenerator() {
  // Custom hooks for password generation and theme management
  const {
    password,
    wordCount,
    type,
    copied,
    length,
    hasError,
    isEditing,
    options,
    setPassword,
    setWordCount,
    setLength,
    setIsEditing,
    handleCopy,
    handleTypeChange,
    handleOptionsChange,
    generatePassword,
  } = usePasswordGeneration()

  const { theme, mode, toggleTheme } = useTheme()
  const strengthResult = usePasswordStrength(password)

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: mode === 'light' ? '#1976d2' : '#000',
          px: 2,
          py: 4,
          transition: 'background-color 0.3s ease',
        }}>
          <ThemeToggle mode={mode} onToggle={toggleTheme} />
          <Container maxWidth="md">
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                p: 4,
                borderRadius: 4,
                bgcolor: mode === 'light' ? 'white' : '#121212',
                color: mode === 'light' ? 'text.primary' : 'white',
              }}
            >
              {/* Password strength indicator */}
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: mode === 'light' ? 'text.secondary' : 'rgba(255,255,255,0.7)' }}>
                  Your password&apos;s score: <span style={{ color: '#1976d2', fontWeight: 500 }}>
                    {['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][strengthResult.score]}
                  </span>
                </Typography>
                <Typography sx={{ color: mode === 'light' ? 'text.secondary' : 'rgba(255,255,255,0.7)' }}>
                  Estimated time to crack: <span style={{ color: '#1976d2', fontWeight: 500 }}>
                    {strengthResult.crackTimesDisplay.offlineSlowHashing1e4PerSecond}
                  </span>
                </Typography>
              </Box>

              {/* Password display area */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  bgcolor: mode === 'light' ? '#f5f7fa' : '#1e1e1e',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <PasswordDisplay
                  password={password}
                  isEditing={isEditing}
                  mode={mode}
                  setIsEditing={setIsEditing}
                  setPassword={setPassword}
                />
              </Paper>

              {/* Control buttons for copying and regenerating password */}
              <ControlButtons
                copied={copied}
                onCopy={handleCopy}
                onGenerate={generatePassword}
                mode={mode}
              />
              {/* Options panel for password generation settings */}
              <OptionsPanel
                type={type}
                length={length}
                wordCount={wordCount}
                options={options}
                hasError={hasError}
                onTypeChange={handleTypeChange}
                onLengthChange={setLength}
                onWordCountChange={setWordCount}
                onOptionsChange={handleOptionsChange}
                mode={mode}
              />
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  )
}