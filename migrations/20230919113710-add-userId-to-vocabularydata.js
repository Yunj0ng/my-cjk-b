'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Vocabularydata','UserId', { type:Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:'Users',
        key:'id'
      }
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Vocabularydata','UserId')
  }
};
