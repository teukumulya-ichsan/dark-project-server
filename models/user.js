'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false
      }
    },
    {
      tableName: 'Users',
      timestamps: false
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
