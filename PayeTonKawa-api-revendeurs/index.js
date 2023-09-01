
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const axios = require('axios')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const apiRoutes = require('./routes/routes');
app.use(bodyParser.json());

let products = []

axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products').then((response) =>{products= response.data})

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


app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:index', (req, res) => {
  const index = req.params.index;
  
  if (index < 0 || index >= products.length) {
    return res.status(404).json({ message: 'Customer undefined' });
  }

  const product = products.find(product => product.id == index);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});