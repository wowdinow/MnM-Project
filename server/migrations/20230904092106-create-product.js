'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: "Price is required"
            },
            notNull: {
              msg: "Price is required"
            }
          }
      },
      stock: {
        type: Sequelize.INTEGER
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: "Categories"
          },
          key: "id"
        }
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users"
          },
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};