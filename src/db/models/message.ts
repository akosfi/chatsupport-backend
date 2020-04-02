import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';

export class Message extends Model {
  public id!: Number;
  public message!: string;
  public guest_user_id!: Number;
  public from_admin!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  message: { type: DataTypes.STRING },
  guest_user_id: { type: DataTypes.INTEGER },
  from_admin: { type: DataTypes.BOOLEAN },
},{
  sequelize
});