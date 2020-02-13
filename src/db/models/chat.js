'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    chat_client_id: DataTypes.INTEGER
  }, {});
  Chat.associate = function(models) {
    Chat.belongsTo(models.ChatClient, {
      foreignKey: 'chat_client_id',
      as: 'chat_client',
      onDelete: 'cascade',
    });
    Chat.hasMany(models.ChatMessage, {
      foreignKey: 'chat_id',
      as: 'messages',
      onDelete: 'CASCADE',
    });
  };
  return Chat;
};