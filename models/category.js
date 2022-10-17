const { DataTypes } = require('sequelize')
const db = require('./base')
const product = require('./product');

const category = db.define('Category', {
  categoryID: {
    type: DataTypes.STRING,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {

})

category.hasOne(product)

  (async () => {
    await db.sync();
  })();

module.exports = category;