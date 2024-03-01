'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Records', [
      {
        title: 'The Masterpieces Of Johannes Brahms',
        artist: 'Johannes Brahms',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/672/672f6bd82f2157fbb7b5d849f5462b17.jpeg',
        quality: 'Mint',
        price: 1999,
        category_id: 3,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'A Symphonic Celebration',
        artist: 'Joe Hisaishi',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/2bb/2bb5659eb8e11c5f524d35c8b3777f7a.png',
        quality: 'Mint',
        price: 4999,
        category_id: 3,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null, {});
  },
};
