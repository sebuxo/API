const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const orderController = require('../controllers/ordersController')
const ordersProductController = require('../controllers/ordersProductController')

// Routes
/**
 * @swagger
 * 
 * /customers:

 *  get:
 *    description: Use to request all customers
 *    tags: [Customers] 
 *    responses:
 *      '200':
 *        description: A successful response
 */



router.get('/customers', customerController.getCustomers);
/** 
*@swagger
*info:
*  title: User Data API
*  version: "1.0.0"
*paths:
*  /customers/{index}:
*    get:
*      summary: Get customer by ID
*      tags: [Customers]    
*      parameters:
*        - name: index
*          in: path
*          required: true
*          type: string
*          description: The ID of the user to retrieve
*      responses:
*        200:
*          description: Successful response
*          schema:
*            $ref: "#/definitions/User"
*  /customers:
*    get:
*      summary: Get all customers
*      responses:
*        200:
*          description: A successful response
*          schema:
*            type: array
*            items:
*              $ref: "#/definitions/User"

*definitions:
*  User:
*    type: object
*    properties:
*      createdAt:
*        type: string
*        format: date-time
*        example: "2023-08-29T17:41:41.077Z"
*      name:
*        type: string
*        example: "Eugene Pfannerstill"
*      username:
*        type: string
*        example: "Kyle_Sawayn66"
*      firstName:
*        type: string
*        example: "Dahlia"
*      lastName:
*        type: string
*        example: "Jaskolski"
*      address:
*        type: object
*        properties:
*          postalCode:
*            type: string
*            example: "51160"
*          city:
*            type: string
*            example: "Phoenix"
*      profile:
*        type: object
*        properties:
*          firstName:
*            type: string
*            example: "Vidal"
*          lastName:
*            type: string
*            example: "Kuhic"
*      company:
*        type: object
*        properties:
*          companyName:
*            type: string
*            example: "Harber - Steuber"
*      id:
*        type: string
*        example: "7"
*      orders:
*        type: array
*        items:
*          $ref: "#/definitions/Order"

*  Order:
*    type: object
*    properties:
*      createdAt:
*        type: string
*        format: date-time
*        example: "2023-08-30T10:54:50.688Z"
*      id:
*        type: string
*        example: "1"
*      customerId:
*        type: string
*        example: "7"
*/
router.get('/customers/:index',customerController.getCustomersById)

/** 
*@swagger
*info:
*  version: 1.0.0
*  title: Your API Title
*paths:
*  /customers/{index}/orders:
*    get:
*      summary: Get a customer's order by index.
*      tags: [Orders]
*      parameters:
*        - name: index
*          in: path
*          required: true
*          description: Index of the customer.
*          type: integer
*      responses:
*        '200':
*          description: Successfully retrieved the order.
*          schema:
*            type: array
*            items:
*              $ref: '#/definitions/OrderResponse'
*        '404':
*          description: Customer or order not found.
*definitions:
*  OrderResponse:
*    type: array
*    items:
*      $ref: '#/definitions/OrderItem'
*  OrderItem:
*    type: object
*    properties:
*      createdAt:
*        type: string
*        format: date-time
*      id:
*        type: string
*      customerId:
*        type: string
*      products:
*        type: array
*        items:
*          $ref: '#/definitions/ProductItem'
*  ProductItem:
*    type: object
*    properties:
*      createdAt:
*        type: string
*        format: date-time
*      name:
*        type: string
*      details:
*        type: object
*        properties:
*          price:
*            type: string
*          description:
*            type: string
*          color:
*            type: string
*      stock:
*        type: integer
*      id:
*        type: string
*      orderId:
*        type: string
*/
router.get('/customers/:index/orders/',orderController.getCustomersOrders)




/** 
*@swagger
*info:
*  version: 1.0.0
*  title: Your API Title
*paths:
*  /customers/{index}/orders/{index2}:
*    get:
*      summary: Get a customer's order by index.
*      tags: [Orders] 
*      parameters:
*        - name: index
*          in: path
*          required: true
*          description: Index of the customer.
*          type: integer
*        - name: index2
*          in: path
*          required: true
*          description: Index of the order.
*          type: integer
*      responses:
*        '200':
*          description: Successfully retrieved the order.
*          schema:
*            type: array
*            items:
*              $ref: '#/definitions/OrderResponse'
*        '404':
*          description: Customer or order not found.
*definitions:
*  OrderResponse:
*    type: array
*    items:
*      $ref: '#/definitions/OrderItem'
*  OrderItem:
*    type: object
*    properties:
*      createdAt:
*        type: string
*        format: date-time
*      id:
*        type: string
*      customerId:
*        type: string
*      products:
*        type: array
*        items:
*          $ref: '#/definitions/ProductItem'
*  ProductItem:
*    type: object
*    properties:
*      createdAt:
*        type: string
*        format: date-time
*      name:
*        type: string
*      details:
*        type: object
*        properties:
*          price:
*            type: string
*          description:
*            type: string
*          color:
*            type: string
*      stock:
*        type: integer
*      id:
*        type: string
*      orderId:
*        type: string
*/
router.get('/customers/:index/orders/:index2',orderController.getcustomerOrderById)


/**
 * @swagger
 * 
 * /customers/{index}/orders/{index2}/products:
 *   get:
 *     summary: Get orders' product 
 *     tags: [OrdersProducts]
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         type: integer
 *         description: The ID of the customer
 *       - in: path
 *         name: index2
 *         required: true
 *         type: integer
 *         description: The ID of the order
 *    
 *        
 *        
 *         
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
router.get('/customers/:index/orders/:index2/products',ordersProductController.getOrdersProducts)

/**
 * @swagger
 * 
 * /customers/{index}/orders/{index2}/products/{index3}:
 *   get:
 *     summary: Get orders' product by IDs
 *     tags: [OrdersProducts]
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         type: integer
 *         description: The ID of the customer
 *       - in: path
 *         name: index2
 *         required: true
 *         type: integer
 *         description: The ID of the order
 *       - in: path
 *         name: index3
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
router.get('/customers/:index/orders/:index2/products/:index3',ordersProductController.getOrdersProductsById)


module.exports = router;