'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: await bcrypt.hash('123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'vinylstore',
        email: 'vinylstore@seller.com',
        password: await bcrypt.hash('123', 10),
        role: 'seller',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'soundstore',
        email: 'soundstore@seller.com',
        password: await bcrypt.hash('123', 10),
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
