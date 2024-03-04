'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Records', [
      {
        title: 'Random Access Memories',
        artist: 'Daft Punk',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/cc2/cc2ee78f5f79b5245c09dfbe194f196b.jpeg',
        price: 5290,
        category_id: 5,
        user_id: 3,
        spotifyId: '4m2880jivSbbyEGAKfITCa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Whenever You Need Somebody',
        artist: 'Rick Astley',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/a8b/a8b3a3a1cf577fec9df79d02d6e281d1.jpeg',
        price: 3790,
        category_id: 4,
        user_id: 2,
        spotifyId: '6eUW0wxWtzkFdaEFsTJto6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
