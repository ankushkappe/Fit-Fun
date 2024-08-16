import React from 'react';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();


const RoundedButton = styled.button`
  background-color: #1d94f0;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  width: 150px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8bc3f7;
  }

  &:focus {
    outline: none;
  }
`;

const LandingPage = () => {

    let navigate = useNavigate();
    const loginRoute = ()=>{
        navigate('/login');
    }
    const singupRoute = () => {
        navigate('/register');
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(http://localhost:3000/land.jpeg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="div" align="center">
                            <Typography component="h1" variant="h2">
                                Fit & Fun:
                            </Typography>
                            <Typography component="h1" variant="h3">
                                Your AI-Powered
                            </Typography>
                            <Typography component="h1" variant="h3">
                                Workout Companion
                            </Typography>
                        </Typography>
                        <br></br>
                        <br></br>
                        <RoundedButton variant="contained" onClick={loginRoute}>SIGN IN</RoundedButton>
                        <br></br>
                        <RoundedButton variant="contained" onClick={singupRoute}>SIGN UP</RoundedButton>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default LandingPage;
