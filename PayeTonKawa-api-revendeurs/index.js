
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

const products = require('./products.json');

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:index', (req, res) => {
  const index = req.params.index;
  
  if (index < 0 || index >= products.length) {
    return res.status(404).json({ message: 'Customer undefined' });
  }

  const product = products.find(product => product._id == index);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});