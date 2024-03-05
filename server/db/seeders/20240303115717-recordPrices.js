'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RecordPrices', [
      {
        price: 3800,
        record_id: 1,
        createdAt: '2024-01-13 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 4990,
        record_id: 1,
        createdAt: '2024-02-12 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 5000,
        record_id: 2,
        createdAt: '2024-01-13 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 4390,
        record_id: 2,
        createdAt: '2024-02-12 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2590,
        record_id: 3,
        createdAt: '2024-01-13 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2690,
        record_id: 3,
        createdAt: '2024-01-12 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2590,
        record_id: 4,
        createdAt: '2024-02-13 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2590,
        record_id: 4,
        createdAt: '2024-01-13 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 3299,
        record_id: 5,
        createdAt: '2024-02-12 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2999,
        record_id: 5,
        createdAt: '2024-02-12 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 3299,
        record_id: 6,
        createdAt: '2024-02-12 15:13:42.172+03',
        updatedAt: new Date(),
      },
      {
        price: 2899,
        record_id: 6,
        createdAt: '2024-02-12 15:13:42.172+03',
        updatedAt: new Date(),
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecordPrices', null, {});
  },
};
