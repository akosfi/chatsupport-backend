import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';

export class ChatAdmin extends Model {
  public id!: Number;
  public chat_client_id!: Number;
  public admin_id!: Number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ChatAdmin.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, },
  chat_client_id: { type: DataTypes.INTEGER },
  admin_id: { type: DataTypes.INTEGER },
},{
  sequelize
});