const mongoose = require('mongoose');

// UnterSchema für ratings
// oben definieren sonst Fehler
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
    author : { type:String ,
               required: true },
    uploaderEmail: { type: String ,
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
// exportieren um in server file nutzen zu können
module.exports = mongoose.model('userUploads' , userUploadSchema);
