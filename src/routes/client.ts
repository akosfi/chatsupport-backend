import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import {sendResponse} from '../util';
import { ChatClient } from '../db/models/chatclient';
import { GuestUser } from '../db/models/guestuser';
import { ChatMessage } from '../db/models/chatmessage';
import { User } from '../db/models/user';

var router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const user = jwt.decode(req.cookies.token) as { [key: string]: any; };
    
    return ChatClient.findOne({where: {owner_id: user.id}}).then((client) => {
        if(client) {
            return sendResponse(res, 200, "", {client});
        }
        else {
            return sendResponse(res, 404, "");
        }
    });
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const user = jwt.decode(req.cookies.token) as { [key: string]: any; };

    return ChatClient.create({
        license: Math.floor(Math.random() * 1000000),
        owner_id: user.id
    }).then(client => {
        if(client){
            return sendResponse(res, 200, "Client created successfully.", {client});
        }
        else {
            return sendResponse(res, 400, "Client cannot be created.", {client});
        };
    });
});

router.get('/:id/guest', async (req: Request, res: Response, next: NextFunction) => {
    const user_token = jwt.decode(req.cookies.token) as { [key: string]: any; };

    const client = await ChatClient.findOne({
        where: { id: req.params.id },
        include: [{ model: GuestUser, as: 'guests' }]
    });
    if (!client) {
        return sendResponse(res, 404, "");
    }
    else {
        return sendResponse(res, 200, "", { guests: client['guests'] });
    }
});

router.get('/:id/message', async (req: Request, res: Response, next: NextFunction) => {
    const client = await ChatClient.findOne({
        where: { id: req.params.id },
        include: [{ model: ChatMessage, as: 'messages' }]
    });
    if (!client) {
        return sendResponse(res, 404, "");
    }
    else {
        return sendResponse(res, 200, "", { messages: client['messages'] });
    }
});


export {router};