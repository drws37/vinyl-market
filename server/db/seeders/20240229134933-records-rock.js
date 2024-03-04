'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Records', [
      {
        title: 'Rock Steady',
        artist: 'No Doubt',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/944/9449ddce90d363a88f0e44f55076b3a8.jpeg',
        price: 4990,
        category_id: 1,
        user_id: 2,
        spotifyId: '0KFPnm4Ow2L9BuivmWT3pu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Tragic Kingdom',
        artist: 'No Doubt',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/9ec/9ec711664b3aac21f32ae542be9e7e8b.jpeg',
        price: 2999,
        category_id: 1,
        user_id: 2,
        spotifyId: '3VekjWskUut57hx6W9wqL8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'By The Way',
        artist: 'Red Hot Chili Peppers',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/b83/b83e99b0273a4fd6d976446e23b7d14e.jpeg',
        price: 2999,
        category_id: 1,
        user_id: 2,
        spotifyId: '6deiaArbeoqp1xPEGdEKp1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Californication',
        artist: 'Red Hot Chili Peppers',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/873/873db515be4e69bf5c1da9118d9318cc.jpeg',
        price: 2999,
        category_id: 1,
        user_id: 2,
        spotifyId: '2Y9IRtehByVkegoD7TcLfi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'The Getaway',
        artist: 'Red Hot Chili Peppers',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/27b/27b536663bb61d3120f5c2bb9651c2f7.jpeg',
        price: 6490,
        category_id: 1,
        user_id: 2,
        spotifyId: '43otFXrY0bgaq5fB3GrZj6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null, {});
  },
};
