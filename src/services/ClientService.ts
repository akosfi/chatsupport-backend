import { Client } from "../db/models/client";
import { Guest } from "../db/models/guest";
import { Message } from "../db/models/message";
import { Sequelize } from "sequelize";

class ClientService {
    findOne(options: any) {
        return Client.findOne({...options});
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