const express = require('express');
const { addProducts } = require('../controllers/productControllers')
const sellerRouter = express.Router();

sellerRouter.post('/addProduct', addProducts);

module.exports = sellerRouter;