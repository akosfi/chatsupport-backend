'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatClient = sequelize.define('ChatClient', {
    license: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
  }, {});
  ChatClient.associate = function(models) {
    ChatClient.belongsTo(models.User, {
      foreignKey: 'owner_id',
      as: 'owner',
      onDelete: 'cascade',
    });
    ChatClient.hasMany(models.ChatAdmin, {
      foreignKey: 'chat_client_id',
      as: 'chatAdmins',
      onDelete: 'CASCADE',
    });
    ChatClient.hasMany(models.GuestUser, {
      foreignKey: 'chat_client_id',
      as: 'guestUsers',
      onDelete: 'CASCADE',
    });
  };
  return ChatClient;
};