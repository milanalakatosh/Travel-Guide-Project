const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Excursion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Region, { foreignKey: 'region_id' });
      this.hasMany(models.ExcursionLike, { foreignKey: 'excursion_id' });
      this.hasMany(models.ExcurComment, { foreignKey: 'excursion_id' });
      this.hasMany(models.Order, { foreignKey: 'excursion_id' });
    }
  }
  Excursion.init({
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    img: DataTypes.TEXT,
    count: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    region_id: DataTypes.INTEGER,
    location: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Excursion',
  });
  return Excursion;
};
