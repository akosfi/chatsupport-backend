import {onDisconnect, onGuestConnect, onUserConnect} from './connectionController';
import { CONNECTED, IDENTIFY_GUEST, IDENTIFY_USER, INCOMING_MESSAGE } from './constants';
import { onIncomingMessage } from './messageController';

export default function socketController(socket: any) {
    socket.emit(CONNECTED);

    socket.on(IDENTIFY_GUEST, onGuestConnect(socket));

    socket.on(IDENTIFY_USER, onUserConnect(socket));

    socket.on(INCOMING_MESSAGE, onIncomingMessage(socket));

    socket.on('disconnect', onDisconnect(socket));
}