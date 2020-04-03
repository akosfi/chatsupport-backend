import { Guest } from "../db/models/guest";
import { Message } from "../db/models/message";

class MessageService {
    addMessage(options: any) {
        return Message.create({...options});
    }
    getMessagesForGuest(guest_user_id) {
        return Message.findAll({where: {guest_user_id}});
    }
}

export default new MessageService();