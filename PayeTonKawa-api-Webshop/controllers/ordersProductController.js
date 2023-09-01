const axios = require('axios');
let ordersProduct = [{}]


exports.getOrdersProducts = async (req,res) =>{
    const index = req.params.index;
    const index2 = req.params.index2;
    const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/${index}/orders/${index2}/products`)
    ordersProduct = response.data
    res.json(ordersProduct)
}

exports.getOrdersProductsById = async (req,res) =>{
    const index = req.params.index;
    const index2 = req.params.index2;
    const index3 = req.params.index3
    const response = await axios.get(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/${index}/orders/${index2}/products/${index3}`)
    ordersProduct = response.data
    res.json(ordersProduct)
}




