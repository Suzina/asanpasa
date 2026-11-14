module.exports = (sequelize, DataTypes) => {
  const RawMaterials = sequelize.define(
    "RawMaterials",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "raw_materials",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );

  RawMaterials.associate = (models) => {
    RawMaterials.hasMany(models.Expenses, {
      foreignKey: "raw_material_id",
      as: "expenses",
    });
  };

  return RawMaterials;
};