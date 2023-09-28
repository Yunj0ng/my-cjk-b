if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require("express");
const passport = require("./config/passport");
const routes = require('./routes')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3001;

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 初始化 passport
app.use(passport.initialize())

app.use(cors())
app.use(routes)

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;
