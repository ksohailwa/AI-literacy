// getter for user input
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

    // add a new entry to the database
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
})

// Search functipn exporten.
