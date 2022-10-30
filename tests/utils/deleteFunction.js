const user = require('../../models/user');
const product = require('../../models/product');

const deleteUser = async (email) => {
  const deleteUser1 = await user.destroy({ where: { email } });
}

module.exports = { deleteUser }; 