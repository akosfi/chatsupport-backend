'use strict';
module.exports = (sequelize, DataTypes) => {
  const GuestUser = sequelize.define('GuestUser', {
    cookie: DataTypes.STRING,
    socket_id: DataTypes.STRING,
    chat_client_id: DataTypes.INTEGER
  }, {});
  GuestUser.associate = function(models) {
    GuestUser.belongsTo(models.ChatClient, {
      foreignKey: 'chat_client_id',
      as: 'chat',
      onDelete: 'cascade',
    });
    GuestUser.hasMany(models.ChatMessage, {
      foreignKey: 'guest_user_id',
      as: 'messages',
      onDelete: 'CASCADE',
    });
  };
  return GuestUser;
};