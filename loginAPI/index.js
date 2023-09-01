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
const ejs = require('ejs');
const authorizedKeys = ['your_api_key_1', 'your_api_key_2'];

app.use(cors());
app.use(bodyParser.json());
let users = require('./users.json');

const usersFilePath = path.join(__dirname, 'users.json');
const verificationFilePath = path.join(__dirname, 'verification.ejs');

const isActive = false;
const secretKey = 'ihatemylife';

const template = fs.readFileSync(verificationFilePath, 'utf-8');
const compiledTemplate = ejs.compile(template);


const randomgen = ()=>{
  const min = 10000000; 
  const max = 99999999; 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const SendConfirmation = (email,code,lastname) =>{

  const html = compiledTemplate({
    name: lastname, 
    confirmationCode: code,
  });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mouad.charif.069@gmail.com',
        pass: 'shuwihlqspbafbju'
    }
});

const mailOptions = {
    from: 'mouad.charif.069@gmail.com',
    to: email,
    subject: 'Password key PayeTaKawa',
    html: html
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
}

app.post('/register', async (req, res) => {
  const randomverif = randomgen();
  const randomPassword = randomgen();
  
    try {
      const {email , firstname , lastname} = req.body;
      console.log(req.body);
  
      try {
      
        const fileContent = fs.readFileSync(usersFilePath, 'utf8');
     
        users = JSON.parse(fileContent);
       
      } catch (error) {
        console.error('Error reading users file:', error);
      }
  
    
      if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: 'email already registered' });
      }
      console.log("new user")
 
      const newUser = {email, password: randomPassword,activationCode: randomverif ,firstname ,lastname};
      console.log(newUser)
      users.push(newUser);

      try {
     
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        SendConfirmation(newUser.email,activationCode,newUser.lastname)
        res.status(200).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error writing users file:', error);
        res.status(500).json({ message: 'Error registering user' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  });



  app.get('/verify',(req,res) =>{
    console.log(req.body.email)
    console.log(req.body.verification)
    const user = users.find(user => user.email == req.body.email && user.activationCode==req.body.verification);
  
    console.log(user);
    user ? res.send(user.password) : res.status(401).json({message: 'User not found'});
})
app.post('/login', async (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  console.log("Someone logged in");
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