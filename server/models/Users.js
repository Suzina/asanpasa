module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
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

  return Users;
};