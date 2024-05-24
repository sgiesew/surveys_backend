module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("task", {
    number: {
      type: DataTypes.SMALLINT
    },
    response: {
      type: DataTypes.SMALLINT
    }
  });

  return Task;
};