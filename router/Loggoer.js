// logger.js

const fs = require('fs');
const path = require('path');

// Define the log file path (you can adjust this path as needed)
const logFilePath = path.join(__dirname, 'app.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = { log };
