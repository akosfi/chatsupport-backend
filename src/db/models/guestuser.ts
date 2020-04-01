import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {ChatMessage} from './chatmessage';

export class GuestUser extends Model {
  public id!: Number;
  public cookie!: string;
  public chat_client_id!: Number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GuestUser.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  cookie: { type: DataTypes.STRING },
  chat_client_id: { type: DataTypes.INTEGER },
},{
  sequelize
});

GuestUser.hasMany(ChatMessage, { foreignKey: 'guest_user_id', as: 'messages'});
ChatMessage.belongsTo(GuestUser, { foreignKey: 'guest_user_id', as: 'guest' });