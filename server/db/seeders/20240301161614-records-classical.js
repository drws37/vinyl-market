'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Records', [
      {
        title: 'The Masterpieces Of Johannes Brahms',
        artist: 'Johannes Brahms',
        description: 'Some description',
        img: 'https://cdn.naxos.com/sharedfiles/images/cds/hires/C49032.jpg',
        price: 3990,
        category_id: 3,
        user_id: 3,
        spotifyId: '6hOvzH8U7w2ZkYRqEuiiXY',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'A Symphonic Celebration',
        artist: 'Joe Hisaishi',
        description: 'Some description',
        img: 'https://stoprobotvinyl.ru/upload/iblock/2bb/2bb5659eb8e11c5f524d35c8b3777f7a.png',
        price: 4999,
        category_id: 3,
        user_id: 2,
        spotifyId: '561qUZZO6f2sILHUMlXmlM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null, {});
  },
};
