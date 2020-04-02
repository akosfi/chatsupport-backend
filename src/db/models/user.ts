import bcrypt from 'bcrypt';

import {Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database';
import {Client} from './client';

export class User extends Model {
  public id!: Number;
  public username!: string;
  public email!: string;
  public password!: string;
  public chat_token!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  chat_token: { type: DataTypes.STRING },
},{
  sequelize
});

User.addHook('beforeCreate', (user: User) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

User.hasMany(Client, { foreignKey: 'owner_id', as: 'clients' });
Client.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });