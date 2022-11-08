const cart = require('../models/cart');
const user = require('../models/user');
const product = require('../models/product');

const addCartItem = async (req, res) => {
  const { productId, noOfItems } = req.body;
  const userId = req.params.id;

  try {
    const addedItem = await cart.create({
      userId, productId, noOfItems
    })

    res.status(200).json({
      message: 'Item added successfully into the cart'
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const updateCartItem = async (req, res) => {
  const userId = req.params.id;
  const { previousProductId, newProductId, noOfItems } = req.body;

  try {
    const updatedItem = await cart.update({ productId: newProductId, noOfItems }, {
      where: { userId, productId: previousProductId }
    })

    if (!updatedItem[0]) {
      return res.status(404).json({
        message: 'Unable to update the item because it is not in cart'
      })
    }

    res.status(200).json({
      message: 'Item updated successfully from the cart'
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const deleteCartItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.params.id;
  try {
    const deletedItem = await cart.destroy({
      where: { userId, productId }
    })

    if (!deletedItem) {
      return res.status(404).json({
        message: 'Unable to delete item because it is not in cart'
      })
    }
    res.status(200).json({
      message: 'Item deleted successfully from the cart'
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }

}

const checkoutCartItems = async (req, res) => {
  const id = req.params.id;
  let totalAmount = 0;

  try {
    let cartItems = cart.findAll({
      where: { userId: id },
      attributes: { exclude: ["createdAt", "updatedAt", "cartId", "userId"] },
    });
    let cartUser = user.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt", "id", "user_password"] }
    });

    [cartItems, cartUser] = await Promise.all([cartItems, cartUser]);

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const productItem = await product.findOne({
        where: { productId: item.productId },
        attributes: { exclude: ["createdAt", "updatedAt", "productId", "qtyStock", "categoryID"] }
      });
      productItem.dataValues.amount = productItem.price * item.noOfItems;
      item.dataValues = {
        ...item.dataValues,
        productDetails: productItem
      };
      totalAmount = totalAmount + productItem.dataValues.amount;
    }

    let cartDetails = {
      user: cartUser,
      cartItems,
      totalAmount
    };

    res.status(200).json({
      orderSummary: cartDetails,
      message: 'Summary of the order'
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const showCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const cartItems = await cart.findAll({
      where: { userId }
    })

    if (!cartItems.length) {
      return res.status(404).json({
        message: 'Cart is empty'
      })
    }

    res.status(200).json({
      response: cartItems,
      message: `List of cart Items of the User`
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
  addCartItem,
  deleteCartItem,
  updateCartItem,
  showCart,
  checkoutCartItems
};