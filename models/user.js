const { DataTypes } = require('sequelize');
const db = require('./base');

const User = db.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Other model options go here
});

(async () => {
  await db.sync();
})();
module.exports = User;