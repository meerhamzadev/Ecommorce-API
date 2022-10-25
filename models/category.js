const { DataTypes } = require('sequelize')
const db = require('./base')

const category = db.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {

});

(async () => {
  await db.sync()
})();

module.exports = category;