const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// sequelize操作符
const { Op } = require("sequelize");

const { User, VocabularyData } = require("../models");
// 判斷資料格式
const validator = require("validator");
const helpers = require("../_helpers");

const userController = {
  signUp: async (req, res, next) => {
    const { username, email, account, password } = req.body;
    if (!username || !email || !account || !password) {
      return res.status(400).json({
        success: false,
        message: "請填寫所有欄位",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "請輸入正確的 email",
      });
    }

    try {
      // 確認account和email是否重複註冊
      const [user1, user2] = await Promise.all([
        User.findOne({ where: { account } }),
        User.findOne({ where: { email } }),
      ]);

      if (user1) {
        return res.status(400).json({
          success: false,
          message: "帳號已存在",
        });
      }

      if (user2) {
        return res.status(400).json({
          success: false,
          message: "email 已重複註冊",
        });
      }

      // 雜湊加密密碼
      const hash = await bcrypt.hash(password, 10);
      const userData = await User.create({
        username,
        email,
        account,
        password: hash,
      });

      //註冊成功 建立新帳號
      const userJSON = userData.toJSON();
      //不回傳加密密碼給客戶端
      delete userData.password;

      return res.json({
        success: "true",
        data: { user: userJSON },
      });
    } catch (err) {
      return next(err);
    }
  },
  signIn: (req, res, next) => {
    const userData = helpers.getUser(req);
    delete userData.password;
    try {
      // 簽發 JWT，效期為 30 天
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.json({
        success: true,
        data: { token, user: userData },
      });
    } catch (err) {
      next(err);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const UserId = req.params.id;

      const user = await User.findByPk(UserId, {
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });

      if (!user) {
        const err = new Error("使用者不存在");
        throw err;
      }

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
  getUserVocabularies: async (req, res, next) => {
    try {
      const UserId = req.params.id;
      const wordToSearch = req.query.word;
      const [user, vocabularies] = await Promise.all([
        User.findByPk(UserId),
        VocabularyData.findAll({
          where: {
            UserId,
            [Op.or]: [
              {
                TranslatedText_Korean: {
                  [Op.regexp]: `.*${wordToSearch}.*`,
                },
              },
              {
                TranslatedText_Chinese: {
                  [Op.regexp]: `.*${wordToSearch}.*`,
                },
              },
              {
                TranslatedText_Japanese: {
                  [Op.regexp]: `.*${wordToSearch}.*`,
                },
              },
            ],
          },
          raw: true,
          nest: true,
        }),
      ]);
      if (!user) {
        const err = new Error("使用者不存在");
        throw err;
      }
      return res.json(vocabularies);
    } catch (err) {
      next(err);
    }
  },
  // getAuth:(req,res,next)=>{
  // 	helpers.getUser(req) ? res.json({success: true, message:null}) : res.json({success: false, message:'unauthorized'})
  // }
};

module.exports = userController;
