module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    name: {
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

  return Categories;
};