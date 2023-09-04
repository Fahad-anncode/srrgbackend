const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const logger = require('./router/Loggoer'); // Import the logger module

require('dotenv').config();

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EmailUser,
    pass: process.env.EmailPassword
  }
  
});

// Define the route to handle form submission
app.post('/send-email', (req, res) => {
     console.log(req.body)
  const { name,lastname, email, phone, text } = req.body;
  logger.log('Received a POST request to /send-email');
  logger.log(JSON.stringify(req.body, null, 2));
  const mailOptions = {
    from: 'email',
    to: process.env.EmailTo,
    subject: 'About the company',
    text: `
      Name: ${name}
      Lastname: ${lastname}
      Email: ${email}
      Phone: ${phone}
      Text: ${text}
    `
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {

    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent');
    }
  });
});

app.use(express.static(path.join(__dirname, "./react-app")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "react-app", "index.html"));
});

// Start the server
app.set('port', process.env.PORT || process.env.PORT);
const server = app.listen(app.get('port'),async () => {
console.log(`Express running → PORT ${server.address().port}`);
});