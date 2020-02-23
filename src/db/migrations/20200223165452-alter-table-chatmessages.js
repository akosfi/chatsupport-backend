'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'ChatMessages',
        'guest_user_id',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.removeColumn(
        'ChatMessages',
        'chat_id',
        {
          type: Sequelize.INTEGER
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'ChatMessages',
        'chat_id',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.removeColumn(
        'ChatMessages',
        'guest_user_id'
      ),
    ]);
  }
};
