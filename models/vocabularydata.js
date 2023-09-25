'use strict';
module.exports = (sequelize, DataTypes) => {
  const VocabularyData = sequelize.define(
    "VocabularyData",
    {
      OriginalText_Korean: DataTypes.TEXT,
      OriginalText_Chinese: DataTypes.TEXT,
      OriginalText_Japanese: DataTypes.TEXT,
      TranslatedText_Korean: DataTypes.TEXT,
      TranslatedText_Chinese: DataTypes.TEXT,
      TranslatedText_Japanese: DataTypes.TEXT,
    },
    {}
  );
  VocabularyData.associate = function(models) {
    // associations can be defined here
    VocabularyData.belongsTo(models.User)
  };
  return VocabularyData;
};