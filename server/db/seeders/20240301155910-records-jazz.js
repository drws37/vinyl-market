'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Records', [
      {
        title: 'La Vie En Rose',
        artist: 'Louis Armstrong',
        description: 'Some description',
        img: 'https://m.media-amazon.com/images/I/51+sbe0dksL._UX358_FMwebp_QL85_.jpg',
        price: 6799,
        category_id: 2,
        user_id: 3,
        spotifyId: '4rii2OLIasjb8JnzA0Ylel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Now The Time',
        artist: 'The Charlie Parker Quartet',
        description: 'Some description',
        img: 'https://long-play.ru/upload/iblock/82a/ofea2iyss23o1uutixccsec7lndbpwum.jpeg',
        price: 4200,
        category_id: 2,
        user_id: 2,
        spotifyId: '7KLwxAG5safFwMgxd0XlH3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Ray Charles',
        artist: 'The Charlie Parker Quartet',
        description: 'Some description',
        img: 'https://m.media-amazon.com/images/I/31tKNp2QdDL._SX425_.jpg',
        price: 5800,
        category_id: 2,
        user_id: 2,
        spotifyId: '0cw6Sv7IwZ87aLPPvNPSd0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null, {});
  },
};
