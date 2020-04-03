import { Client } from "../db/models/client";

class ClientService {
    findOne(options: any) {
        return Client.findOne({...options});
    }
    create(options: any) {
        return Client.create({...options});
    }
}

export default new ClientService();