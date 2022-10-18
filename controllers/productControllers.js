const product = require('../models/product');

const addProduct = async (req, res) => {
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

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { productName, description,
    price, qtyStock, productImage } = req.body;
  const updatedData = {
    productName,
    description,
    price,
    qtyStock,
    productImage
  }

  try {
    const updatedProduct = await product.update(updatedData, {
      where: { productId }
    })

    if (!updatedProduct[0]) {
      return res.status(404).json({
        message: 'Unable to update because product does not exist'
      })
    }

    res.status(200).json({
      message: 'Product updated successfully'
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const delProduct = await product.destroy({
      where: { productId }
    })

    if (!delProduct) {
      return res.status(404).json({
        message: 'Unable to delete because product does not exist'
      })
    }

    res.status(200).json({
      message: 'Product deleted successfully'
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
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts
};