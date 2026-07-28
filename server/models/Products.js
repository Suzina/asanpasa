module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    name: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
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

  Products.associate = (models) => {
    Products.belongsTo(models.Categories, {
      foreignKey: "category_id",
      as: "category",
    });
    Products.belongsToMany(models.Orders, {
      through: models.OrderItem,
      foreignKey: "product_id",
      otherKey: "order_id",
      as: "orders",
    });

    Products.hasMany(models.OrderItem, {
      foreignKey: "product_id",
      as: "orderItems",
    });
  };

  return Products;
};