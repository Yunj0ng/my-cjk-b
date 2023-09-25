'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
  await queryInterface.renameColumn("VocabularyData", "TranstedText_Japanese", "TranslatedText_Japanese");
},

  down: async (queryInterface, Sequelize)=> {
   await queryInterface.renameColumn(
     "VocabularyData",
     "TranslatedText_Japanese",
     "TranslatedText_Japanese"
   );
  }
};
