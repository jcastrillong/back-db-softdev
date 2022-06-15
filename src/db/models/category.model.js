const { DataTypes, Model } = require('sequelize')

const CATEGORY_TABLE = 'categories'

const CategorySchema = {
  idCategory: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_category'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

class Category extends Model {
  static associate (models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'idCategory'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category }
