'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deliveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      middle_name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      adress: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      phone: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      data: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Deliveries');
  },
};
