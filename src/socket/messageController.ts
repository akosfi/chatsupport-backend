import {Socket} from 'socket.io';

import { Message} from '../db/models/message';
import ActiveUserService from '../services/ActiveUserService';
import { INCOMING_MESSAGE, GUEST_MESSAGES_SEND } from './constants';
import MessageService from '../services/MessageService';

export function onIncomingMessage(socket: Socket) {
    return async (data: any) => {
        const activeUser = await ActiveUserService.getActiveUserBySocketId(socket.id);

        let g_id = null;
        if(activeUser.is_guest) {
            g_id = activeUser.user_id;
        }
        else {
            g_id = data.guest_id;
        }

        const message = await MessageService.addMessage({
            message: data.message,
            guest_user_id: g_id,
            from_admin: !activeUser.is_guest
        });

        await message.save();

        return socket.emit(INCOMING_MESSAGE, {message})
    };
}

export function onGuestMessagesGet(socket: Socket) {
    return async (data: any) => {
        const activeUser = await ActiveUserService.getActiveUserBySocketId(socket.id);

        if(activeUser) {
            const messages = await MessageService.getMessagesForGuest(activeUser.user_id);

            return socket.emit(GUEST_MESSAGES_SEND, {messages});
        } 
    };
}