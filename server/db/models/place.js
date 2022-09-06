const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasMany(models.PlaceLike, { foreignKey: 'place_id' });
      this.belongsTo(models.Region, { foreignKey: 'region_id' });
      this.hasMany(models.PlaceComment, { foreignKey: 'place_id' });
      // this.hasOne(models.Map, { foreignKey: 'post_id' });
    }
  }
  Place.init({
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    img: DataTypes.TEXT,
    url: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    region_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Place',
  });
  return Place;
};
