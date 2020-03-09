import jwt from 'jsonwebtoken';

const db = require('../db/models');

export function onGuestConnect(socket: any) {
    return (data: any) => {
        if(!data.lc_license) return socket.emit('lc_license_error'); 
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
                    socket.emit('guest_identified', {guest: user});
                }
            });
        }
    };
}


export function onUserConnect(socket: any) {
    return (data: any) => {
        return jwt.verify(data.token, "secret", (err: any, decoded: any) => {
            if(err) return socket.emit('user_error');
            return socket.emit('user_identified', {user: decoded.user});
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
      socket.emit('lc_license_error');
    }
    else {
      const new_guest = db.GuestUser.create(license);
      new_guest.socket_id = socket.id;
      new_guest.save();
      socket.emit('guest_set', {guest: new_guest});
    }
}