import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {Message} from './message';

export class Guest extends Model {
  public id!: Number;
  public guest_cookie!: string;
  public chat_client_id!: Number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Guest.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  guest_cookie: { type: DataTypes.STRING },
  chat_client_id: { type: DataTypes.INTEGER },
},{
  sequelize
});

Guest.hasMany(Message, { foreignKey: 'guest_user_id', as: 'messages'});
Message.belongsTo(Guest, { foreignKey: 'guest_user_id', as: 'guest' });