//------------------------------------------Getter-Function section----------------------------------------------//
function getName(){
  const name = document.getElementById("name").value;
  return name;
}
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
    return thumb;
}
function getAgeRecommandation(){
  const recom = document.getElementById('ageRecommendation').value;
  return recom;
}
function getUploadTags(){
  const tags = document.getElementById('uploadTags').value;
  const arrayTags = tags.split(',');                        // macht aus String getrennt durch , ein Array
  const noBlankArray = arrayTags.map(tag => tag.trim());    // entfernt blanks vor und hinter jedem element 
  const noDuplicates = [...new Set(noBlankArray)];          // entfernt dopplete elemente durch ein Set
  return noDuplicates;
}

// SUBMIT-BUTTON event
const submitButton = document.getElementById("submit-button-js");
submitButton.addEventListener("click" , async (event) => {
  
  // verhindert neuLaden der seite
  event.preventDefault();

//------------------------------------------Validate-Input section----------------------------------------------//
  
  // check uploadername
    const uploaderName = getName();
    if(uploaderName.trim() === ''){
      throw new Error('Uploadername cant be empty.');
    }

  // check uploaderemail 
    const uploaderEmail = getEmail();
    if(!validEmail(uploaderEmail)){
      throw new Error('Please enter a valid Email adress.');
    }
    
  // check uploadType
    const types = ["game" , "education" , "other"];
    const uploadType = getType();
    if(!types.includes(uploadType)){
      throw new Error(`Invalid input : ${uploadType}`);
    }
      
    
    // server can save the uploadDate as an Date object
    const uploadDate = new Date().toISOString(); 
    const fileURL = getLink();
    const uploadDescription = getDescription();
    const thumbnailURL = getThumbnail();
    const ageRecommendation = getAgeRecommandation();
    const uploadTitle = getTitle();
    const uploadTags = getUploadTags();

    //------------------------------------------Add-Entry section----------------------------------------------//
  
    try {
        const response = await fetch('/ai-literacy-toolbox/api/add-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uploaderName,
                uploaderEmail ,   
                uploadType ,      
                uploadDate ,      
                ageRecommendation ,   
                uploadTitle ,     
                uploadDescription , 
                fileURL ,         
                thumbnailURL : String(thumbnailURL) ,  
                uploadTags 
            })
        });

        // abfragen ob die antwort ok ist
        if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server antwortet mit Status ${response.status}: ${errorText}`);
        }

        const text = await response.text();
        alert(text);
    } catch (error) {
        console.error('Fehler beim Senden:', error);
        alert('Fehler beim Speichern der Daten.');
    }

  //------------------------------------------E-Mail section----------------------------------------------//
  /*
  // E-Mail Adresse aus dem InputFeld holen
  const email = getEmail();

    // prüfen ob Input leer ist
    if (!email) {
      alert("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    try {
      // Anfrage an den Server senden – POST an /send-email
      const response = await fetch('/ai-literacy-toolbox/api/send-email-submit', {
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
      console.error('Fehler beim Senden:', error);
      alert('Beim Senden ist ein Fehler aufgetreten.');
    }
      */
  });
  
