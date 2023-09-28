const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcryptjs");

const { User, VocabularyData } = require("../models");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTSecret = process.env.JWT_SECRET || "SECRET";

// 本地端驗證使用者 cd=callbackfunction
passport.use(
  new LocalStrategy(
    { usernameField: "account", passwordField: "password" },
    async (account, password, cb) => {
      try {
        const user = await User.findOne({
          where: { account },
          raw: true,
        });
        // 使用者不存在
        if (!user) {
          const err = new Error("帳號不存在");
          throw err;
        }
        // 使用者存在 驗證密碼
        const result = await bcrypt.compare(password, user.password);
        // 密碼錯誤
        if (!result) {
          throw new Error("密碼錯誤");
        }
        // 驗證通過
        delete user.password;
        return cb(null, user);
      } catch (err) {
        return cb(err, false);
      }
    }
  )
);

// 解析 JWT 後 根據 JWT 中的使用者 ID 查找相應的使用者資料
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWTSecret,
};
passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
    try {
      const user = await User.findByPk(jwtPayload.id, {
        include: [{ model: VocabularyData }],
      });
      return cb(null, user.toJSON());
    } catch (err) {
      return cb(err, false);
    }
  })
);

module.exports = passport;
