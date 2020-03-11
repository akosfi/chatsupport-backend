import {Socket} from 'socket.io';

import {ActiveUser, ChatMessage} from '../db/models';
import { INCOMING_MESSAGE } from './constants';

export function onIncomingMessage(socket: Socket) {
    return async (data: any) => {
        const activeUser = await ActiveUser.findOneBySocketId(socket.id); 

        const message = await ChatMessage.create({
            message: data.message,
            sent_by_admin: !activeUser.is_guest
        });

        message.save();

        return socket.emit(INCOMING_MESSAGE, {message})
    };
}