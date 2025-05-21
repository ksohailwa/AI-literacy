// server.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Erlaubt Anfragen von anderen Domains (wie der aktuelle Browser)
app.use(cors());

// Ermöglicht das Verarbeiten von JSON-Daten im Request
app.use(express.json());

// MongoDB-Verbindung vorbereiten
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'myTips';

// Definiere das Schema -> definiert die genaue Struktur der Daten mit Datentypen
const tipSchema = new mongoose.Schema({
    tip: { type: Number, required: true },          // 'tip' muss eine Zahl sein
    kundenAnzahl: { type: Number, required: true }, // 'kundenAnzahl' muss eine Zahl sein
    Ort: { type: String, required: true },          // 'Ort' muss ein String sein
    type: { type: String, required: true }          // 'type' muss ein String sein
  });

// der Server sendet Daten an den Clienten mit der GET Anfrage
app.get('/get-data' , async (req , res) => {
    
    // Modell definieren -> stellt eine Blaupause zu Verfügung 
    // definiert wie die Daten aussehen müssen
    const tipData = mongoose.model('tipData' , tipSchema);

    try{
        // mit find() werden alle Dokumente aus der Collection abgerufen -> gibt Array aus Objekten(Dokumenten) zurück
        const data = await tipData.find();
        // sendet Daten an den Clienten und beendet die Anfrage
        res.json(data);
    } catch (error){
        res.status(500).json({
            message : 'Ein Fehler bei der Datenübertragung ist aufgetreten.'
        });
    }
});

// der Server erhält Daten vom Clienten mit der POST Anfrage
app.post('/add-entry', async (req, res) => {
    const { tip,
            customers,
            place,
            type } = req.body;

    if (tip < 0 || customers < 1) {
        return res.status(400).send('Ungültige Eingaben.');
    }

    const types = ['M1', 'M2', 'S1', 'S2', 'S3', 'E1', 'E2'];
    if (!types.includes(type)) {
        return res.status(400).send('Ungültiger Trip-Typ.');
    }

    try {
        await client.connect();
        console.log('Verbindung zu MongoDB erfolgreich.');

        const db = client.db(dbName);
        const collection = db.collection('tipData');

        await collection.insertOne({
            tip: tip,
            kundenAnzahl: customers,
            Ort: place,
            typ: type
        });

        res.status(200).send('Daten erfolgreich gespeichert!');
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
        res.status(500).send('Interner Serverfehler.');
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
