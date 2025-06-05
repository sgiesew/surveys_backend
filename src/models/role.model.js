module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define("role", {
      usid: {
        type: DataTypes.TEXT
      }
    });
  
    return role;
  };