'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    message: DataTypes.STRING,
    guest_user_id: DataTypes.INTEGER,
    sent_by_admin: DataTypes.BOOLEAN
  }, {});
  ChatMessage.associate = function(models) {
    ChatMessage.belongsTo(models.GuestUser, {
      foreignKey: 'guest_user_id',
      as: 'guest_user',
      onDelete: 'cascade',
    });
  };
  return ChatMessage;
};