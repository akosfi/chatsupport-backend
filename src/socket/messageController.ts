import {Socket} from 'socket.io';

import { Message} from '../db/models/message';
import ActiveUserService from '../services/ActiveUserService';
import { INCOMING_MESSAGE } from './constants';
import MessageService from '../services/MessageService';

export function onIncomingMessage(socket: Socket) {
    return async (data: any) => {
        const activeUser = await ActiveUserService.getActiveUserBySocketId(socket.id);

        const message = await MessageService.addMessage({
            message: data.message,
            from_admin: !activeUser.is_guest
        });

        await message.save();

        return socket.emit(INCOMING_MESSAGE, {message})
    };
}