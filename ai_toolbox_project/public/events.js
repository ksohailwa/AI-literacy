// getter for user input
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

const submitButton = document.getElementById("submit-button-js");
submitButton.addEventListener("click" , async () => {

    // additional validation of the userinput -> to be made soon
    const uploaderEmail = getEmail();
    const uploadTitle = getTitle();
    const uploadType = getType();
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
                ageRecommendation , 
                uploadTitle ,     // done
                uploadDescription , // done
                fileURL ,         // done
                thumbnailURL ,
                uploadTags ,
                reviweStatus ,  // dont need
                reviewNotes ,   // dont need
                reviewedByAdmin ,  // dont need
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