'use strict';
const {hashPass} = require("../helpers/bcrypt")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: "authorId"})
      User.hasMany(models.Wishlist, {foreignKey: "UserId"})
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
        validate: {
          isEmail: {
            msg: "Must be email format"
          },
          notEmpty: {
            msg: "Email is required"
          },
          notNull: {
            msg: "Email is required"
          }
        }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
            notEmpty: {
              msg: "Password is required"
            },
            notNull: {
              msg: "Password is required"
            },
            len: {
              args: [5],
              msg: "Password must be minimal 5 characters"
            }
        }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (user) => {
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};