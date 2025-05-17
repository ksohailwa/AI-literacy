// Mongo-Client Objekt zur Kommunikation mit der Datenbank erzeugen
const { MongoClient } = require('mongodb');

// VerbindungsURL für MongoDB -> Lokaler Server , Port 27017
const uri = 'mongodb://localhost:27017';

// Erstellen von MongoClient-Objekt um sich mit der Datenbank zu verbinden
const client = new MongoClient(uri);

// Asynchrone Funktion mit awaits innerhalb
async function run() {
  try {
    // warten , bis das MongoClient Objekt sich mit der Datenbank verbunden hat
    await client.connect();
    console.log('Verbindung erfolgreich hergestellt.')

    // gibt den Namen der Datenbank an mit der wir arbeiten wollen , wenn Name nicht vergeben wird eine erstellt
    const db = client.db('testDB');

    // Zugriff auf die Collection 'users' -> ist das selbe wie TabellenName in SQL
    const users = db.collection('users');

    // fügt ein einzelnes Dokument in die Datenbank ein -> Dokument = JSON ähnliches Objekt
    await users.insertOne({ name: 'Max', age: 28 });

    // find() -> gibt alle Dokumente in der users-Datenbank zurück
    // toArray() -> wandelt die Dokumente in eine Array um -> leichtere Verarbeitung
    const result = await users.find().toArray();

    console.log(result);
  } catch (error) {
    console.error('Fehler:', error);
  } finally {
    // stellt sicher dass die Verbindung zur Datenbank am Ende geschlossen wird
    await client.close();
  }
}

run();
