module.exports = (sequelize, DataTypes) => {
    const surveyTypeStatus = sequelize.define("surveyTypeStatus", {
      usid: {
        type: DataTypes.TEXT
      }
    });
  
    return surveyTypeStatus;
  };