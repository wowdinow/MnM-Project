'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {foreignKey: "authorId"})
      Product.belongsTo(models.Category, {foreignKey: "categoryId"})
      Product.hasMany(models.Wishlist, {foreignKey: "ProductId"})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
            notEmpty: {
              msg: "Name is required"
            },
            notNull: {
              msg: "Name is required"
            }
          }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
            notEmpty: {
              msg: "Description is required"
            },
            notNull: {
              msg: "Description is required"
            }
          }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
            notEmpty: {
              msg: "Price is required"
            },
            notNull: {
              msg: "Price is required"
            },
            min: 10000
          }
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM("Active", "Inactive", "Archived")
    }
  }, {
    hooks: {
      beforeCreate: (product) => {
        product.status = "Active"
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};