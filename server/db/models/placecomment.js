const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlaceComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Place, { foreignKey: 'place_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  PlaceComment.init({
    text: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlaceComment',
  });
  return PlaceComment;
};
