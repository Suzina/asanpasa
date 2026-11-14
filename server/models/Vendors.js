module.exports = (sequelize, DataTypes) => {
  const Vendors = sequelize.define(
    "Vendors",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "vendors",
      timestamps: true,
      underscored: true,
      paranoid: true, // adds deleted_at automatically
    }
  );

  Vendors.associate = (models) => {
    Vendors.hasMany(models.Expenses, {
      foreignKey: "vendor_id",
      as: "expenses",
    });
  };

  return Vendors;
};