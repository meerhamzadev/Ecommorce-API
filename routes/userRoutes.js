const express = require('express');
const { addCartItem, showCart,
  deleteCartItem, updateCartItem, checkoutCartItems } = require('../controllers/cartControllers');
const { signUp, signIn } = require('../controllers/userControllers');
const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/signIn', signIn);
userRouter.get('/:id/cart', showCart);
userRouter.post('/:id/cart/addItem', addCartItem);
userRouter.put('/:id/cart/updateItem', updateCartItem);
userRouter.delete('/:id/cart/deleteItem', deleteCartItem);
userRouter.get('/:id/cart/checkout', checkoutCartItems);

module.exports = userRouter;