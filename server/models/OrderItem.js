module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  });

    OrderItem.associate = (models) => 
    {
        OrderItem.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "user",
        });

        OrderItem.belongsTo(models.Orders, {
        foreignKey: "order_id",
        as: "order",
        });

        OrderItem.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
        });
  };

  return OrderItem;
};