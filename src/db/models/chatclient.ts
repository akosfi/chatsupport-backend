import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {User, GuestUser, ChatAdmin} from './';

export class ChatClient extends Model {
  public id!: Number;
  public license!: Number;
  public owner_id!: Number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


ChatClient.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  license: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{sequelize});

ChatClient.sync({force: false}).then();