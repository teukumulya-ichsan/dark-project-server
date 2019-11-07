'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    'Menu',
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
      description: DataTypes.STRING(256),
      price: {
        type: DataTypes.INTEGER(15),
        allowNull: false
      }
    },
    { tableName: 'menu' }
  );
  Menu.associate = function(models) {
    // associations can be defined here
  };
  return Menu;
};
