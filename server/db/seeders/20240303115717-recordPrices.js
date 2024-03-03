'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RecordPrices', [
      {
        price: 2190,
        record_id: 1,
        createdAt: '2023-02-03 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2570,
        record_id: 1,
        createdAt: '2023-03-03 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2990,
        record_id: 1,
        createdAt: '2023-04-03 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 3890,
        record_id: 1,
        createdAt: '2023-05-03 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 4500,
        record_id: 1,
        createdAt: '2023-06-03 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 4990,
        record_id: 1,
        createdAt: '2023-07-03 15:13:42.172+03',
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecordPrices', null, {});
  },
};
