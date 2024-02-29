'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      record_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Records',
          key: 'id'
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      count: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('OrderItems');
  }
};