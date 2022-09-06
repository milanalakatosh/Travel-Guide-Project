module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Maps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coordinates: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      post_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Places',
        //   key: 'id',
        // },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Maps');
  },
};
