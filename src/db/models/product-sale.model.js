const { DataTypes, Model } = require('sequelize')

const { BILL_TABLE } = require('./bill.model')
const { PRODUCT_TABLE } = require('./product.model')

const PRODUCT_SALE_TABLE = 'product_sale'

const ProductSaleSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'total_value'
  },
  idBill: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BILL_TABLE,
      key: 'id_bill'
    },
    field: 'id_bill'
  },
  idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCT_TABLE,
      key: 'id_product'
    },
    field: 'id_product'
  }
}

class ProductSale extends Model {
  static associate (models) {
    // Product-Sale 1 a 1 with Product
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'idProduct'
    })

    // Product-Sale 1 a n with Bill
    // this.belongsTo(models.Bill, {
    //   as: 'bill',
    //   foreignKey: 'idBill'
    // })
    // this.hasMany(models.Bill, {
    //   as: 'bills',
    //   foreignKey: 'idBill'
    // })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_SALE_TABLE,
      modelName: 'ProductSale',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_SALE_TABLE, ProductSaleSchema, ProductSale }
