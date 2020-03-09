'use strict';
const uuidv4 = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const GuestUser = sequelize.define('GuestUser', {
    cookie: DataTypes.STRING,
    chat_client_id: DataTypes.INTEGER
  }, {
    classMethods: {
      findOneByCookie: function (cookie) {
        return GuestUser.findOne({ where: { cookie } });
      },
      findOneBySocket: function (socket_id) {
        return GuestUser.findOne({ where: { socket_id } });
      },
      create: async function(chat_client_id) {
        const new_guest = GuestUser.build({
          cookie: uuidv4(),
          chat_client_id: chat_client_id,
        });
        return new_guest;
      }
    }
  });
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
    GuestUser.hasOne(models.ActiveUser, {
      as: 'active',
      foreignKey: 'user_id',
    });
  };
  return GuestUser;
};