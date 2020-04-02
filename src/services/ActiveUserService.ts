import {ActiveUser} from '../db/models/activeuser';

class ActiveUserService {
    getActiveUserById(id: any) {
        return ActiveUser.findOne({where: {id}});
    }
    getActiveUserByUserId(user_id: any, is_guest: any) {
        return ActiveUser.findOne({where: {user_id, is_guest}});
    }
    getActiveUserBySocketId(socket_id: any) {
        return ActiveUser.findOne({where: {socket_id}})
    }
    addActiveUser(user_id: any, is_guest: any, socket_id: any) {
        return ActiveUser.create({
            user_id,
            is_guest,
            socket_id
        });
    }
    removeActiveUser(options) {
        return ActiveUser
            .findOne({where: {...options}})
            .then(user => {
                if(user) {
                    user.destroy();
                }
            });
    }
}


export default new ActiveUserService();