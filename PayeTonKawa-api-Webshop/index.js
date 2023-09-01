const Crypto = require('crypto')
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

const authorizedKeys = [];

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

const customers = await fetch()
const customers = require('./customers.json');
const orders = require('./orders.json');
const ordersProduct = require('./orders_product.json');
const Products = require('./products.json')

// return all customers
app.get('/customers', validateApiKey, (req, res) => {
  res.json(customers);
});


// return customer of id : index
app.get('/customers/:index', validateApiKey, (req, res) => {
  const index = req.params.index;
  
  if (index < 0 || index >= customers.length) {
    return res.status(404).json({ message: 'Customer undefined' });
  }

  const customer = customers.find(customer => customer._id == index);
  res.json(customer);
});

app.get('/customers/:index/orders/:index2', validateApiKey, (req, res) => {
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
app.get('/customers/:index/orders/:index2/products', validateApiKey, (req, res) => {
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