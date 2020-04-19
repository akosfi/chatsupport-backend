import jwt from 'jsonwebtoken';
import { CHAT_LICENSE_ERROR, IDENTIFYING_GUEST_SUCCEEDED, IDENTIFYING_USER_FAILED, IDENTIFYING_USER_SUCCEEDED, IDENTIFYING_GUEST_FAILED, GUEST_COOKIE_SET } from './constants';
import ActiveUserService from '../services/ActiveUserService';
import UserService from '../services/UserService';
import GuestService from '../services/GuestService';
import ClientService from '../services/ClientService';

export function onGuestConnect(socket: any) {
    return async (data: any) => {
        if(!data.lc_license) return socket.emit(CHAT_LICENSE_ERROR); 
        else if (!data.guest_cookie) {
            const client = await ClientService.findOne({where: {license: data.lc_license}});

            const newGuest = await GuestService.addGuestByClientId(client.id);

            if(!newGuest) {
                return socket.emit(CHAT_LICENSE_ERROR); 
            }

            await ActiveUserService.addActiveUser(newGuest.id, true, socket.id);

            socket.emit(GUEST_COOKIE_SET, {guest_cookie: newGuest.guest_cookie});
            return socket.emit(IDENTIFYING_GUEST_SUCCEEDED);
        }
        else {
            const guest = await GuestService.findOne({where: {guest_cookie: data.guest_cookie}});
            
            if(!guest) {
                const client = await ClientService.findOne({where: {license: data.lc_license}});

                const newGuest = await GuestService.addGuestByClientId(client.id);
                
                if(!newGuest) {
                    return socket.emit(CHAT_LICENSE_ERROR); 
                }

                await ActiveUserService.addActiveUser(newGuest.id, true, socket.id);
            
                socket.emit(GUEST_COOKIE_SET, {guest_cookie: newGuest.guest_cookie});
                return socket.emit(IDENTIFYING_GUEST_SUCCEEDED);
            } 
            else {
                await ActiveUserService.addActiveUser(guest.id, true, socket.id);
                
                return socket.emit(IDENTIFYING_GUEST_SUCCEEDED);
            }
        }
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