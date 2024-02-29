const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const indexRouter = require('./routes/index.routes');
const { verifyAccessToken } = require('./middleware/verifyToken');




app.use(cookieParser());
app.use(verifyAccessToken);
app.use(express.urlencoded({ extended: 'true' }));
app.use(express.json());

app.use('/', indexRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`SERVER IS UP AT ${PORT} PORT`);
});
