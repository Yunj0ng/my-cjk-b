// const createError = require("http-errors");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(logger("dev"));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/modules/users");
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require("express");
const passport = require("./config/passport");
const routes = require('./routes')
const cors = require('cors')

// const session = require("express-session");
// const { getUser } = require("./helpers/auth-helpers");
// const db = require("..models/");
// const VocabularyData = db.VocabularyData;
// const User = db.User;
// app.use(
//   session({
//     secret: "ThisIsMySecret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );


const app = express();
const port = 3001;

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 初始化 passport
app.use(passport.initialize())
// // 啟動 session
// app.use(passport.session());
// passport(app);

app.use(cors())
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
