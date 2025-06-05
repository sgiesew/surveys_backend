module.exports = (sequelize, DataTypes) => {
  const SurveyType = sequelize.define("surveyType", {
    name: {
      type: DataTypes.TEXT
    },
    num_surveys: {
      type: DataTypes.SMALLINT
    },
    num_completed: {
      type: DataTypes.SMALLINT
    }
  });

  return SurveyType;
};