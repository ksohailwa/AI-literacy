// server.js

// Step 1: Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const logger = require('./logger');

// Step 2: Use environment variables for port and DB connection
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => logger.info('Mongoose connected to MongoDB via Docker'))
.catch(err => logger.error('Mongoose connection failed:', err));

// CORS-Middleware for all domains (Entwicklung)
app.use(cors());
// JSON parsing middleware
app.use(express.json());

// Step 3: Serve all static files (html, css, js, assets) from the root directory
// This is a CRITICAL step to make your frontend visible.
app.use(express.static('.'));

// ... (the rest of your schema and API routes remain the same) ...

// UnterSchema für ratings
const ratingSchema = new mongoose.Schema({
  //... schema content
});

// Definiere das Schema
const userUploadSchema = new mongoose.Schema({
  //... schema content
});

const uploadModel = mongoose.model('userUploads' , userUploadSchema);

// Server Test
app.get('/api/test', (req, res) => {
  res.send('Server API is live!');
});

// GET route
app.get('/get-data', async (req, res) => {
    try {
        const data = await uploadModel.find();
        res.json(data);
    } catch (err) { // Corrected variable name from error to err
        logger.error(`Error in Get Handler : ${err.message} `);
        res.status(500).json({
            message: 'Error during data transfer.'
        });
    }
});

// POST route
app.post('/add-entry', async (req, res) => {
    //... your post logic
    try {
        // ...
        await newEntry.save();
        res.status(200).send('Data saved successfully!');
    } catch (err) { // Corrected variable name
        logger.error(`Error saving data: ${err.message}`);
        res.status(500).send('Internal Server Error.');
    }
});


app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
