const express = require('express');
const { searchProduct } = require('../controllers/searchController');
const category = require('../models/category');
const searchRouter = express.Router();

searchRouter.get('/', searchProduct)
searchRouter.get('/cat', async (req, res) => {
  try {
    const categories = await category.findAll({ where: {} });
    console.log(categories);
    res.status(200).json({
      response: categories
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    })
  }
})
module.exports = searchRouter
