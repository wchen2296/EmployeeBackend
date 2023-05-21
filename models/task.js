const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index.js');

const Task = sequelize.define('Task', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priorityLevel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  completionStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Employees', // 'Employees' refers to table name
      key: 'id',
    }
  }
}, {});

module.exports = Task;
