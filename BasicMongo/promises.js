// Promises können ingesamt in nur 3 Zuständen zu finden sein :
//   1. Pending (wartend): Das Promise hat noch keinen Wert und wartet auf die Operation (z. B. API-Antwort).
//   2. Fulfilled (erfüllt): Die Operation war erfolgreich, und das Promise hat einen Wert zurückgegeben.
//   3. Rejected (abgelehnt): Etwas ist schiefgegangen, und das Promise hat einen Fehler (z. B. API-Aufruf fehlgeschlagen).

const countryAPI = 'https://restcountries.com/v2/all';

//---------------------------------------------------------------------------------------------------------//

// mit async und await
// await -> nur in async Funktionen anwendbar
// async ->  kennzeichnet eine asynchrone Funktion die nebenbei läuft und den sonstigen Programmfluss nicht unterbricht
async function fetchData(url){

    try{
        // await -> sorgt dafür , dass der Code hier auf die Daten wartet und nicht einfach weiter läuft
        // fetch -> führt eine asynchrone HTTP-Anfrage aus und gibt ein Promise zurück 
        //       -> gibt ein Response-Objekt zurück welches den gesamten HTTP-Response umfasst (Header , Body , Status)
        //       -> 
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Ein Fehler bei der Übertragung ist aufgetreten.");
        }
        // json() -> parst den ankommenden JSON-Stroing direkt in eine JavaScript-Objekt 
        //        -> wandelt den HTML-Body von fetch direkt in ein Javascript-Objekt um
        const result = await response.json();
        return result;
    } catch (error){
        console.error(error.stack);
    }
    return;
} export {fetchData};

//---------------------------------------------------------------------------------------------------------//

// mit promise und then
// then wird nur ausgeführt wenn das vorherige then in einem resolve endet
// resolve(): Versetzt das Promise in den „erfüllten“ Zustand, und der Code im then() wird ausgeführt.
// reject(): Versetzt das Promise in den „abgelehnten“ Zustand, und der Code im catch() wird
//    -ausgeführt. Es wird auch ein Fehler ausgelöst und der verbleibende Code 
//    - im Promise (nach dem reject()) wird nicht mehr ausgeführt.

async function fetchData(url){
    return new Promise((resolve , reject) => {
        fetch(url)
        .then(response => {
            if(!response.ok){
                reject('Fehler beim Laden der Daten.');
            } else {
                return response.json();
            }
        })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const successfulPromise = new Promise((resolve, reject) => {
    const data = [1, 2, 3];             // Beispiel für erfolgreiche Daten
    if (Array.isArray(data)) {
        resolve(data);                  // Erfolgreiche Rückgabe der Daten
    } else {
        reject('Daten sind nicht im richtigen Format.');
    }
});

//---------------------------------------------------------------------------------------------------------//



