import {User} from '../db/models/user';

class UserService {
    findOne(options: any) {
        return User.findOne({...options});
    }
    create(options: any) {
        return User.create({...options});
    }
}

export default new UserService();