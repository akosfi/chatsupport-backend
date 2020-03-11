import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {ChatClient} from './';

export class GuestUser extends Model<GuestUser> {
  public id!: Number;
  public cookie!: string;
  public chat_client_id!: Number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  public static async createByChatClient (license: string) {
    const chatClient = await ChatClient.findOne({where: {license: license}});

    if(!chatClient) return null;

    const guestUser = await GuestUser.create({
      cookie: Math.floor(Math.random()*100000000),
      chat_client_id: chatClient.id
    });

    guestUser.save();
    return guestUser;
  }
}

GuestUser.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  cookie: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  chat_client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{sequelize});


GuestUser.sync({force: false}).then();