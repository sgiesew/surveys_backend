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

module.exports = db;