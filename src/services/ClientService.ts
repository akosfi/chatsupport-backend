import { Client } from "../db/models/client";

class ClientService {
    findOne(options: any) {
        return Client.findOne({...options});
    }
}

export default new ClientService();