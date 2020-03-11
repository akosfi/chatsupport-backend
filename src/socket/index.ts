import {onDisconnect, onGuestConnect, onUserConnect} from './connectionController';
import { CONNECTED, IDENTIFY_GUEST, IDENTIFY_USER, INCOMING_MESSAGE, DISCONNECTED } from './constants';

export default function socketController(socket: any) {
    socket.emit(CONNECTED);

    socket.on(IDENTIFY_GUEST, onGuestConnect(socket));

    socket.on(IDENTIFY_USER, onUserConnect(socket));

    socket.on(INCOMING_MESSAGE, () => {});

    socket.on(DISCONNECTED, onDisconnect(socket));
}