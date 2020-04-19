import { CHAT_LICENSE_ERROR, GUEST_JOINED, IDENTIFYING_GUEST_SUCCEEDED, IDENTIFYING_USER_FAILED, IDENTIFYING_USER_SUCCEEDED, IDENTIFYING_GUEST_FAILED, GUEST_COOKIE_SET } from './constants';
import ActiveUserService from '../services/ActiveUserService';
import UserService from '../services/UserService';
import GuestService from '../services/GuestService';
import ClientService from '../services/ClientService';

export function onGuestConnect(io: any, socket: any) {
    return async (data: any) => {
        let client = null;
        let guest = null;
        if(!data.lc_license) return socket.emit(CHAT_LICENSE_ERROR); 
        else if (!data.guest_cookie) {
            client = await ClientService.findOne({where: {license: data.lc_license}});
            guest = await GuestService.addGuestByClientId(client.id);

            if(!guest) {
                return socket.emit(CHAT_LICENSE_ERROR); 
            }

            socket.emit(GUEST_COOKIE_SET, {guest_cookie: guest.guest_cookie});
        }
        else {
            guest = await GuestService.findOne({where: {guest_cookie: data.guest_cookie}});
            
            if(!guest) {
                client = await ClientService.findOne({where: {license: data.lc_license}});
                guest = await GuestService.addGuestByClientId(client.id);
                
                if(!guest) {
                    return socket.emit(CHAT_LICENSE_ERROR); 
                }
            
                socket.emit(GUEST_COOKIE_SET, {guest_cookie: guest.guest_cookie});
            } 
            else {
                client = await ClientService.findOne({where: {id: guest.chat_client_id}});
            }
        }
        await ActiveUserService.addActiveUser(guest.id, true, socket.id);

        const activeUsers = await ClientService.findActiveUsers(client.id);
        activeUsers.forEach((user) => io.to(`${user.socket_id}`).emit(GUEST_JOINED, {guest}));

        return socket.emit(IDENTIFYING_GUEST_SUCCEEDED);
    };
}


export function onUserConnect(socket: any) {
    return async (data: any) => {
        const user = await UserService.findOne({where: {id: data.id}});
        
        if(user.chat_token !== data.token) {
            return socket.emit(IDENTIFYING_USER_FAILED);
        }

        const activeUser = await ActiveUserService.addActiveUser(user.id, false, socket.id);
        
        if(activeUser) return socket.emit(IDENTIFYING_USER_SUCCEEDED);
        return socket.emit(IDENTIFYING_USER_FAILED);
    }
}


export function onDisconnect(socket) {
    return async (data: any) => {
        await ActiveUserService.removeActiveUser({socket_id: socket.id});
    };
} 