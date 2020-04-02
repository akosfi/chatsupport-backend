import { Guest } from "../db/models/guest";

class GuestService {
    addGuestByClientId(client_id: any) {
        return Guest.create({ client_id });
    }
    findOne(options) {
        return Guest.findOne({...options});
    }
}

export default new GuestService();