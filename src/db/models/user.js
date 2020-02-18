'use strict';
import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
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