'use strict';
import { genSaltSync, hashSync } from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = genSaltSync();
        user.password = hashSync(user.dataValues.password, salt);
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