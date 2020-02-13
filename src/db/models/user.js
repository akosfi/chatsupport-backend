'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.ChatClient, {
      foreignKey: 'owner_id',
      as: 'chatClientsOwned',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.ChatAdmin, {
      foreignKey: 'admin_id',
      as: 'chatClientsAdministrated',
      onDelete: 'CASCADE',
    });
  };
  return User;
};