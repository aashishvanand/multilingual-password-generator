import { Typography, Box, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import styles from './styles.module.css'

interface PasswordFieldProps {
    password: string
    isEditing: boolean
    onEdit: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
    mode: 'light' | 'dark'
}

export function PasswordField({
    password,
    isEditing,
    onEdit,
    onChange,
    onClick,
    mode
}: PasswordFieldProps) {
    return (
        <Box className={styles.passwordContainer}>
            {isEditing ? (
                <input
                    type="text"
                    value={password}
                    onChange={onChange}
                    autoFocus
                    className={styles.passwordInput}
                />
            ) : (
                <Typography
                    variant="h4"
                    component="div"
                    fontFamily="monospace"
                    onClick={onClick}
                    className={styles.passwordText}
                >
                    {password}
                </Typography>
            )}
            <IconButton
                onClick={onEdit}
                className={styles.editButton}
                sx={{ color: mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.7)' }}
            >
                <Edit />
            </IconButton>
        </Box>
    )
}