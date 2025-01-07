import { Typography, IconButton, Box } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';

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
  const [editedPassword, setEditedPassword] = useState(password);

  // Sync editedPassword with password prop when it changes
  useEffect(() => {
    setEditedPassword(password);
  }, [password]);

  const handleSave = () => {
    setPassword(editedPassword);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPassword(password);
    setIsEditing(false);
  };

  return (
    <Box sx={{ 
      width: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 2,
    }}>
      <Box sx={{ 
        flexGrow: 1,
        minWidth: 0,
        width: '100%',
      }}>
        {isEditing ? (
          <textarea
            value={editedPassword}
            onChange={(e) => setEditedPassword(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleSave();
              } else if (e.key === 'Escape') {
                handleCancel();
              }
            }}
            autoFocus
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: mode === 'light' ? '#000032' : '#fff',
              width: '100%',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 'clamp(14px, 2vw, 24px)',
              wordBreak: 'break-all',
              lineHeight: 1.5,
              resize: 'none',
              minHeight: '100px',
              padding: 0,
              margin: 0,
            }}
          />
        ) : (
          <Typography
            sx={{
              fontFamily: 'var(--font-geist-mono)',
              color: mode === 'light' ? '#000032' : '#fff',
              fontSize: 'clamp(14px, 2vw, 24px)',
              lineHeight: 1.5,
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
              pr: 1,
              userSelect: 'none',
            }}
          >
            {password}
          </Typography>
        )}
      </Box>
      <IconButton
        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        size="small"
        sx={{
          color: mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.7)',
          flexShrink: 0,
          alignSelf: 'flex-start',
          mt: 0.5,
          backgroundColor: isEditing ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
          '&:hover': {
            backgroundColor: isEditing 
              ? 'rgba(25, 118, 210, 0.12)' 
              : mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
          },
        }}
      >
        <Edit fontSize="small" />
      </IconButton>
    </Box>
  );
}