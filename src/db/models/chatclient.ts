import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {ChatAdmin} from './chatadmin';
import {GuestUser} from './guestuser';

export class ChatClient extends Model {
  public id!: Number;
  public license!: Number;
  public owner_id!: Number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


ChatClient.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, },
  license: { type: DataTypes.INTEGER },
  owner_id: { type: DataTypes.INTEGER },
},{
  sequelize
});

ChatClient.hasMany(ChatAdmin, { foreignKey: 'chat_client_id', as: 'admins' });
ChatAdmin.belongsTo(ChatClient, { foreignKey: 'chat_client_id', as: 'clients' });

ChatClient.hasMany(GuestUser, { foreignKey: 'chat_client_id', as: 'guests' });
GuestUser.belongsTo(ChatClient, { foreignKey: 'chat_client_id', as: 'client' });