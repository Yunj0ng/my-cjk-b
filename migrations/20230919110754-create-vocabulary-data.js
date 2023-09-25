'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VocabularyData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OriginalText_Korean: {
        type: Sequelize.TEXT
      },
      OriginalText_Chinese: {
        type: Sequelize.TEXT
      },
      OriginalText_Japanese: {
        type: Sequelize.TEXT
      },
      TranslatedText_Korean: {
        type: Sequelize.TEXT
      },
      TranslatedText_Chinese: {
        type: Sequelize.TEXT
      },
      TranstedText_Japanese: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VocabularyData');
  }
};