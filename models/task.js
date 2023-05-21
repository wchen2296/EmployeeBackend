const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./index').sequelize;

class Task extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
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
          model: 'Employee', 
          key: 'id',
        }
      },
    }, {
      sequelize,
      modelName: 'Task' 
    });
  }

  static associate(models) {
    this.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
      as: 'employee',
    });
  }
}

module.exports = Task;
