const express = require('express');
const router = express.Router();
const itemController = require('./controllers/itemController');

// Define routes
router.get('/items', itemController.getItems);
router.post('/items', itemController.createItem);

module.exports = router;