const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db');
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://googleapis.com https://apis.google.com; script-src-elem 'self' https://apis.google.com; object-src 'none';");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(cors(corsOptions));
app.use(express.json()); 
connectDB();

app.use('/usersApi', userRouter); 
app.use('/productsApi', productRouter); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
