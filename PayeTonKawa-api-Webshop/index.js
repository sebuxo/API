
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to the mobile app API!');
});

const customers = require('./customers.json');
const orders = require('./orders.json');
const ordersProduct = require('./orders_product.json');
const Products = require('./products.json')

// return all customers
app.get('/customers', (req, res) => {
  res.json(customers);
});

app.get('/products', (req, res) => {
  res.json(Products);
});

// return customer of id : index
app.get('/customers/:index', (req, res) => {
  const index = req.params.index;
  
  if (index < 0 || index >= customers.length) {
    return res.status(404).json({ message: 'Customer undefined' });
  }

  const customer = customers.find(customer => customer._id == index);
  res.json(customer);
});

app.get('/customers/:index/orders/:index2', (req, res) => {
  const index = req.params.index;
  const index2 = req.params.index2
  
  if ((index < 0 || index >= customers.length) && (index2 < 0 || index2 >= orders.length)) {
    return res.status(404).json({ message: 'Customer or order undefined' });
  }
  const order = orders.find(order => (order.customerId == index) && (order._id == index2));
  console.log(order)

  res.json(order);
});


// return all products of customer id index and order id index2.
app.get('/customers/:index/orders/:index2/products', (req, res) => {
  const index = req.params.index;
  const index2 = req.params.index2
  
  if ((index < 0 || index >= customers.length) && (index2 < 0 || index2 >= orders.length)) {
    return res.status(404).json({ message: 'Customer or order undefined' });
  }
  const order = orders.find(order => (order.customerId == index) && (order._id == index2));
  const products = ordersProduct.filter(product => product.orderid==order._id);

  res.json(products);
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});