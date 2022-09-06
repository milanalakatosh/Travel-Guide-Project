const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ExcursionLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Excursion, { foreignKey: 'excursion_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  ExcursionLike.init({
    user_id: DataTypes.INTEGER,
    excursion_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ExcursionLike',
  });
  return ExcursionLike;
};
