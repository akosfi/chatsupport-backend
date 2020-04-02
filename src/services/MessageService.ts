import { GuestUser } from "../db/models/guestuser";
import { ChatMessage } from "../db/models/chatmessage";

class MessageService {
    addMessage(options: any) {
        return ChatMessage.create(...options);
    }
    getMessagesForGuest(guest_id) {
        return ChatMessage.findOne({where: {guest_id}});
    }
}

export default new MessageService();