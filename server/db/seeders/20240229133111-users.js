'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: '123',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'seller',
        email: 'seller@seller.com',
        password: '123',
        role: 'seller',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
