
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const axios = require('axios')
const cors = require('cors');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const apiRoutes = require('./routes/routes');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
app.use(cors());


let products = []

const allowedApiKeys = ['testapi'];
const secretKey = 'ihatemylife';

axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products').then((response) =>{products= response.data})

const apiKeyValidator = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  const tok = jwt.verify(apiKey,secretKey)
  next();

};

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Products API",
      description: "Products API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:3001"]
    }
  },
  apis: ['./routes/routes.js']
};

app.use(apiKeyValidator)


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});