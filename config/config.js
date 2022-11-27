require('dotenv').config();

module.exports = {
  development: {
    'url': process.env.DATABASE_URL,
    "dialect": process.env.DB,
    logging: false
  },
  test: {
    url: process.env.LOCAL_URL,
    dialect: process.env.DB
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DB
  }
}
