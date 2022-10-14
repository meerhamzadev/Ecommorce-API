const express = require('express');
const { signUp, signIn } = require('../controllers/userControllers')
const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/signIn', signIn);

module.exports = userRouter;