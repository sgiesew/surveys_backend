module.exports = app => {
  const { protect } = require("../middleware/authMiddleware.js");
  const statements = require("../controllers/statement.controller.js");

  var router = require("express").Router();

  // Create a new statement
  router.post("/", protect, statements.create);

  // Retrieve all statements
  router.get("/", protect, statements.findAll);

  // Retrieve a single statement with id
  router.get("/:id", protect, statements.findOne);

  // Update a statement with id
  router.put("/:id", protect, statements.update);

  // Delete a statement with id
  router.delete("/:id", protect, statements.delete);

  app.use('/api/statements', router);
};