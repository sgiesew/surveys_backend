module.exports = app => {
  const tasks = require("../controllers/task.controller.js");

  var router = require("express").Router();

  // Create a new task
  router.post("/", tasks.create);

  // Retrieve all tasks
  router.get("/", tasks.findAll);

  // Retrieve a single task with id
  router.get("/:id", tasks.findOne);

  // Delete a task with id
  router.delete("/:id", tasks.delete);

  app.use('/api/tasks', router);
};