'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatAdmin = sequelize.define('ChatAdmin', {
    chat_client_id: DataTypes.INTEGER,
    admin_id: DataTypes.INTEGER
  }, {});
  ChatAdmin.associate = function(models) {
    ChatClient.belongsTo(models.User, {
      foreignKey: 'admin_id',
      as: 'admins',
      onDelete: 'cascade',
    });
    ChatClient.belongsTo(models.ChatClient, {
      foreignKey: 'chat_client_id',
      as: 'chat_clients',
      onDelete: 'cascade',
    });
  };
  return ChatAdmin;
};