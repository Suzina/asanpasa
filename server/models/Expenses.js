module.exports = (sequelize, DataTypes) => {
  const Expenses = sequelize.define(
    "Expenses",
    {
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      raw_material_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      tableName: "expenses",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );

  Expenses.associate = (models) => {
    Expenses.belongsTo(models.Vendors, {
      foreignKey: "vendor_id",
      as: "vendor",
    });
    Expenses.belongsTo(models.RawMaterials, {
      foreignKey: "raw_material_id",
      as: "rawMaterial",
    });
  };

  return Expenses;
};