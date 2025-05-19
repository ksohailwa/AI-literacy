const mongoose = require('mongoose');

// MongoDB-Verbindung vorbereiten
await mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,     // besserer Parser , falls Sonderzeichen in URL's vorhanden sind besser
  useUnifiedTopology: true   // sorgt dafür , dass die neuste und stabislte Topologie-Engine benutzt wird
});

console.log('Verbindung zu MongoDB erfolgreich.');

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


// Modell definieren -> stellt eine Blaupause zu Verfügung 
// nimmt den Namen der Collection und das vordefinierte Schema entgegen
const uploadModel = mongoose.model('userUploads' , userUploadSchema);

// Funktion mit Parameterübergabe -> für EventListener!
async function addEntry(uploaderEmail , uploadType , uploadDate , uploadTitle , uploadTags , uploadDescription,
                        ageRecommendation , fileURL , thumbnailURL , reviweStatus , reviewedByAdmin , ratingSchema ){

    try{
        // benutzt das vordefinierte Modell um ein neues Objekt zu erstellen
        const newUpload = new uploadModel({
            uploaderEmail : uploaderEmail,
            uploadType : uploadType,
            uploadDate : uploadDate,
            ageRecommendation : ageRecommendation,
            uploadTitle : uploadTitle,
            uploadDescription : uploadDescription,
            fileURL : fileURL,
            thumbnailURL : thumbnailURL,
            uploadTags : uploadTags,
            reviweStatus : reviweStatus,
            reviewedByAdmin : reviewedByAdmin,
            rating : ratingSchema
        });

        // speichert in die Datenbank
        await newUpload.save();

        // wichtig -> userFeedBack
        console.log('Eintrag erfolgreich eingefügt.');
    } catch(error){
        console.error('Fehler beim Einfügen der Daten.' , error.message);
    } finally {
        // mit mongoose nicht unbedingt nötig -> wird automatisch geschlossen
        await mongoose.connection.close();
    }
}

