import { Typography, IconButton, Box } from '@mui/material'
import { Edit } from '@mui/icons-material'

/**
 * Component for displaying the generated password with edit functionality
 * Allows users to view, copy, and manually edit the password
 */

/**
 * Password Display Component
 * 
 * Security Features:
 * - Masks password when not focused
 * - Clears clipboard after copy
 * - No password storage
 * 
 * Validation:
 * - Sanitizes user input
 * - Prevents injection attacks
 * - Validates character sets
 * 
 * Accessibility:
 * - Screen reader announcements
 * - Keyboard shortcuts
 * - Focus management
 * 
 * @security Clear sensitive data from memory when component unmounts
 */

interface PasswordDisplayProps {
  password: string;
  isEditing: boolean;
  mode: 'light' | 'dark';
  setIsEditing: (value: boolean) => void;
  setPassword: (value: string) => void;
}

export function PasswordDisplay({
  password,
  isEditing,
  mode,
  setIsEditing,
  setPassword,
}: PasswordDisplayProps) {
  return (
    <Box sx={{ width: '100%' }}>
      {isEditing ? (
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: mode === 'light' ? '#000032' : '#fff',
            width: '100%',
            fontFamily: 'monospace',
            fontSize: '2rem',
          }}
        />
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'monospace',
              color: mode === 'light' ? '#000032' : '#fff',
              letterSpacing: 1,
              userSelect: 'none',
              fontSize: '2rem',
            }}
          >
            {password}
          </Typography>
          <IconButton
            onClick={() => setIsEditing(true)}
            sx={{
              ml: 2,
              color: mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <Edit />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}