'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Records', [
      {
        title: 'The Very Best Of John Lee Hooker',
        artist: 'John Lee Hooker',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/463/463faf39937025a221dcafecfa2d0864.jpeg',
        quality: 'Mint',
        price: 3099,
        category_id: 4,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'The Very Best Of John Lee Hooker',
        artist: 'John Lee Hooker',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/463/463faf39937025a221dcafecfa2d0864.jpeg',
        quality: 'Mint',
        price: 2990,
        category_id: 4,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Bawlers',
        artist: 'Tom Waits',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/8d2/8d2aaffea1e666b4a8713353a5b8f68d.jpeg',
        quality: 'Mint',
        price: 5990,
        category_id: 4,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Bawlers',
        artist: 'Tom Waits',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/8d2/8d2aaffea1e666b4a8713353a5b8f68d.jpeg',
        quality: 'Mint',
        price: 4990,
        category_id: 4,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null, {});
  },
};
