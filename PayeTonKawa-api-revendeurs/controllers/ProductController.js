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
          // If the response status is not 200 (OK), consider it as a not found situation
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        // Handle any errors that occur during the request (e.g., network issues)
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };


