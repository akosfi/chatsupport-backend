import {User} from '../db/models/user';

class UserService {
    getUser(options: any) {
        return User.findOne({where: {...options}});
    }
}

export default new UserService();