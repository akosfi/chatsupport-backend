'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    socket_id: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.dataValues.password, salt);
      }
    }
  });
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