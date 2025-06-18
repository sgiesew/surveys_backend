module.exports = app => {
  const { protect } = require("../middleware/authMiddleware.js");
  const role = require("../controllers/role.controller.js");

  var router = require("express").Router();

  // Create a new role
  router.post("/", protect, role.create);

  // Retrieve all roles
  router.get("/", protect, role.findAll);

  // Retrieve a single role with id
  router.get("/:id", protect, role.findOne);

  // Update a role with id
  router.put("/:id", protect, role.update);

  // Delete a role with id
  router.delete("/:id", protect, role.delete);

  app.use('/api/roles', router);
};