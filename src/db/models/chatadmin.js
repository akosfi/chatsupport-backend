'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatAdmin = sequelize.define('ChatAdmin', {
    chat_client_id: DataTypes.INTEGER,
    admin_id: DataTypes.INTEGER
  }, {});
  ChatAdmin.associate = function(models) {
    ChatAdmin.belongsTo(models.User, {
      foreignKey: 'admin_id',
      as: 'admins',
      onDelete: 'cascade',
    });
    ChatAdmin.belongsTo(models.ChatClient, {
      foreignKey: 'chat_client_id',
      as: 'chat_clients',
      onDelete: 'cascade',
    });
  };
  return ChatAdmin;
};