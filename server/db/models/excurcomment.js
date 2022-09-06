const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ExcurComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Excursion, { foreignKey: 'excursion_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  ExcurComment.init({
    excursion_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    text: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'ExcurComment',
  });
  return ExcurComment;
};
