'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sellers', [
      {
        phone: '8-999-222-33-44',
        adress: 'г.Санкт-Петербург, ул. Пушкина, д. Колотушкина',
        itn: 'ххх-ххх-ххх-ххх',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sellers', null, {});
  },
};
