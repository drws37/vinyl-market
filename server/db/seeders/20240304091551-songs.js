'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Songs',
      [
        {
          title: 'q',
          duration: '133',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'w',
          duration: '2112',
          record_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'e',
          duration: '124',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'r',
          duration: '124',
          record_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 't',
          duration: '24',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'y',
          duration: '124',
          record_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'q',
          duration: '241',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'u',
          duration: '321',
          record_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'i',
          duration: '124',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'o',
          duration: '214',
          record_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'p',
          duration: '132',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'a',
          duration: '214',
          record_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 's',
          duration: '214',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'd',
          duration: '214',
          record_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'f',
          duration: '124',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'g',
          duration: '321',
          record_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'h',
          duration: '1322',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'j',
          duration: '421',
          record_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'k',
          duration: '213',
          record_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'l',
          duration: '12',
          record_id: 2,
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
