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
    try {
        const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products/${index}`);
        
        if (response.status === 200) {
          const product = response.data;
          res.json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };


