# Fit & Fun Web Application

This repository contains the source code for the **Fit & Fun** web application, a fitness and diet planner built with the MERN stack. The app features user authentication, a workout planner, a diet planner, and email functionality for password reset.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Environment Variables](#environment-variables)
  - [MongoDB URL](#mongodb-url)
  - [Email Credentials](#email-credentials)
- [Running the Application](#running-the-application)

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- **Node.js** (v14 or above)
- **npm** (comes with Node.js)
- **MongoDB** (either locally or using a cloud service like MongoDB Atlas)

## Project Setup

### Client Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory with the necessary environment variables (if any).

4. Build the client application:
   ```bash
   npm run build
   ```

5. Start the client development server:
   ```bash
   npm start
   ```

### Server Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables as described in the next section.

4. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

### MongoDB URL

1. In the `server` directory, create a `.env` file if it doesn't already exist.

2. Add your MongoDB connection string to the `.env` file:
   ```plaintext
   MONGODB_URL=mongodb://<username>:<password>@<host>:<port>/<database>
   ```

   Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your MongoDB credentials and details.

### Email Credentials

1. Open the `server/routes/email.js` file.

2. Update the Nodemailer configuration with your email credentials:
   ```javascript
   const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           user: process.env.EMAIL, // your email address
           pass: process.env.PASSWORD, // your app password if using 2FA, otherwise your email password
       },
   });
   ```

3. Add the email credentials to your `.env` file in the `server` directory:
   ```plaintext
   EMAIL=your-email@example.com
   PASSWORD=your-email-password
   ```

   If you are using Two-Factor Authentication (2FA), make sure to generate an app-specific password from your Google account settings and use it here.

## Running the Application

1. Ensure that both the client and server are set up and running.

2. Open your browser and navigate to `http://localhost:3000` to access the application.

3. Use the application features including user authentication, workout planning, diet planning, and password reset functionality.

4. The server will run on `http://localhost:4000` by default.
