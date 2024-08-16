// ForgotPassword.js
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack, styled } from '@mui/material';
import { SuccessMessage, ErrorMessage } from './MessageStyles';
import axios from 'axios';

const defaultTheme = createTheme();

const Ulstyle = styled(Stack)(() => ({
    height: '720px',
    backgroundImage: 'url(http://localhost:3000/gunnar.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));


const ForgotPassword = () => {
  const [email, setemail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);


  const handleSubmit = async (e) => {
      try {
          const response = await axios.post('http://localhost:4000/forgot-password', { email });

          if (response.data.success) {
              setMessage("A password reset link has been sent to your email.");
          } else {
              setMessage("Failed to send reset link. Please check your email.");
          }
      } catch (error) {
          setMessage("An error occurred. Please try again.");
      }   
  };

  return (
    <Ulstyle>
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 20,
                    borderRadius: '10px',
                    display: 'flex',
                    padding: '40px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: '#FFFFFF'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Reset Link
                    </Button>
                </Box>
                {message && (
                    isError ? <ErrorMessage>{message}</ErrorMessage> : <SuccessMessage>{message}</SuccessMessage>
                )}
            </Box>
        </Container>
    </ThemeProvider>
</Ulstyle>
  );
};

export default ForgotPassword;