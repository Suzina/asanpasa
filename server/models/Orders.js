module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
    Orders.belongsTo(models.Products, {
      foreignKey: "product_id",
      as: "product",
    });
  };


  return Orders;
};