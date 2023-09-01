const { response } = require("express");
const axios = require('axios');

let customer = [];



exports.getCustomers = async (req, res) => {
  const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/`)
  customer=response.data

  res.json(customer);
};

exports.getCustomersById = async (req, res) => {
  const index = req.params.index;

  const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/${index}`)
  customer=response.data
  if (index < 0 || index >= customer.length) {
    return res.status(404).json({ message: 'Customer undefined' });
  }

  res.json(customer);
};
