const { DataTypes, Model } = require('sequelize')

const { CATEGORY_TABLE } = require('./category.model')

const PRODUCT_TABLE = 'products'

const ProductSchema = {
  idProduct: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id_product'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  quantity_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idCategory: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refereces: {
      model: CATEGORY_TABLE,
      key: 'id_category'
    },
    field: 'id_category'
  }
}

class Product extends Model {
  static associate (models) {
    // Product 1 a n with Category
    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'idCategory'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
