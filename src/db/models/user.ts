import {Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database';

import { ChatClient, ChatAdmin, ActiveUser } from './';

export class User extends Model {
  public id!: Number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
},{sequelize});

User.sync({force: false}).then();
