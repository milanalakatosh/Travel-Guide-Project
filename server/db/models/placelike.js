const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlaceLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Place, { foreignKey: 'place_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  PlaceLike.init({
    user_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlaceLike',
  });
  return PlaceLike;
};
