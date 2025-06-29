// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Tool = require('./models/dbTools.js');
const dotenv = require('dotenv');
const logger = require('./logger.js');

// Nur Mongoose verwenden
const mongoose = require('mongoose');

const app = express();
// um Daten aus der .env-Datei zu erhalten
dotenv.config();


// logger importieren
const logger = require('./logger');

// this is still just the test-database
mongoose.connect('mongodb://localhost:27017/myTips', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Mongoose verbunden mit MongoDB'))
.catch(err => console.error('Mongoose-Verbindung fehlgeschlagen:', err));

const port = 3000;

// CORS-Middleware für alle Domains (Entwicklung)
app.use(cors());
// JSON parsing middleware
app.use(express.json());

// Server Test
app.get('/', (req, res) => {
  res.send('Server ist live!');
});

// der Server sendet Daten an den Clienten mit der GET Anfrage
app.get('/get-data' , async (req , res) => {

    try{
        // mit find() werden alle Dokumente aus der Collection abgerufen -> gibt Array aus Objekten(Dokumenten) zurück
        const data = await Tool.find();
        res.json(data);
        logger.info('Get-Anfrage auf Datenbank erfolgreich.');
    } catch (error){
        logger.error(`Fehler im Get Handler : ${err.message} `);
        res.status(500).json({
            message : 'Ein Fehler bei der Datenübertragung ist aufgetreten.'
        });
    }
});

// der Server erhält Daten vom Clienten mit der POST Anfrage
app.post('/add-entry', async (req, res) => {
    const {uploaderEmail, uploadType , uploadDate , ageRecommendation , uploadTitle,
            uploadDescription , fileURL , thumbnailURL , uploadTags , reviweStatus , reviewNotes,
            reviewedByAdmin , rating } = req.body;

    try {

        const newEntry = new uploadModel({
            uploaderEmail: uploaderEmail ,
            uploadType: uploadType ,
            uploadDate: uploadDate ,
            ageRecommendation: ageRecommendation ,
            uploadTitle: uploadTitle ,
            uploadDescription: uploadDescription ,
            fileURL: fileURL ,
            thumbnailURL: thumbnailURL ,
            uploadTags: uploadTags ,
            reviweStatus: reviweStatus ,
            reviewNotes: reviewNotes ,
            reviewedByAdmin: reviewedByAdmin ,
            rating: rating
        });

        await newEntry.save();

        logger.info('Datenbankeintrag erfolgreich eingefügt.')
        res.status(200).send('Daten erfolgreich gespeichert!');
    } catch (error) {
        logger.error(`Fehler beim Speichern der Daten : ${err.message}`);
        res.status(500).send('Interner Serverfehler.');
    }
});

app.listen(port, () => {
  logger.info(`Server läuft auf http://localhost:${port}`);
});
