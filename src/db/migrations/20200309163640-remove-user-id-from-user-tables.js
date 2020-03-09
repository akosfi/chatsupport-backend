'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'socket_id',
      ),
      queryInterface.removeColumn(
        'GuestUsers',
        'socket_id',
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'socket_id',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'GuestUsers',
        'socket_id',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  }
};
