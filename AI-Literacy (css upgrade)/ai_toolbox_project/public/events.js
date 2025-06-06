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

const submitButton = document.getElementById("submit-button-js");
submitButton.addEventListener("click" , async () => {

    // additional validation of the userinput  
    const uploaderEmail = getEmail();
    if(validEmail(uploaderEmail)){

    } else {
        console.warning("Email validation was not succesfull.")
    }
    
    const types = ["game" , "education" , "other"];
    const uploadType = getType();
    if(types.includes(uploadType)){
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
                uploaderEmail ,   // done
                uploadType ,      // done
                uploadDate ,      // done
                ageRecommendation ,  // done      
                uploadTitle ,     // done
                uploadDescription , // done
                fileURL ,         // done
                thumbnailURL ,   // done
                uploadTags ,     // done
                reviweStatus ,  // dont need
                reviewNotes ,   // dont need
                reviewedByAdmin ,  
                rating  // dont need
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