const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize();
const config = require('../config/config')['development'];
const sequelize = new Sequelize(`${config.url}`, config);

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
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
  await sequelize.sync();
})();
module.exports = User;