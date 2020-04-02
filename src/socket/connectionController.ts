import jwt from 'jsonwebtoken';
import { CHAT_LICENSE_ERROR, IDENTIFYING_GUEST_SUCCEEDED, IDENTIFYING_USER_FAILED, IDENTIFYING_USER_SUCCEEDED, IDENTIFYING_GUEST_FAILED } from './constants';
import {Guest} from '../db/models/guestuser';
import ActiveUserService from '../services/ActiveUserService';
import UserService from '../services/UserService';
import GuestService from '../services/GuestService';

export function onGuestConnect(socket: any) {
    return async (data: any) => {
        if(!data.lc_license) return socket.emit(CHAT_LICENSE_ERROR); 
        else if (!data.guest_cookie) {
            const newGuest = await GuestService.addGuestByClientId(data.lc_license);

            if(!newGuest) {
                return socket.emit(CHAT_LICENSE_ERROR); 
            }

            return socket.emit(IDENTIFYING_GUEST_SUCCEEDED, {guest: newGuest});
        }
        else {
            const guest = await Guest.findOne({where: {cookie: data.guest_cookie}});
            
            if(!guest) {
                //const newGuest = GuestUser.createByChatClient(data.lc_license);
                const newGuest = null;
                if(!newGuest) {
                    return socket.emit(CHAT_LICENSE_ERROR); 
                }

                return socket.emit(IDENTIFYING_GUEST_SUCCEEDED, {guest: newGuest});
            } 
            else {
                return socket.emit(IDENTIFYING_GUEST_SUCCEEDED, {guest});
            }
        }
    };
}


export function onUserConnect(socket: any) {
    return async (data: any) => {
        const user = await UserService.getUser({id: data.id});
        
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