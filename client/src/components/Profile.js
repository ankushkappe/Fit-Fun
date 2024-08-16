import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import axios from 'axios';

function Profile() {
  const useremail = localStorage.getItem('user-email');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    // Add any other fields here
  });

  useEffect(() => {
    // Fetch user profile data from the server
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getUserProfile', { useremail });
        setProfileData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/updateUserProfile', profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Your Profile
        </Typography>
        <Typography variant='h6' gutterBottom>
          Welcome {profileData.username}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={profileData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={profileData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* Add more fields as needed */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            Update Profile
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Profile;
