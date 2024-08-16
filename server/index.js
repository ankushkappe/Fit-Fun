const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const generateRoute = require('./routes/workout');
const workoutplanRoute = require('./routes/workoutplan');
const emailRoute = require('./routes/email');
const dietplanRoute = require('./routes/dietplan');
require("dotenv").config();

const { MONGO_URL } = process.env;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // allow cookies from frontend
}));

// Connect to MongoDB
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        w: 'majority',
    })
    .then(() => console.log('Pinged your deployment. You successfully connected to MongoDB!"'))
    .catch(err => console.error(err));

// Middleware
app.use(cookieParser());
app.use(express.json());


// Routes
app.use('/', authRoute);
app.use('/', generateRoute);
app.use('/', emailRoute);
app.use('/', workoutplanRoute);
app.use('/', dietplanRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
