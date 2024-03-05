'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RecordPrices', [
      {
        price: 2190,
        record_id: 1,
        createdAt: '2023-11-13 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2570,
        record_id: 1,
        createdAt: '2023-12-12 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2990,
        record_id: 1,
        createdAt: '2024-01-01 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 3890,
        record_id: 1,
        createdAt: '2024-02-10 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 4500,
        record_id: 1,
        createdAt: '2024-03-04 15:13:42.172+03',
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecordPrices', null, {});
  },
};
