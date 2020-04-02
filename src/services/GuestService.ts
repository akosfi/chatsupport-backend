import { Guest } from "../db/models/guestuser";

class GuestService {
    addGuestByClientId(client_id: any) {
        return Guest.create({ client_id });
    }
}

export default new GuestService();