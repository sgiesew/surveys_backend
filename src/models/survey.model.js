module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define("survey", {
    num_completed: {
      type: DataTypes.SMALLINT
    }
  });

  return Survey;
};