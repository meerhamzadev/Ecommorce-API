const product = require('../models/product');

const addProducts = async (req, res) => {
  try {
    const { productName, description,
      price, qtyStock, productImage } = req.body;
    const savedProduct = await product.create({
      productName, description,
      price, qtyStock, productImage
    });
    res.status(200).json({
      product: savedProduct,
      message: 'Product added to the database successfully'
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const getProducts = async (req, res) => {
  try {
    let products = await product.findAll()
    products = products.filter(({ dataValues }) => dataValues === dataValues)
    res.status(200).json({
      productData: products,
      message: 'All Product Details'
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  addProducts,
  getProducts
};