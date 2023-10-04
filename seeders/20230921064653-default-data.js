"use strict";

const bcrypt = require("bcryptjs");
const SEED_USER = {
  username: "user",
  email: "user@example.com",
  account: "user",
  password: "123",
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    
return queryInterface
  .bulkInsert(
    "Users",
    [
      {
        username: "user",
        email: "user@example.com",
        account: "user",
        password: bcrypt.hashSync('123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  )
  .then((userId) =>
    queryInterface.bulkInsert(
      "VocabularyData",
      [
        {
          OriginalText_Korean: "안녕",
          OriginalText_Japanese: "こんにちは",
          OriginalText_Chinese: "你好",
          TranslatedText_Korean: "안녕",
          TranslatedText_Japanese: "こんにちは",
          TranslatedText_Chinese: "你好",
          UserId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  );
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("VocabularyData", null, {});
  },
};
