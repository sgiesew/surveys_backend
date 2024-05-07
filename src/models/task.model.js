module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    question: {
      type: Sequelize.STRING
    },
    answer: {
      type: Sequelize.STRING
    }
  });

  return Task;
};