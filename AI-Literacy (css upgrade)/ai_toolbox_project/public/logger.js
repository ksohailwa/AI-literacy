// WIIIIIIINNNSSSTTTOOOOOOOOOONNNNNNNN !!!!!!!!
// importieren
const { createLogger, format, transports } = require('winston');

// Logger mit Konfiguration
const logger = createLogger({
  // gibt level an ab dem geloggt wird -> also immer da 'info' gerungstes level ist
  level: 'info', // Standard-Log-Level (z. B. 'info', 'warn', 'error', 'debug')
  
  // wie soll der log aussehen 
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), // Zeitstempel hinzufügen
    format.colorize(),                                   // Farben im Terminal (nur Konsole)
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;      // Ausgabeformat definieren -> Zeitpunkt , level und Meldung
    })
  ),

  // wohin wird geloggt -> einfache textdatei in loger folder 
  transports: [
    new transports.Console(),                                     // Terminal Ausgabe
    new transports.File({ filename: 'logs/combined.log' }),       // alles in combined.log um
    new transports.File({ filename: 'logs/error.log'})            // nur Fehler in error.log
  ]
});

// logger exportieren -> verwenden in server.js und event.js
module.exports = logger;
