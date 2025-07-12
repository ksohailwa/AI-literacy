const mongoose = require('mongoose');

// UnterSchema für ratings
// oben definieren sonst Fehler
  const ratingSchema = new mongoose.Schema({
  totalRatings: {
    type: [Number],
    default: [],
    },
    averageRating: { type: Number, default: 0.0 },
    ratingCount: { type: Number, default: 0 }
});

// Definiere das Schema -> definiert die genaue Struktur der Daten mit Datentypen
const userUploadSchema = new mongoose.Schema({
    uploaderName: { type:String , 
                    required:true},
    uploaderEmail: { type: String ,
                     required: true ,
                     match:[ /.+\@.+\..+/ ,
                    "Please enter a valid E-Mail adress"]},          
    uploadType:    { type: String,
                     required: true }, 
    uploadDate:    { type: Date,
                     default: new Date()},         
    ageRecommendation: { type: String,
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
                  required:true},
    reviewStatus : { type : String ,
                     default: "pending"},
    reviewNotes : { type : String },
    reviewedByAdmin: { type: String ,
                       default: null},
    rating : { type: ratingSchema , default: () => ({}) }
  });

// Modell definieren -> stellt eine Blaupause zu Verfügung 
// nimmt den Namen der Collection und das vordefinierte Schema entgegen
// exportieren um in server file nutzen zu können
module.exports = mongoose.model('userUploads' , userUploadSchema);
