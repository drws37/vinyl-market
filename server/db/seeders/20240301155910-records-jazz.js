'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Records', [
      {
        title: 'Happy Synapse Part One',
        artist: 'Alexander Mashin',
        description: 'Some description',
        img: 'https://long-play.ru/upload/iblock/e08/wpdvikijhaf6n2xkps3ydeerkrh4l3jr.jpeg',
        quality: 'Mint',
        price: 1999,
        category_id: 2,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Now The Time',
        artist: 'The Charlie Parker Quartet',
        description: 'Some description',
        img: 'https://long-play.ru/upload/iblock/82a/ofea2iyss23o1uutixccsec7lndbpwum.jpeg',
        quality: 'Mint',
        price: 4999,
        category_id: 2,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Night Jam Session In Warsaw 1973',
        artist: 'Kurwa Bobr',
        description: 'Some description',
        img: 'https://long-play.ru/upload/iblock/abf/khcq87p8vwc5ywwrnvfrkjjr3vj7k8cc.jpeg',
        quality: 'Mint',
        price: 2999,
        category_id: 2,
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
