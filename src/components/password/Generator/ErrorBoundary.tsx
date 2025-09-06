/**
 * @file ErrorBoundary.tsx
 * @description This component provides an error boundary to catch and handle runtime errors gracefully.
 * It prevents the entire application from crashing and displays a user-friendly fallback UI.
 */

import { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Typography, Button } from '@mui/material'

/**
 * Error Boundary component to gracefully handle runtime errors
 * Prevents the entire app from crashing and provides a fallback UI
 */

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    /**
     * Update state when an error occurs
     * @param error - The error that was caught
     */

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    /**
     * Log error details for debugging
     * @param error - The error that was caught
     * @param errorInfo - Additional error information
     */

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Password generator error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" color="error" gutterBottom>
                        Something went wrong
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()}
                        sx={{ mt: 2 }}
                    >
                        Reload Page
                    </Button>
                </Box>
            )
        }

        return this.props.children
    }
}