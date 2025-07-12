// =================================================================
//                 AI LITERACY TOOLBOX - SERVER
// =================================================================
// This file contains the complete backend logic for the application.
// It is responsible for:
// 1. Serving the static frontend files (HTML, CSS, JS).
// 2. Providing an API for database interactions (e.g., adding tools).
// 3. Handling other backend tasks like sending confirmation emails.
// =================================================================

// --- 1. IMPORTS & INITIAL SETUP ---
// -----------------------------------------------------------------
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const logger = require('./logger'); // Your Winston logger
const Tool = require('./models/dbTools'); // Your Mongoose model
require('dotenv').config(); // Loads environment variables from .env file

const app = express();

// --- 2. CONFIGURATION & CONSTANTS ---
// -----------------------------------------------------------------
// Load configuration from environment variables for security and flexibility.
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const basePath = process.env.BASE_PATH || '/ai-literacy-toolbox';

// Email configuration
const mailerConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports like 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use a Google App Password here
    },
};
const mailerTransporter = nodemailer.createTransport(mailerConfig);

// --- 3. CORE MIDDLEWARE ---
// -----------------------------------------------------------------
// Middleware is processed on every incoming request before it hits the routes.
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON request bodies
app.use((req, res, next) => {
    // Custom logger middleware to log every incoming request
    logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});

// --- 4. API ROUTER DEFINITION ---
// -----------------------------------------------------------------
// We use an Express Router to group all our API endpoints together cleanly.
const apiRouter = express.Router();

// Health Check Endpoint
// Accessible at: GET /ai-literacy-toolbox/api/status
apiRouter.get('/status', (req, res) => {
    res.status(200).json({ status: 'API is healthy and running' });
});

// Add a New Tool Endpoint
// Accessible at: POST /ai-literacy-toolbox/api/add-entry
apiRouter.post('/add-entry', async (req, res) => {
    try {
        logger.info('Received request to add new tool entry.');
        const newTool = new Tool(req.body); // Create a new Mongoose document
        await newTool.save(); // Save it to the database
        logger.info(`Successfully saved new tool: ${newTool.uploadTitle}`);
        res.status(201).json({ message: 'Tool submitted successfully!', tool: newTool });
    } catch (error) {
        logger.error('Error saving new tool entry:', error);
        res.status(500).json({ message: 'Error saving tool to the database.' });
    }
});

// Send Confirmation Email Endpoint
// Accessible at: POST /ai-literacy-toolbox/api/send-email
apiRouter.post('/send-email', async (req, res) => {
    try {
        const { to } = req.body; // Get the recipient's email from the request
        if (!to) {
            return res.status(400).json({ message: 'Recipient email ("to") is required.' });
        }

        logger.info(`Sending confirmation email to: ${to}`);
        const mailOptions = {
            from: `"AI Literacy Toolbox" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: 'Thank you for your submission!',
            text: 'We have received your tool submission and will review it shortly. Thank you for contributing to the AI Literacy Toolbox!',
            html: '<b>We have received your tool submission and will review it shortly.</b><p>Thank you for contributing to the AI Literacy Toolbox!</p>',
        };

        await mailerTransporter.sendMail(mailOptions);
        logger.info('Confirmation email sent successfully.');
        res.status(200).json({ message: 'Confirmation email sent successfully.' });

    } catch (error) {
        logger.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send confirmation email.' });
    }
});

// Mount the API router to the correct base path.
// All routes defined above will now be prefixed with this path.
app.use(`${basePath}/api`, apiRouter);


// --- 5. STATIC FILE SERVER & FRONTEND ROUTING ---
// -----------------------------------------------------------------
// This section serves your React/Vue/HTML frontend.

// Serve all static files (e.g., index.html, style.css) from the 'public' directory.
app.use(basePath, express.static(path.join(__dirname, 'public')));

// The "Catch-All" Route:
// This is critical for single-page applications. It ensures that if a user
// refreshes the browser on a path like /ai-literacy-toolbox/about,
// the server still sends the main index.html file.
app.get(`${basePath}/*`, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// --- 6. DATABASE CONNECTION & SERVER START ---
// -----------------------------------------------------------------
// The application will only start listening for requests *after*
// a successful connection to the database has been established.

logger.info('Application starting...');
logger.info('Attempting to connect to MongoDB...');

mongoose.connect(MONGO_URI)
    .then(() => {
        logger.info('MongoDB connection established successfully!');
        app.listen(PORT, () => {
            logger.info(`Server is now listening on port ${PORT}`);
            logger.info(`Access the application at: http://localhost${basePath}`);
        });
    })
    .catch(err => {
        // If the database connection fails, the application cannot run.
        // Log a fatal error and exit the process.
        logger.error('FATAL ERROR: Could not connect to MongoDB.');
        logger.error(err);
        process.exit(1);
    });
