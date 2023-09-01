const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController')




/**
 * @swagger
 * 
 * /products/:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/Product'
 *       '404':
 *         description: Not Found
 *
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       createdAt:
 *         type: string
 *         format: date-time
 *         example: "2023-08-30T08:29:52.728Z"
 *       name:
 *         type: string
 *         example: "Dorothy Dietrich"
 *       details:
 *         $ref: '#/definitions/ProductDetails'
 *       stock:
 *         type: integer
 *         example: 16996
 *       id:
 *         type: string
 *         example: "1"
 *       orderId:
 *         type: string
 *         example: "1"
 *
 *   ProductDetails:
 *     type: object
 *     properties:
 *       price:
 *         type: string
 *         example: "547.00"
 *       description:
 *         type: string
 *         example: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles"
 *       color:
 *         type: string
 *         example: "orchid"
 *     required:
 *       - price
 *       - description
 *       - color
 */

router.get('/products', productController.getProducts);

/**
 * @swagger
 * 
 * /products/{index}:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         type: integer
 *         description: The ID of the product
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/Product'
 *       '404':
 *         description: Not Found
 *
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       createdAt:
 *         type: string
 *         format: date-time
 *         example: "2023-08-30T08:29:52.728Z"
 *       name:
 *         type: string
 *         example: "Dorothy Dietrich"
 *       details:
 *         $ref: '#/definitions/ProductDetails'
 *       stock:
 *         type: integer
 *         example: 16996
 *       id:
 *         type: string
 *         example: "1"
 *       orderId:
 *         type: string
 *         example: "1"
 *
 *   ProductDetails:
 *     type: object
 *     properties:
 *       price:
 *         type: string
 *         example: "547.00"
 *       description:
 *         type: string
 *         example: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles"
 *       color:
 *         type: string
 *         example: "orchid"
 *     required:
 *       - price
 *       - description
 *       - color
 */
router.get('/products/:index', productController.getProductsById);


