const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createSecretToken } = require("../util/SecretToken");
const { userVerification } = require("../Middleware/Authmiddleware");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }

        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(200).json({ message: "User logged in successfully", success: true, token });
        

    } catch (error) {
        console.error('Error in /login route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword, createdAt } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUsername = await User.findOne({ username });
        const existingUser = await User.findOne({ email });
        if (existingUsername) {
            return res.status(409).json({ message: "Username is already Taken..! Try Another one."})
        }
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const user = new User({ email, username, password, createdAt });
        await user.save();

        createSecretToken(res, user._id);
        
        res.status(201).json({ message: "User signed up successfully", success: true, user });
    } catch (error) {
        console.error('Error in /register route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Apply userVerification middleware to this route
router.post('/', userVerification);

//User Profile Route
router.get('/getUserProfile', async (req, res) => {
    try {
        const {useremail} = req.body;
        const user = await User.findOne({useremail});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


//User update Route
router.post('/updateUserProfile', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password; // Make sure to hash the password before saving
        // Hashing will be done by User Schema Model

        await user.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
