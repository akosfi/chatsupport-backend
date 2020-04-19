import { Client } from "../db/models/client";
import { Guest } from "../db/models/guest";
import { Message } from "../db/models/message";
import { Sequelize } from "sequelize";
import { User } from "../db/models/user";

class ClientService {
    findOne(options: any) {
        return Client.findOne({...options});
    }
    findOneWithGuests(options) {
        return this.findOne({...options, include: [{ model: Guest, as: 'guests' }]});
    }
    findOneWithMessages(options) {
        return this.findOne({...options, include: [{ model: Message, as: 'messages' }]});
    }
    findOneWithAdmins(options) {
        return this.findOne({
            ...options,
            include: [{ model: User, as: 'admins', attributes: ['id', 'username', 'email', 'chat_token', 'client_administrated_id']  }]
        });
    }
    create(options: any) {
        return Client.create({...options});
    }
    getUnseenMessages(client_id) {
        return Guest.findAll({
            where: {
                chat_client_id: client_id
            },
            attributes: { 
                include: [[Sequelize.fn("COUNT", Sequelize.col("messages.id")), "messageCount"]],
                exclude: ['guest_cookie','chat_client_id','createdAt', 'updatedAt'],
            },
            include: [{
                model: Message,
                as: 'messages',
                attributes: [],
                where: {
                    seen: false
                }
            }],
            group: ['Guest.id']
        })
    }
}

export default new ClientService();