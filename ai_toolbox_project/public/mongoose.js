// server.js
const express = require('express');
const cors = require('cors');
// Nur Mongoose verwenden
const mongoose = require('mongoose');

const app = express();

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

// UnterSchema für ratings
  const ratingSchema = new mongoose.Schema({
  totalRatings: {
    type: [Number],
    default: [],
    validate: {
      validator: function(arr) {
        // testet ob jeder Wert im Array auch Teil des vordefinierten Arrays ist
        return arr.every(val => [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0].includes(val));
      },
      // schlägt die Validierung fehl wird automatisch die message ausgegeben
      message: "Rating Typ ist nicht benutzbar: {VALUE}"
    }
  },
  averageRating: { type: Number, default: 0.0 },
  ratingCount: { type: Number, default: 0 }
});

// Definiere das Schema -> definiert die genaue Struktur der Daten mit Datentypen
const userUploadSchema = new mongoose.Schema({
    uploaderEmail: { type: String,
                     required: true ,
                     match:[ /.+\@.+\..+/ ,
                    "Please enter a valid E-Mail adress"]},          
    uploadType:    { type: String,
                     required: true }, 
    uploadDate:    { type: Date,
                     default: new Date()},          // Date Objekt muss noch formatiert werden
    ageRecommendation: { type: Number,
                         required: true },
    uploadTitle:   { type: String ,
                     required: true},
    uploadDescription:{ type: String ,
                        required:true},
    fileURL:{type: String ,
             required:true},
    thumbnailURL: { type : String ,
                    required:true},
    uploadTags : {type : [String] ,
                  default: []},
    reviweStatus : { type : String ,
                     default: "pending"},
    reviewNotes : { type : String },
    reviewedByAdmin: { type: String ,
                       default: null},
    rating : { type: ratingSchema }
  });

// Modell definieren -> stellt eine Blaupause zu Verfügung 
// nimmt den Namen der Collection und das vordefinierte Schema entgegen
const uploadModel = mongoose.model('userUploads' , userUploadSchema);

// Server Test
app.get('/', (req, res) => {
  res.send('Server ist live!');
});

// der Server sendet Daten an den Clienten mit der GET Anfrage
app.get('/get-data' , async (req , res) => {

    try{
        // mit find() werden alle Dokumente aus der Collection abgerufen -> gibt Array aus Objekten(Dokumenten) zurück
        const data = await uploadModel.find();
        res.json(data);
    } catch (error){
        console.error("Fehler im Get Handler : " , error);
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

        res.status(200).send('Daten erfolgreich gespeichert!');
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
        res.status(500).send('Interner Serverfehler.');
    }
});


app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
