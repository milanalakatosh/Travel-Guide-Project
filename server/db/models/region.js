const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Place, { foreignKey: 'region_id' });
      this.hasMany(models.Excursion, { foreignKey: 'region_id' });
    }
  }
  Region.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};
