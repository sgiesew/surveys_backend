const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "d5tbcdsf1umo0s",
  username: "uck6m3qsb2iirh",
  password: "pdad47f28cefcfab371dad7f0795ba509942563d8dfb577200d0f61652e767b65",
  host: "c54frm92m19bh1.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com",
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
db.surveyTypeStatus = require("./surveyTypeStatus.model.js")(sequelize, Sequelize);

//db.surveys.sync({ alter: true }); //!!!
//db.surveyTypes.sync({ alter: true }); //!!!
//sequelize.sync({ alter: true });
//sequelize.sync({ force: true });

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
db.surveyTypeStatus.hasMany(db.surveyTypes, { as: "surveyTypes" });
db.surveyTypes.belongsTo(db.surveyTypeStatus, {
  foreignKey: "surveyTypeStatusId",
  as: "surveyTypeStatus",
});

module.exports = db;