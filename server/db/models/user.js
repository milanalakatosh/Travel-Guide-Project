const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Place, { foreignKey: 'user_id' });
      this.hasMany(models.Excursion, { foreignKey: 'user_id' });
      this.hasMany(models.PlaceLike, { foreignKey: 'user_id' });
      this.hasMany(models.ExcursionLike, { foreignKey: 'user_id' });
      this.hasMany(models.PlaceComment, { foreignKey: 'user_id' });
      this.hasMany(models.ExcurComment, { foreignKey: 'user_id' });
			this.hasMany(models.Order, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
