const { Sequelize } = require('sequelize');
const EmployeeModel = require('./employee');
const TaskModel = require('./task');


const sequelize = new Sequelize('employeedb', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Initialize models
const Employee = EmployeeModel.init(sequelize, Sequelize);
const Task = TaskModel.init(sequelize, Sequelize);

// Define associations
Object.values(sequelize.models)
      .filter(model => typeof model.associate === "function")
      .forEach(model => model.associate(sequelize.models));

module.exports = {
  sequelize,
  Employee,
  Task,
};
