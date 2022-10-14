const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routes/userRoutes');

app.use(express.json())
app.use('/api/users', userRouter);
app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.listen(port, () => {
  console.log(`server started successfully at port ${port}`);
})