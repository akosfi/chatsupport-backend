import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {User} from './user';
import {Guest} from './guestuser';

export class Client extends Model {
  public id!: Number;
  public license!: Number;
  public owner_id!: Number;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


Client.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, },
  license: { type: DataTypes.INTEGER },
  owner_id: { type: DataTypes.INTEGER }
},{
  sequelize
});

Client.hasMany(Guest, { foreignKey: 'chat_client_id', as: 'guests' });
Guest.belongsTo(Client, { foreignKey: 'chat_client_id', as: 'client' });