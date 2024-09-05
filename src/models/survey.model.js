module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define("survey", {
    current_task: {
      type: DataTypes.SMALLINT
    },
    num_completed: {
      type: DataTypes.SMALLINT
    }
  });

  return Survey;
};