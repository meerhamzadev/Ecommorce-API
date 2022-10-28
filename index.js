const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/sellerRoutes');
const buyerRoutes = require('./routes/buyerRoutes')
const searchRoutes = require('./routes/searchRoutes');
const app = express();

app.use(express.json())

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/seller', productRoutes);
app.use('/api/v1/buyer', buyerRoutes);
app.use('/api/v1/search', searchRoutes);

app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})



module.exports = { app }