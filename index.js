const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fahadanncode@gmail.com',
    pass: 'ptavtrxywlaqsunl'
  }
  
});

// Define the route to handle form submission
app.post('/send-email', (req, res) => {
     console.log(req.body)
  const { name,lastname, email, phone, text } = req.body;

  const mailOptions = {
    from: 'email',
    to: 'salil@srrgtechnologies.com',
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

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
