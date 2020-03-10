import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {User, GuestUser} from './';

export class ChatMessage extends Model {
  public id!: Number;
  public message!: string;
  public guest_user_id!: Number;
  public sent_by_admin!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ChatMessage.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: new DataTypes.STRING(256),
    allowNull: false
  },
  guest_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sent_by_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
},{sequelize});

ChatMessage.sync({force: false}).then();