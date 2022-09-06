const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Map extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Place, { foreignKey: 'post_id' });
    }
  }
  Map.init({
    coordinates: DataTypes.STRING,
    text: DataTypes.STRING,
    content: DataTypes.STRING,
    link: DataTypes.STRING,
    post_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Map',
  });
  return Map;
};
