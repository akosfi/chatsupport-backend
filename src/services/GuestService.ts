import { Guest } from "../db/models/guest";
import uuid from "uuid";

class GuestService {
    addGuestByClientId(chat_client_id: any) {
        return Guest.create({ 
            chat_client_id,
            guest_cookie: uuid(),
        });
    }
    findOne(options: any) {
        return Guest.findOne({...options});
    }
}

export default new GuestService();