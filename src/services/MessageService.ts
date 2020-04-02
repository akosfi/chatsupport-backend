import { Guest } from "../db/models/guestuser";
import { Message } from "../db/models/message";

class MessageService {
    addMessage(options: any) {
        return Message.create(...options);
    }
    getMessagesForGuest(guest_id) {
        return Message.findOne({where: {guest_id}});
    }
}

export default new MessageService();