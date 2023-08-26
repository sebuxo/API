const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer')

// Middleware
app.use(cors());
app.use(bodyParser.json());
let users =[];
const usersFilePath = path.join(__dirname, 'users.json');

// Secret key for JWT
const secretKey = 'ihatemylife';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mouad.charif.069@gmail.com',
        pass: 'shuwihlqspbafbju'
    }
});


const mailOptions = {
    from: 'li7wak',
    to: 'xenojiva1@gmail.com',
    subject: 'Verification key PayeTaKawa',
    text: 'This is a test email sent from Node.js using nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});


// Register endpoint
app.post('/register', async (req, res) => {
    try {
      const {email ,password, firstname , lastname} = req.body;
  
      // Read existing user data from the JSON file
      let users = [];
      try {
        const fileContent = fs.readFileSync(usersFilePath, 'utf8');
        users = JSON.parse(fileContent);
      } catch (error) {
        console.error('Error reading users file:', error);
      }
  
      // Check if the username already exists
      if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { username, password: hashedPassword };
  
      // Add the new user to the array
      users.push(newUser);
  
      // Write the updated user data back to the JSON file
      try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error writing users file:', error);
        res.status(500).json({ message: 'Error registering user' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  });

// Login endpoint
app.post('/login', async (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  console.log("someone logged in");
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});