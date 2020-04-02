import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import {sendResponse} from '../util';
import { Client } from '../db/models/client';
import { Guest } from '../db/models/guest';
import { Message } from '../db/models/message';
import { User } from '../db/models/user';

var router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies.token);
    const user = jwt.decode(req.cookies.token) as { [key: string]: any; };
    
    return Client.findOne({where: {owner_id: user.id}}).then((client) => {
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

    return Client.create({
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

    const client = await Client.findOne({
        where: { id: req.params.id },
        include: [{ model: Guest, as: 'guests' }]
    });
    if (!client) {
        return sendResponse(res, 404, "");
    }
    else {
        return sendResponse(res, 200, "", { guests: client['guests'] });
    }
});

router.get('/:id/message', async (req: Request, res: Response, next: NextFunction) => {
    const client = await Client.findOne({
        where: { id: req.params.id },
        include: [{ model: Message, as: 'messages' }]
    });
    if (!client) {
        return sendResponse(res, 404, "");
    }
    else {
        return sendResponse(res, 200, "", { messages: client['messages'] });
    }
});


export {router};