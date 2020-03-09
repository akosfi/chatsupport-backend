const db = require('../db/models');

export default function socketController(socket: any) {
    socket.emit('connected');

    socket.on('identify', (data: any) => {
        if(!data.lc_license) return socket.emit('lc_license_error'); 
        else if (!data.guest_cookie) {
            return createNewGuest(socket, data.lc_license);
        }
        else {
            return db.GuestUser.findOneByCookie(data.guest_cookie).then((user: any) => {
                if (!user) {   
                    return createNewGuest(socket, data.lc_license);
                } else {    
                    user.socket_id = socket.id;
                    user.save();
                    socket.emit('guest_identified', {guest: user});
                }
            });
        }
    });

    socket.on('disconnect', () => {
        /*return db.GuestUser.findOneBySocket(socket.id).then((user: any) => {
            if(user){
                user.socket_id = '';
                user.save();
            }
        });*/
    });
}

async function createNewGuest(socket: any, license: any){
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