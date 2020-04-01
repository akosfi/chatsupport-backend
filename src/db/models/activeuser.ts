import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';

export class ActiveUser extends Model {
  public id!: Number;
  public socket_id!: string;
  public user_id!: Number;
  public is_guest!: Boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ActiveUser.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  socket_id: { type: DataTypes.STRING },
  user_id: { type: DataTypes.INTEGER },
  is_guest: { type: DataTypes.BOOLEAN },
},{
  sequelize
});