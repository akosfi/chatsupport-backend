import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {ChatClient, ChatMessage, ActiveUser} from './';

export class GuestUser extends Model {
  public id!: Number;
  public cookie!: string;
  public chat_client_id!: Number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GuestUser.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  cookie: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  chat_client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{sequelize});


GuestUser.sync({force: false}).then();