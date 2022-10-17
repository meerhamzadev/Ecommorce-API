const express = require('express');
const { getProducts } = require('../controllers/productControllers')
const buyerRouter = express.Router();

buyerRouter.get('/getProducts', getProducts);

module.exports = buyerRouter;