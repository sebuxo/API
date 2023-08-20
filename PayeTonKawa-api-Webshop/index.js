
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

const customers = require('./customers.json');

// return all customers
app.get('/customers', (req, res) => {
  res.json(customers);
});

// return customer of id : index
app.get('/customer/:index', (req, res) => {
  const index = req.params.index;
  
  if (index < 0 || index >= customers.length) {
    return res.status(404).json({ message: 'Customer undefined' });
  }

  const customer = customers.find(customer => customer._id == index);
  res.json(customer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});