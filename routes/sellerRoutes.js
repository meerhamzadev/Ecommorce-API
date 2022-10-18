const express = require('express');
const { addProduct, updateProduct, deleteProduct } = require('../controllers/productControllers')
const sellerRouter = express.Router();

sellerRouter.post('/addProduct', addProduct);
sellerRouter.put('/updateProduct/:id', updateProduct);
sellerRouter.delete('/deleteProduct/:id', deleteProduct);

module.exports = sellerRouter;