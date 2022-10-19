const { DataTypes } = require('sequelize')
const db = require('./base');
const User = require('./user');
const product = require('./product');

const cart = db.define('Cart', {
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  noOfItems: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {})
cart.belongsTo(product, {
  foreignKey: 'productId'
});
cart.belongsTo(User, {
  foreignKey: 'userId'
});

// (async () => {
//   await cart.destroy({
//     where: { productId: null }
//   })
// })();

(async () => {
  await db.sync();
})();

module.exports = cart;