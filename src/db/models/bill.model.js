const { DataTypes, Model } = require('sequelize')

const { CLIENT_TABLE } = require('./client.model')
const { EMPLOYEE_TABLE } = require('./employee.model')

const BILL_TABLE = 'bills'

const BillSchema = {
  idBill: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id_bill'
  },
  wayToPay: {
    type: DataTypes.ENUM,
    values: ['efectivo', 'tarjeta credito', 'tarjeta debito'],
    allowNull: false,
    field: 'way_to_pay'
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  idClient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_client',
    reference: {
      model: CLIENT_TABLE,
      key: 'id_client'
    }
  },
  idEmployee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_employee',
    reference: {
      model: EMPLOYEE_TABLE,
      key: 'id_employee'
    }
  }
}

class Bill extends Model {
  static associate (models) {
    // Associate with Client - Bill 1 a n with Client
    this.belongsTo(models.Client, {
      as: 'client',
      foreignKey: 'idClient'
    })

    // Associate with Employee - Bill 1 a n with Employee-Bill
    this.belongsTo(models.Employee, {
      as: 'employee',
      foreignKey: 'idBill'
    })

    // Associate with Product-Sale - Bill 1 a n with Prodcut-Sale
    this.hasMany(models.ProductSale, {
      as: 'productsSold',
      foreignKey: 'idBill'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: BILL_TABLE,
      modelName: 'Bill',
      timestamps: false
    }
  }
}

module.exports = { BILL_TABLE, BillSchema, Bill }
