const { Op } = require('sequelize');
const product = require('../models/product');
const category = require('../models/category');

const searchProduct = async (req, res) => {

  const keyword = req.query.keyword || req.query.key || req.query.k;
  const name = req.query.name || req.query.n;
  const cat = req.query.category || req.query.cat || req.query.c;
  const isFilter = req.query.filter || req.query.f || false;

  const searchQuery = isFilter ?
    {
      [Op.and]: {
        productName: { [Op.like]: `%${name}%` },
        description: { [Op.like]: `%${keyword}%` },
      }
    } :
    {
      [Op.or]: {
        productName: { [Op.like]: `%${name}%` },
        description: { [Op.like]: `%${keyword}%` },
      }
    }

  try {
    const resultItem = await product.findAll({
      where: searchQuery,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: category,
        attributes: { exclude: ["createdAt", "updatedAt", "id"] },
        where: { categoryName: { [Op.like]: `%${cat}%` } },
      },
    })

    if (!resultItem.length) {
      return res.status(404).json({
        message: 'Unable to find the product'
      })
    }

    res.status(200).json({
      result: resultItem,
      message: 'The list of available products'
    })
  }
  catch (err) {
    console.log('\n', err);
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

module.exports = { searchProduct }