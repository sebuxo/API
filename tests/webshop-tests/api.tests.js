const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const axios = require('axios');
const { getProducts, getProductsById } = require('../../PayeTonKawa-api-Webshop/index');
const jwt = require ('jsonwebtoken')
chai.use(chaiHttp);
const secretKey ='ihatemylife2'
const token = jwt.sign({},secretKey);
describe('API Tests', () => {

  const apiUrl = 'http://localhost:3002/';

 
  describe('Customer API', () => {
    describe('GET /customers', () => {
      it('should return an array of customers', async () => {
        const response = await chai.request(apiUrl).get('customers').set('x-api-key', token);
 
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    describe('GET /customers/:index', () => {
      it('should return a specific customer', async () => {
        const customerId = 7;
        const response = await chai.request(apiUrl).get(`customers/${customerId}`).set('x-api-key', token);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
      });
    });
  
    describe('GET /customers/:index/orders', () => {
      it('should return an array of orders for a specific customer', async () => {
        const customerId = 7;
        const response = await chai.request(apiUrl).get(`customers/${customerId}/orders`).set('x-api-key', token);
   
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    describe('GET /customers/:index/orders/:index2', () => {
      it('should return a specific order for a specific customer', async () => {
        const customerId = 7;
        const orderIndex = 1; 
        const response = await chai.request(apiUrl).get(`customers/${customerId}/orders/${orderIndex}`).set('x-api-key', token);
      
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object'); 
      });
    });
  
    describe('GET /customers/:index/orders/:index2/products', () => {
      it('should return an array of products for a specific order', async () => {
        const customerId = 7;
        const orderIndex = 1; 
        const response = await chai.request(apiUrl).get(`customers/${customerId}/orders/${orderIndex}/products`).set('x-api-key', token);
 
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    describe('GET /customers/:index/orders/:index2/products/:index3', () => {
      it('should return a specific product for a specific order', async () => {
        const customerId = 7;
        const orderIndex = 1; 
        const productIndex = 1; 
        const response = await chai.request(apiUrl).get(`customers/${customerId}/orders/${orderIndex}/products/${productIndex}`).set('x-api-key', token);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object'); 
      });
    });
  });
  

});
