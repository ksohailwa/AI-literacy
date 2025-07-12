// WIIIIIIINNNSSSTTTOOOOOOOOOONNNNNNNN !!!!!!!!
// importieren
const { createLogger, format, transports } = require('winston');

// Erstelle einen Logger mit Konfiguration
const logger = createLogger({
  level: 'info', // Standard-Log-Level (z. B. 'info', 'warn', 'error', 'debug')
  
  // Formatierung für die Log-Ausgabe
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), // Zeitstempel hinzufügen
    format.colorize(),                                   // Farben im Terminal (nur Konsole)
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;      // Ausgabeformat definieren -> Zeitpunkt , level und Meldung
    })
  ),

  // Definiere, wohin geloggt wird
  transports: [
    new transports.Console(),                                             // Ausgabe im Terminal
    new transports.File({ filename: 'logs/combined.log' }),               // Alles in combined.log um 
  ]
});

// Exportiere den Logger damit du ihn in anderen Dateien verwenden kannst
module.exports = logger;
