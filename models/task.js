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
        allowNull: true, 
        defaultValue: false 
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
          model: 'Employees', 
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
