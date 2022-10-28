const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'hello_hamza1421'

const signUp = async (req, res) => {
  const { firstName, lastName, email, userPassword } = req.body;

  try {
    const isUserExist = await user.findOne({
      where: { email: email }
    });
    if (isUserExist) {
      return res.status(400).json({
        message: 'User with the same email already exists'
      })
    }

    const hashedPass = await bcrypt.hash(userPassword, 10);
    const createdUser = await user.create({
      firstName, lastName, email,
      user_password: hashedPass
    });

    const token = jwt.sign({
      firstName: createdUser.firstName,
      email: createdUser.email
    }, SECRET_KEY);

    res.status(200).json({
      token,
      user: createdUser,
      message: 'User created Successfully'
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const signIn = async (req, res) => {
  const { email, userPassword } = req.body;

  try {
    const isUserExist = await user.findOne({
      where: { email: email }
    });
    if (!isUserExist) {
      return res.status(404).json({
        message: 'User does not exist'
      })
    }

    const matchPassword = await bcrypt.compare(userPassword, isUserExist.user_password);
    if (!matchPassword) {
      return res.status(400).json({
        message: 'Invalid Credentials'
      })
    }

    const token = jwt.sign({
      firstName: isUserExist.firstName,
      email: isUserExist.email
    }, SECRET_KEY);

    res.status(200).json({
      token,
      user: isUserExist,
      message: 'Successfully sign in to the system'
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  signUp,
  signIn
}