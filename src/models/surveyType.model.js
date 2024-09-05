module.exports = (sequelize, DataTypes) => {
  const SurveyType = sequelize.define("surveyType", {
    name: {
      type: DataTypes.TEXT
    }
  });

  return SurveyType;
};