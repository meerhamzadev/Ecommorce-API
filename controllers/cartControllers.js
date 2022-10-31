const cart = require('../models/cart');

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
  showCart
};