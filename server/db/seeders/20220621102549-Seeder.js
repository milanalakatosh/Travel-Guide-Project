const fs = require('fs');

let arrOfRegions = [];

const data = fs.readFileSync('./regions.txt', 'utf-8');
arrOfRegions = data.split('\n');

const result = arrOfRegions.map((region) => new Object(
  { title: region, createdAt: new Date(), updatedAt: new Date() },
));

module.exports = {
  async up(queryInterface, Sequelize) {
  /**
    * Add seed commands here.
    *
    * Example:
    * await queryInterface.bulkInsert('People', [{
    *   name: 'John Doe',
    *   isBetaMember: false
    * },
    *
    * ], {});
   */
    await queryInterface.bulkInsert(
      'Regions',
      result,
    );
  },

  async down(queryInterface, Sequelize) {
    /**
    *
    *
    * Example:
    * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Regions', null, {});
  },
};
