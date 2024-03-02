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
        quality: 'Mint',
        price: 5290,
        category_id: 5,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Random Access Memories',
        artist: 'Daft Punk',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/cc2/cc2ee78f5f79b5245c09dfbe194f196b.jpeg',
        quality: 'Mint',
        price: 5290,
        category_id: 5,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Whenever You Need Somebody',
        artist: 'Rick Astley',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/a8b/a8b3a3a1cf577fec9df79d02d6e281d1.jpeg',
        quality: 'Mint',
        price: 3790,
        category_id: 4,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Whenever You Need Somebody',
        artist: 'Rick Astley',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/a8b/a8b3a3a1cf577fec9df79d02d6e281d1.jpeg',
        quality: 'Mint',
        price: 3890,
        category_id: 4,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
