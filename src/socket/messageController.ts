import {Socket} from 'socket.io';

import { Message} from '../db/models/message';
import ActiveUserService from '../services/ActiveUserService';
import { INCOMING_MESSAGE, GUEST_MESSAGES_SEND } from './constants';
import MessageService from '../services/MessageService';
import ClientService from '../services/ClientService';
import GuestService from '../services/GuestService';
import UserService from '../services/UserService';

export function onIncomingMessage(io: any, socket: Socket) {
    return async (data: any) => {
        const activeUser = await ActiveUserService.getActiveUserBySocketId(socket.id);

        const message = await MessageService.addMessage({
            message: data.message,
            guest_user_id: activeUser.is_guest ? activeUser.user_id : data.guest_id,
            from_admin: !activeUser.is_guest
        });

        await message.save();

        if(activeUser.is_guest) {
            //todo join
            const guest = await GuestService.findOne({where: {id: activeUser.user_id}});
            const client = await ClientService.findOne({where: {id: guest.chat_client_id}});
            const owner = await ActiveUserService.getActiveUserByUserId(client.owner_id, false);
            if(owner) {
                io.to(`${owner.socket_id}`).emit({message});
            }
        }
        else {
            const guest = await ActiveUserService.getActiveUserByUserId(data.guest_id, true);
            if(guest) {
                io.to(`${guest.socket_id}`).emit({message});
            }
        }
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