const { DataTypes, Model } = require('sequelize')

const EMPLOYEE_TABLE = 'employees'

const EmployeeSchema = {
  idEmployee: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id_employee'
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'estandar'],
    defaultValue: 'estandar',
    allowNull: false
  }
}

class Employee extends Model {
  static associate (models) {
    this.hasMany(models.Bill, {
      as: 'bills',
      foreignKey: 'idEmployee'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: 'Employee',
      timestamps: false
    }
  }
}

module.exports = { EMPLOYEE_TABLE, EmployeeSchema, Employee }
