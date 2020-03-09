import {onDisconnect, onGuestConnect, onUserConnect} from './connectionController';

export default function socketController(socket: any) {
    socket.emit('connected');

    socket.on('identify_guest', onGuestConnect(socket));

    socket.on('identify_user', onUserConnect(socket));

    socket.on('im', () => {});

    socket.on('disconnect', onDisconnect(socket));
}