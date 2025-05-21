// server.js
const express = require('express');
const cors = require('cors');
// Nur Mongoose verwenden
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// CORS-Middleware für alle Domains (Entwicklung)
app.use(cors());
// JSON parsing middleware
app.use(express.json());

// === Schritt 1: Mongoose-Verbindung aufbauen ===
mongoose
  .connect('mongodb://localhost:27017/myTips', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✔️ Mongoose connected to myTips'))
  .catch(err => console.error('❌ Mongoose connection error:', err));
// === Ende Schritt 1 ===

// === Schritt 2: Schema & Modell definieren ===
const tipSchema = new mongoose.Schema({
  tip: { type: Number, required: true },          // 'tip' muss eine Zahl sein
  kundenAnzahl: { type: Number, required: true }, // 'kundenAnzahl' muss eine Zahl sein
  Ort: { type: String, required: true },          // 'Ort' muss ein String sein
  type: { type: String, required: true }          // 'type' muss ein String sein
});
const Tip = mongoose.model('Tip', tipSchema);     // Modell erstellen
// === Ende Schritt 2 ===

// === Schritt 3: GET-Route mit Mongoose nutzen ===
app.get('/get-data', async (req, res) => {
  try {
    const data = await Tip.find();                  // Alle Einträge abrufen
    console.log('Server liefert:', data);
    res.json(data);                                  // JSON-Antwort senden
  } catch (error) {
    console.error('Fehler in GET /get-data:', error);
    res.status(500).json({ message: 'Serverfehler beim Lesen' });
  }
});
// === Ende Schritt 3 ===

// === Schritt 4: POST-Route mit Mongoose implementieren ===
app.post('/add-entry', async (req, res) => {
  const { tip, customers, place, type } = req.body;  // Body-Daten auslesen

  // Eingabevalidierung
  if (tip < 0 || customers < 1) {
    return res.status(400).send('Ungültige Eingaben.');
  }
  const validTypes = ['M1', 'M2', 'S1', 'S2', 'S3', 'E1', 'E2'];
  if (!validTypes.includes(type)) {
    return res.status(400).send('Ungültiger Trip-Typ.');
  }

  try {
    const entry = new Tip({
      tip,
      kundenAnzahl: customers,  // im DB-Feld 'kundenAnzahl'
      Ort: place,               // im DB-Feld 'Ort'
      type                      // im DB-Feld 'type'
    });
    await entry.save();                              // Eintrag speichern
    res.status(200).send('Daten erfolgreich gespeichert!');
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    res.status(500).send('Interner Serverfehler.');
  }
});
// === Ende Schritt 4 ===

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});