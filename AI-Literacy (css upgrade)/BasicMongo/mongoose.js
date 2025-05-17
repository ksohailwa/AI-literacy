const mongoose = require('mongoose');

// MongoDB-Verbindung vorbereiten
await mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,     // besserer Parser , falls Sonderzeichen in URL's vorhanden sind besser
  useUnifiedTopology: true   // sorgt dafür , dass die neuste und stabislte Topologie-Engine benutzt wird
});

console.log('Verbindung zu MongoDB erfolgreich.');

// Definiere das Schema -> definiert die genaue Struktur der Daten mit Datentypen
const tipSchema = new mongoose.Schema({
    tip: { type: Number, required: true },          // 'tip' muss eine Zahl sein
    kundenAnzahl: { type: Number, required: true }, // 'kundenAnzahl' muss eine Zahl sein
    Ort: { type: String, required: true },          // 'Ort' muss ein String sein
    type: { type: String, required: true }          // 'type' muss ein String sein
  });

// Modell definieren -> stellt eine Blaupause zu Verfügung 
const tipData = mongoose.model('tipData' , tipSchema);

// Funktion mit Parameterübergabe
async function addEntry(tip , kundenAnzahl , ort , type){

    try{
        // benutzt das vordefinierte Modell um ein neues Objekt zu erstellen
        const newTip = new tipData({
            tip : tip,
            kundenAnzahl : kundenAnzahl,
            Ort : ort, 
            type : type
        });

        // speichert in die Datenbank
        await newTip.save();

        console.log('Eintrag erfolgreich eingefügt.');
    } catch(error){
        console.error('Fehler beim Einfügen der Daten.');
    } finally {
        // mit mongoose nicht unbedingt nötig -> wird automatisch geschlossen
        await mongoose.connection.close();
    }
}