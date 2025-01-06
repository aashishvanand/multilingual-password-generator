import { useEffect } from 'react'

/**
 * Hook for handling keyboard shortcuts
 * Manages copy and regenerate password shortcuts
 */

interface KeyboardShortcutProps {
    onCopy: () => void
    onGenerate: () => void
}

export function useKeyboardShortcuts({ onCopy, onGenerate }: KeyboardShortcutProps) {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
                event.preventDefault()
                onCopy()
            }
            if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
                event.preventDefault()
                onGenerate()
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [onCopy, onGenerate])
}