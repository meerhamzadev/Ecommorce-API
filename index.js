const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/sellerRoutes');
const buyerRoutes = require('./routes/buyerRoutes')

app.use(express.json())

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/seller', productRoutes);
app.use('/api/v1/buyer', buyerRoutes);

app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.listen(port, () => {
  console.log(`server started successfully at port ${port}`);
})