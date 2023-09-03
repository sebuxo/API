const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const axios = require('axios');
const { getProducts, getProductsById } = require('../../PayeTonKawa-api-revendeurs/index');
const jwt = require ('jsonwebtoken')
chai.use(chaiHttp);
const secretKey ='ihatemylife'
const token = jwt.sign({}, secretKey);
describe('API Tests', () => {

  const apiUrl = 'http://localhost:3001/';

 
  
  describe('GET /products', () => {
    it('should return an array of products', async () => {
      const response = await chai.request(apiUrl).get('products').set('x-api-key',token);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });

 
  describe('GET /products/:index', () => {
    it('should return a product by ID', async () => {
      const productId = 4;
      const response = await chai.request(apiUrl).get(`products/${productId}`).set('x-api-key',token);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.equal(productId.toString());
    })
  });

});
