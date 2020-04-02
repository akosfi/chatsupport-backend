import { GuestUser } from "../db/models/guestuser";

class GuestService {
    addGuestByClientId(client_id: any) {
        return GuestUser.create({ client_id });
    }
}

export default new GuestService();