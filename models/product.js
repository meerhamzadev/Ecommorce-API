const { DataTypes } = require('sequelize')
const db = require('./base')

const product = db.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  qtyStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productImage: {
    type: DataTypes.STRING,
  }
}, {

});

(async () => {
  await db.sync();
})();

module.exports = product;