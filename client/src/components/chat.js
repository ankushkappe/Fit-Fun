import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box } from '@mui/material';

const ChatComponent = () => {
    const [conversation, setConversation] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleUserInput = async () => {
        const updatedConversation = [...conversation, `User: ${userInput}`];
        setConversation(updatedConversation);
        setUserInput('');
        setError(''); // Clear previous errors

        try {
            const res = await axios.post('/generate-workout', { conversation: updatedConversation });
            const chatResponse = res.data.response;
            setConversation([...updatedConversation, `Coach: ${chatResponse}`]);
            setResponse(chatResponse);
        } catch (error) {
            console.log("Request recieved at Server")
            console.error("Error Code 429 - You exceeded your current quota, please check your plan and billing details")
            console.error('Error generating workout plan:', error.message, error.response ? error.response.data : null);
            setError('Failed to generate workout plan. Please try again.');
        }
    };

    return (
        <Box>
            <Typography variant="h5">Chat with Your Workout Coach</Typography>
            <Box>
                {conversation.map((line, index) => (
                    <Typography key={index}>{line}</Typography>
                ))}
            </Box>
            <TextField
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                label="Type your message"
                fullWidth
            />
            <Button onClick={handleUserInput} variant="contained" color="primary">Send</Button>
            {response && (
                <Box>
                    <Typography variant="h6">Generated Workout Plan:</Typography>
                    <Typography>{response}</Typography>
                </Box>
            )}
            {error && (
                <Box>
                    <Typography variant="h6" color="error">{error}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ChatComponent;