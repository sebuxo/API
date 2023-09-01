const { response } = require("express");
const axios = require('axios');

let products = [];



exports.getProducts = async (req, res) => {
    const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products`)
    products=response.data
  
    res.json(products);
};
  
exports.getProductsById = async (req, res) => {
    const index = req.params.index;
    const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products/${index}`)
    products=response.data
  
    res.json(products);
};

