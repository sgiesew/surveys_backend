module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define("Person", {
      realName: {
        type: DataTypes.TEXT
      },
      username: {
        type: DataTypes.TEXT
      },
      password: {
        type: DataTypes.TEXT
      }
    });
  
    return Person;
  };