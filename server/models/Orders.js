module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    fullname: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_amt: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    advance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    amt_due: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    status: {
       type: DataTypes.ENUM('Delivered', 'Pending', 'Cancelled'), // adjust values to your actual statuses
      allowNull: false,
      defaultValue: 'Pending'
    },
    shipping_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
  },
  
  {
    timestamps: true,      // enables createdAt/updatedAt auto-management
    underscored: true,     // maps them to created_at / updated_at in the DB
    paranoid: true,        // enables soft-delete using deleted_at automatically!
  });

  Orders.associate = (models) => {
    // One order belongs to one user
    Orders.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "user",
    });

    // One order has many products, through OrderItems
    Orders.belongsToMany(models.Products, {
      through: models.OrderItem,
      foreignKey: "order_id",
      otherKey: "product_id",
      as: "products",
    });

    // Direct access to the join rows themselves (useful for quantity/price per line)
    Orders.hasMany(models.OrderItem, {
      foreignKey: "order_id",
      as: "orderItems",
    });
  };
  return Orders;
};