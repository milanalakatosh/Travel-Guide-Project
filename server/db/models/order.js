const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Excursion, { foreignKey: 'excursion_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      // define association here
    }
  }
  Order.init({
    excursion_name: DataTypes.STRING,
    excursion_id: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    order_nr: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
