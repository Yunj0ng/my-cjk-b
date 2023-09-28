const express = require('express');
const router = express.Router();

const users = require('./modules/users')
const vocabulary = require('./modules/vocabulary')
const passport = require('../config/passport')

const userController = require('../controllers/user-controller')
const{ generalErrorHandler} = require('../middleware/error-handler')
const { authenticator } = require("../middleware/auth");

// 登入註冊
router.post('/api/users/signin',passport.authenticate('local', {session:false}),userController.signIn)
router.post('/api/users',userController.signUp);
router.use('/api/users', authenticator,users)

// 單字
router.use("/api/vocabulary", authenticator, vocabulary);

router.get("/", (req, res) => res.send("hello world"));
router.use('/', generalErrorHandler)


module.exports = router;
