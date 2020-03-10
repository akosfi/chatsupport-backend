import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {User, GuestUser} from './';

export class ActiveUser extends Model {
  public id!: Number;
  public socket_id!: Number;
  public user_id!: Number;
  public is_guest!: Boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ActiveUser.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  socket_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_guest: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
},{sequelize});


ActiveUser.sync({force: false}).then();