import {onDisconnect, onGuestConnect, onUserConnect} from './connectionController';
import { CONNECTED, IDENTIFY_GUEST, IDENTIFY_USER, INCOMING_MESSAGE, INCOMING_MESSAGE_SEEN, GUEST_MESSAGES_GET } from './constants';
import { onIncomingMessage, onIncomingMessageSeen, onGuestMessagesGet } from './messageController';

export default function socketController(io: any) {
    return function(socket: any) {
        socket.emit(CONNECTED);

        socket.on(IDENTIFY_GUEST, onGuestConnect(io, socket));

        socket.on(IDENTIFY_USER, onUserConnect(socket));

        socket.on(INCOMING_MESSAGE, onIncomingMessage(io, socket));

        socket.on(INCOMING_MESSAGE_SEEN, onIncomingMessageSeen(io, socket));

        socket.on(GUEST_MESSAGES_GET, onGuestMessagesGet(socket));

        socket.on('disconnect', onDisconnect(socket));
    }
}