module.exports = (sequelize, DataTypes) => {
  const Statement = sequelize.define("statement", {
    number: {
      type: DataTypes.SMALLINT
    },
    text: {
      type: DataTypes.TEXT
    }
  });

  return Statement;
};