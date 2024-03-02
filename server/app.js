const express = require('express');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes');
const { verifyAccessToken } = require('./middleware/verifyToken');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 4000;


app.use(cookieParser());
app.use(verifyAccessToken);
app.use(express.urlencoded({ extended: 'true' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.listen(PORT, () => {
  console.log(`SERVER IS UP AT ${PORT} PORT`);
});
