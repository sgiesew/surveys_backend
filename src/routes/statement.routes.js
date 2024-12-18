module.exports = app => {
  const statements = require("../controllers/statement.controller.js");

  var router = require("express").Router();

  // Create a new statement
  router.post("/", statements.create);

  // Retrieve all statements
  router.get("/", statements.findAll);

  // Retrieve a single statement with id
  router.get("/:id", statements.findOne);

  // Update a statement with id
  router.put("/:id", statements.update);

  // Delete a statement with id
  router.delete("/:id", statements.delete);

  app.use('/api/statements', router);
};