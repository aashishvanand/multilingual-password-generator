'use client'

import React from 'react';
import { Box, Paper, Container, Typography, useMediaQuery, Skeleton, Snackbar, Alert } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import { usePasswordGeneration } from './hooks/usePasswordGeneration'
import { usePasswordStrength } from '@/lib/security/passwordStrength'
import { PasswordDisplay } from '../PasswordDisplay'
import { OptionsPanel } from './OptionsPanel'
import { ControlButtons } from '../PasswordDisplay/ControlButtons'
import { useTheme } from '@/components/ui/theme/hooks/useTheme'
import { ErrorBoundary } from './ErrorBoundary'
import ThemeToggle from './ThemeToggle'
import PlatformCompatibility from './PlatformCompatibility'

/**
 * Main Password Generator component that orchestrates the password generation UI
 * Handles the display of password, generation options, and strength analysis
 */

export function PasswordGenerator() {
  const { theme, mode, toggleTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  const {
    password,
    wordCount,
    type,
    copied,
    length,
    hasError,
    isEditing,
    options,
    isClient,
    snackbarOpen,
    setPassword,
    setWordCount,
    setLength,
    setIsEditing,
    handleCopy,
    handleTypeChange,
    handleOptionsChange,
    generatePassword,
    handleSnackbarClose
  } = usePasswordGeneration();

  const strengthResult = usePasswordStrength(password);

  if (!isClient) {
    return (
      <Container maxWidth="sm" sx={{ my: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </Box>
          <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Skeleton variant="rectangular" width="50%" height={40} />
            <Skeleton variant="rectangular" width="50%" height={40} />
          </Box>
          <Skeleton variant="rectangular" height={200} />
        </Paper>
      </Container>
    );
  }

  // Desktop Layout
  const DesktopLayout = () => (
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

          <ControlButtons
            copied={copied}
            onCopy={handleCopy}
            onGenerate={generatePassword}
            mode={mode}
          />

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

          {/* Platform Compatibility */}
          <PlatformCompatibility mode={mode} />
        </Paper>
      </Container>
    </Box>
  );

  // Mobile Layout
  const MobileLayout = () => (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: mode === 'light' ? '#1976d2' : '#000',
      p: 2,
      position: 'relative',
    }}>
      <ThemeToggle mode={mode} onToggle={toggleTheme} />

      <Container maxWidth="sm" sx={{ my: 'auto' }}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            p: 2,
            borderRadius: 4,
            bgcolor: mode === 'light' ? 'white' : '#121212',
          }}
        >
          {/* Strength Indicator */}
          <Box sx={{
            mb: 3,
            display: 'flex',
            flexDirection: 'column', // Changed from 'row'
            alignItems: 'flex-start',   // Changed from 'center'
            gap: 1, // Added for spacing
          }}>
            <Typography variant="body2" color="text.secondary">
              Score: <span style={{ color: '#1976d2', fontWeight: 500 }}>
                {['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][strengthResult.score]}
              </span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time to crack: <span style={{ color: '#1976d2', fontWeight: 500 }}>
                {strengthResult.crackTimesDisplay.offlineSlowHashing1e4PerSecond}
              </span>
            </Typography>
          </Box>

          {/* Password Display */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: mode === 'light' ? '#f5f7fa' : '#1e1e1e',
              borderRadius: 3,
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

          <Box sx={{ mb: 4 }}>
            <ControlButtons
              copied={copied}
              onCopy={handleCopy}
              onGenerate={generatePassword}
              mode={mode}
            />
          </Box>

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

          {/* Platform Compatibility */}
          <PlatformCompatibility mode={mode} />
        </Paper>
      </Container>
    </Box>
  );

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Password copied to clipboard!
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </ErrorBoundary>
  );
}