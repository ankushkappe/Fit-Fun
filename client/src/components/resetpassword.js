import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack, styled } from '@mui/material'
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const defaultTheme = createTheme();

const Ulstyle = styled(Stack)(() => ({
    height: '720px',
    backgroundImage: 'url(http://localhost:3000/gunnar.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

function ResetPassword({ email }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/updateUserProfile', { email, password });

            if (response.data.message === 'Profile updated successfully') {
                setSuccess("Password reset successfully.");
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after successful password reset
                }, 2000);
            } else {
                setError("Failed to reset password.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Ulstyle>
            <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="xs">
            <Box mt={5}>
                <Typography variant="h4" align="center" color={'white'}>Reset Password</Typography>
                <Box mt={3}>
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="primary">{success}</Typography>}
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handlePasswordChange}
                        >
                            Reset Password
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
            </ThemeProvider>
        </Ulstyle>
    );
}

export default ResetPassword;