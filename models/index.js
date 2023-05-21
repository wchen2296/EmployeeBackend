const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('employeedb', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
