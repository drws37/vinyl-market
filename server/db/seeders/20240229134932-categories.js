'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        title: 'Рок',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Джаз',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Классика',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Блюз',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Поп',
        createdAt: new Date(),
        updatedAt: new Date(),
      },      
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
