const { DataTypes, Model } = require('sequelize')

const CLIENT_TABLE = 'clients'

const ClientSchema = {
  idClient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id_client'
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
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

class Client extends Model {
  static associate (models) {
    this.hasMany(models.Bill, {
      as: 'bills',
      foreignKey: 'idClient'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: 'Client',
      timestamps: false
    }
  }
}

module.exports = { CLIENT_TABLE, ClientSchema, Client }
