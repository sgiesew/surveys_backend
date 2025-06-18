module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define("Person", {
      firstName: {
        type: DataTypes.TEXT
      },
      lastName: {
        type: DataTypes.TEXT
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error("Do not try to set the 'fullName' value!");
        },
      },
      username: {
        type: DataTypes.TEXT,
        unique: true
      },
      password: {
        type: DataTypes.TEXT
      }
    });
  
    return Person;
  };