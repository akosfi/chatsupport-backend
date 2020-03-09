const db = require('../db/models');

export function onIncomingMessage(socket: any) {
    return (data: any) => {
        //search in activeusers table for socket id, determine sent_by_admin from there
        //then save message
    };
}