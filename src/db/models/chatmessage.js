'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    message: DataTypes.STRING,
    chat_id: DataTypes.INTEGER,
    sent_by_admin: DataTypes.BOOLEAN
  }, {});
  ChatMessage.associate = function(models) {
    ChatMessage.belongsTo(models.Chat, {
      foreignKey: 'chat_id',
      as: 'chat',
      onDelete: 'cascade',
    });
  };
  return ChatMessage;
};