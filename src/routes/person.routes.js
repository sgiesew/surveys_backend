module.exports = app => {
    const person = require("../controllers/person.controller.js");
  
    var router = require("express").Router();
  
    // Create a new person
    router.post("/", person.create);
  
    // Retrieve all people
    router.get("/", person.findAll);
  
    // Retrieve a single person with id
    router.get("/:id", person.findOne);
  
    // Update a person with id
    router.put("/:id", person.update);
  
    // Delete a person with id
    router.delete("/:id", person.delete);
  
    app.use('/api/people', router);
  };