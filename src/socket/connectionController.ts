import jwt from 'jsonwebtoken';
import { CHAT_LICENSE_ERROR, IDENTIFIED_GUEST, IDENTIFYING_USER_FAILED, IDENTIFYING_USER } from './constants';

const db = require('../db/models');

export function onGuestConnect(socket: any) {
    return (data: any) => {
        if(!data.lc_license) return socket.emit(CHAT_LICENSE_ERROR); 
        else if (!data.guest_cookie) {
            return addNewGuest(socket, data.lc_license);
        }
        else {
            return db.GuestUser.findOneByCookie(data.guest_cookie).then((user: any) => {
                if (!user) {   
                    return addNewGuest(socket, data.lc_license);
                } else {    
                    user.socket_id = socket.id;
                    user.save();
                    socket.emit(IDENTIFIED_GUEST, {guest: user});
                }
            });
        }
    };
}


export function onUserConnect(socket: any) {
    return (data: any) => {
        return jwt.verify(data.token, "secret", (err: any, decoded: any) => {
            if(err) return socket.emit(IDENTIFYING_USER_FAILED);
            return socket.emit(IDENTIFYING_USER, {user: decoded.user});
        });
    }
}


export function onDisconnect(socket: any) {
    return (data: any) => {
        //delete from table activeusers
    };
} 


async function addNewGuest(socket: any, license: any){
    const chatClient = await db.ChatClient.findOne({where: { license }});
    if(!chatClient) {
      socket.emit(CHAT_LICENSE_ERROR);
    }
    else {
      const new_guest = db.GuestUser.create(license);
      new_guest.socket_id = socket.id;
      new_guest.save();
      socket.emit(IDENTIFIED_GUEST, {guest: new_guest});
    }
}