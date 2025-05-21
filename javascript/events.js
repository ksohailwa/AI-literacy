export {getTip , getCustomers , getPlace , getType}

let latestEntry;

// eventlistener for initial loading of the html page
document.addEventListener('DOMContentLoaded' , () => {

    const lastData = JSON.parse(localStorage.getItem('latest'));

    if(lastData){

        document.getElementById('latest-tip').textContent = `Latest Tip : ${lastData.tip} `;
        document.getElementById('latest-customers').textContent = `Latest Customers  : ${lastData.customers}`;
        document.getElementById('latest-place').textContent = `Latest Place : ${lastData.place}`;
        document.getElementById('latest-type').textContent = `Latest Type : ${lastData.type}`;
    } else {
        console.error('Daten konnten nicht geladen werden.')
    }
})

const allInputs = document.querySelectorAll('input');

allInputs.forEach(input  => {
    input.addEventListener('focus' , () => {
        input.style.backgroundColor = 'lightskyblue';
    })
    input.addEventListener('blur' , () => {
        input.style.backgroundColor = 'white';
    })
})

const types = ['M1', 'M2', 'S1', 'S2', 'S3', 'E1', 'E2'];

const showButton = document.getElementById('show-button');
showButton.addEventListener('click' , async () => {

    try{
        const response = await fetch('http://localhost:3000/get-data' , {
            method : 'GET',
            headers : {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
            throw new Error('Netzwerkverbindung fehlgeschlagen.');
        }
            const data = await response.json();
            console.log(data);
        } catch (error){
            console.error('Ein Fehler bei der Datenübertragung ist aufgetreten.');
        }
    }
)

// getter functions for entry data
function getTip(){
    const tip = document.getElementById('tip').value;
    return tip;
}
function getCustomers(){
    const customers = document.getElementById('customers').value;
    return customers;
}
function getPlace(){
    const place = document.getElementById('place').value;
    return place;
}
function getType(){
    const type = document.getElementById('type').value;
    return type;
}

const button = document.querySelector('.confirm-button');
button.addEventListener('click', async () => {

    const tip = getTip();
    const customers = getCustomers();
    const place = getPlace();
    const type = getType();

    // clear input fields after confirm
    document.getElementById('tip').value = '';
    document.getElementById('customers').value = '';
    document.getElementById('place').value = '';
    document.getElementById('type').value = '';

    // check user input
    if (tip < 0 || customers < 1) {
        alert('Eingaben sind nicht korrekt.');
        return;
    }
    if (!types.includes(type)) {
        alert('Trip-Typ falsch angegeben.');
        return;
    }

    // Save latest entry into local storage
    latestEntry = {
        tip : tip,
        customers : customers,
        place : place,
        type : type
    }
    localStorage.setItem('latest' , JSON.stringify(latestEntry));


    // post entry data to server for entry in MongoDB
    try {
        const response = await fetch('http://localhost:3000/add-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tip: tip,
                customers: customers,
                place: place,
                type: type
            })
        });

        const text = await response.text();
        alert(text);
    } catch (error) {
        console.error('Fehler beim Senden:', error);
        alert('Fehler beim Speichern der Daten.');
    }
});
