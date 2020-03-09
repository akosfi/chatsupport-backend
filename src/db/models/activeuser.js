'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActiveUser = sequelize.define('ActiveUser', {
    user_id: DataTypes.INTEGER,
    socket_id: DataTypes.STRING,
    is_guest: DataTypes.BOOLEAN
  }, {});
  ActiveUser.associate = function(models) {
    ActiveUser.belongsTo(models.User);
    ActiveUser.belongsTo(models.GuestUser);
  };
  return ActiveUser;
};