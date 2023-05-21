const { DataTypes,Sequelize } = require('sequelize');

class Employee extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.Task, {
      foreignKey: 'employeeId',
      as: 'tasks',
    });
  }
}

module.exports = Employee;
