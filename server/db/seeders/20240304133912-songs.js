'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Songs',
      [
        {
          songTitle: 'Boom Boom',
          duration: '2:31',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Crawlin King Snake',
          duration: '2:39',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Shake It Baby',
          duration: '4:13',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'No Shoes',
          duration: '2:33',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Little Wheel',
          duration: '2:33',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Solid Sender',
          duration: '2:28',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Boogie Chillun',
          duration: '2:29',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Dimples',
          duration: '2:09',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Hobo Blues',
          duration: '2:41',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'I Love You Honey',
          duration: '2:41',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Im So Excited',
          duration: '2:46',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Leave My Wife Alone',
          duration: '2:43',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Every Night',
          duration: '2:52',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Im Prison Bound',
          duration: '3:56',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Sugar Mama',
          duration: '3:10',
          record_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Boom Boom',
          duration: '2:31',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Crawlin King Snake',
          duration: '2:39',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Shake It Baby',
          duration: '4:13',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'No Shoes',
          duration: '2:33',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Little Wheel',
          duration: '2:33',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Solid Sender',
          duration: '2:28',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Boogie Chillun',
          duration: '2:29',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Dimples',
          duration: '2:09',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Hobo Blues',
          duration: '2:41',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'I Love You Honey',
          duration: '2:41',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Im So Excited',
          duration: '2:46',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Leave My Wife Alone',
          duration: '2:43',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Every Night',
          duration: '2:52',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Im Prison Bound',
          duration: '3:56',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songTitle: 'Sugar Mama',
          duration: '3:10',
          record_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});

  }
};
