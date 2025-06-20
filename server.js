const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sync database
const db = require("./src/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

require("./src/routes/task.routes")(app);
require("./src/routes/survey.routes")(app);
require("./src/routes/statement.routes")(app);
require("./src/routes/surveyType.routes")(app);
require("./src/routes/surveyTypeStatus.routes")(app);
require("./src/routes/person.routes")(app);
require("./src/routes/role.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
