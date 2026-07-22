module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    name: {
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

  

  return Products;
};