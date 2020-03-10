import {Model, DataTypes, Association } from 'sequelize';
import {sequelize} from '../config/database';

import { ChatClient } from './';

export class User extends Model {
  public id!: Number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly chatClients?: ChatClient[]; 

  public static associations: {
    chatClients: Association<User, ChatClient>;
  };
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
