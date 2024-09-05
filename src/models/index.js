const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "dbee4lodsl7rce",
  username: "yoxlbethsnsqln",
  password: "684957725f8a7eafa0934fed716a3db48b36d648e04dc92a89e1767bc3662451",
  host: "ec2-34-241-67-9.eu-west-1.compute.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require("./task.model.js")(sequelize, Sequelize);
db.surveys = require("./survey.model.js")(sequelize, Sequelize);
db.statements = require("./statement.model.js")(sequelize, Sequelize);
db.surveyTypes = require("./surveyType.model.js")(sequelize, Sequelize);

//db.surveyTypes.sync({ alter: true });

db.surveys.hasMany(db.tasks, { as: "tasks" });
db.tasks.belongsTo(db.surveys, {
  foreignKey: "surveyId",
  as: "survey",
});
db.surveyTypes.hasMany(db.statements, { as: "statements" });
db.statements.belongsTo(db.surveyTypes, {
  foreignKey: "surveyTypeId",
  as: "surveyType",
});
db.surveyTypes.hasMany(db.surveys, { as: "surveys" });
db.surveys.belongsTo(db.surveyTypes, {
  foreignKey: "surveyTypeId",
  as: "surveyType",
});

module.exports = db;