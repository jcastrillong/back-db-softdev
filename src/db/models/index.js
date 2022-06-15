const { Employee, EmployeeSchema } = require('./employee.model')
const { Category, CategorySchema } = require('./category.model')
const { Client, ClientSchema } = require('./client.model')
const { Product, ProductSchema } = require('./product.model')
const { Bill, BillSchema } = require('./bill.model')
const { ProductSale, ProductSaleSchema } = require('./product-sale.model')

function setupModels (sequelize) {
  // Model definition
  Employee.init(EmployeeSchema, Employee.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Client.init(ClientSchema, Client.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Bill.init(BillSchema, Bill.config(sequelize))
  ProductSale.init(ProductSaleSchema, ProductSale.config(sequelize))

  // Associations
  const { models } = sequelize

  Employee.associate(models)
  Category.associate(models)
  Client.associate(models)
  Product.associate(models)
  Bill.associate(models)
  ProductSale.associate(models)
}

module.exports = setupModels
