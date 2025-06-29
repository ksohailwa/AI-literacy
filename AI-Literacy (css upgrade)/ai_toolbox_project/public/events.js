//------------------------------------------Getter-Function section----------------------------------------------//

// logger import 
const logger = require("./logger");

function validEmail(email){
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return regex.test(email);
}
function getEmail(){
    const Email = document.getElementById("email").value;
    return Email;
}
function getTitle(){
    const title = document.getElementById("title").value;
    return title;
}
function getType(){
    const type = document.getElementById("type").value;
    return type;
}
function getLink(){
    const link = document.getElementById("github").value;
    return link;
}
function getDescription(){
    const des = document.getElementById("description").value;
    return des;
}
function getThumbnail(){
    const thumb = document.getElementById("thumbnailURL").value;
    return thumb
}

// SUBMIT-BUTTON event
const submitButton = document.getElementById("submit-button-js");
submitButton.addEventListener("click" , async () => {

//------------------------------------------Get-Input section----------------------------------------------//
  
    // additional validation of the userinput  
    const uploaderEmail = getEmail();
    if(validEmail(uploaderEmail)){

    } else {
        console.warn("Email validation was not succesfull.")
    }
    
    const types = ["game" , "education" , "other"];
    const uploadType = getType();
    if(types.includes(uploadType)){
      
    } else {
      console.warn("Wrong Input.")
    }
    
    const uploadTitle = getTitle();
    
    // server can save the uploadDate as an Date object
    const uploadDate = new Date().toISOString(); 
    const fileURL = getLink();
    const uploadDescription = getDescription();

    //------------------------------------------Add-Entry section----------------------------------------------//
  
    try {
        const response = await fetch('http://localhost:3000/add-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uploaderEmail ,   
                uploadType ,      
                uploadDate ,      
                ageRecommendation ,       
                uploadTitle ,     
                uploadDescription , 
                fileURL ,         
                thumbnailURL ,   
                uploadTags ,     
                reviweStatus ,   
                reviewNotes ,   
                reviewedByAdmin ,  
                rating  
            })
        });

        const text = await response.text();
        alert(text);
    } catch (error) {
        console.error('Fehler beim Senden:', error);
        alert('Fehler beim Speichern der Daten.');
    }

  //------------------------------------------E-Mail section----------------------------------------------//
  
  // E-Mail Adresse aus dem InputFeld holen
  const email = getEmail();

    // prüfen ob Input leer ist
    if (!email) {
      alert("Bitte gib eine E-Mail-Adresse ein.");
      return;
    }

    try {
      // Anfrage an den Server senden – POST an /send-email
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // JSON wird geschickt
        },
        body: JSON.stringify({ to: email })  // { to: angegebene Email Adresse }
      });

      // Text-Antwort vom Server lesen
      const result = await response.text();

      // Feedback an den Benutzer anzeigen
      alter(result);

    } catch (error) {
      // Falls z. B. keine Verbindung zum Server möglich ist
      logger.error('Fehler beim Absenden der Email' , err.message);
      console.error('Fehler beim Senden:', error);
      alert('Beim Senden ist ein Fehler aufgetreten.');
    }
  });
