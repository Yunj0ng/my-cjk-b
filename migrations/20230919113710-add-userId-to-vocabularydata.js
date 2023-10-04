'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn("VocabularyData", "UserId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("VocabularyData", "UserId");
  }
};
