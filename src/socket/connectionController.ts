import jwt from 'jsonwebtoken';
import { CHAT_LICENSE_ERROR, IDENTIFYING_GUEST_SUCCEEDED, IDENTIFYING_USER_FAILED, IDENTIFYING_USER_SUCCEEDED } from './constants';
import {GuestUser} from '../db/models';

export function onGuestConnect(socket: any) {
    return async (data: any) => {
        if(!data.lc_license) return socket.emit(CHAT_LICENSE_ERROR); 
        else if (!data.guest_cookie) {
            const newGuest = GuestUser.createByChatClient(data.lc_license);
            
            if(!newGuest) {
                return socket.emit(CHAT_LICENSE_ERROR); 
            }

            socket.emit(IDENTIFYING_GUEST_SUCCEEDED, {guest: newGuest});
        }
        else {
            const guest = await GuestUser.findOne({where: {cookie: data.guest_cookie}});
            
            if(!guest) {
                const newGuest = GuestUser.createByChatClient(data.lc_license);
                
                if(!newGuest) {
                    return socket.emit(CHAT_LICENSE_ERROR); 
                }

                socket.emit(IDENTIFYING_GUEST_SUCCEEDED, {guest: newGuest});
            } 
            else {
                socket.emit(IDENTIFYING_GUEST_SUCCEEDED, {guest});
            }
        }
    };
}


export function onUserConnect(socket: any) {
    return (data: any) => {
        return jwt.verify(data.token, "secret", (err: any, decoded: any) => {
            if(err) return socket.emit(IDENTIFYING_USER_FAILED);
            return socket.emit(IDENTIFYING_USER_SUCCEEDED, {user: decoded.user});
        });
    }
}


export function onDisconnect(socket_id: string) {
    return (data: any) => {
        
    };
} 