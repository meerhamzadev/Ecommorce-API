const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize();
const config = require('../config/config')['development'];
const db = new Sequelize(`${config.url}`, config);

module.exports = db;