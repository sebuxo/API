const axios = require('axios');
let orders = [{}]


exports.getCustomersOrders = async (req, res) => {
  const index = req.params.index;
  const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/${index}/orders`)
  orders = response.data
  res.json(orders);
};


exports.getcustomerOrderById = async (req, res) => {
  const index = req.params.index;
  const index2 = req.params.index2;
  const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/${index}/orders/${index2}`)
  orders = response.data

  res.json(orders);
};