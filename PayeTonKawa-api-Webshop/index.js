const Crypto = require('crypto')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const apiRoutes = require('./routes/routes');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:3001"]
    }
  },
  //
  apis: ['./routes/routes.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(JSON.stringify(swaggerDocs))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to the mobile app API!');
});

const authorizedKeys = ['swaggerapikey'];

function randomApiKey(size = 30) {  
  return Crypto
    .randomBytes(size)
    .toString('base64')
    .slice(0, size)
}

app.get('/apiKey',(req,res) =>{

    const apiKey = randomApiKey();
    authorizedKeys.push(apiKey)

    res.send(apiKey);
})
const validateApiKey = (req, res, next) => {
  const apiKey = req.query.apiKey || req.headers['x-api-key'];
  if (authorizedKeys.includes(apiKey)) {
      next(); 
  } else {
      res.status(401).json({ error: 'Unauthorized' });
  }
};

app.use('/', apiRoutes) 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});