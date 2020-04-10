import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import {sendResponse} from '../util';
import { Client } from '../db/models/client';
import { Guest } from '../db/models/guest';
import { Message } from '../db/models/message';
import { User } from '../db/models/user';
import {v4 as uuid} from 'uuid';
import ClientService from '../services/ClientService';
import { authMW } from '../middlewares/auth/authMW';

var router = express.Router();

router.get('/', authMW, async (req: Request, res: Response, next: NextFunction) => {
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

router.post('/', authMW, async (req: Request, res: Response, next: NextFunction) => {
    const user = jwt.decode(req.cookies.token) as { [key: string]: any; };

    return ClientService.create({
        license: Math.floor(Math.random() * 100000000),
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

router.get('/:id/guest', authMW, async (req: Request, res: Response, next: NextFunction) => {
    const user_token = jwt.decode(req.cookies.token) as { [key: string]: any; };

    const client = await ClientService.findOne({
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

router.get('/:id/message', authMW, async (req: Request, res: Response, next: NextFunction) => {
    const client = await ClientService.findOne({
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

router.get('/:id/admin', authMW, async (req, res, next) => {
    const client = await ClientService.findOne({
        attributes: ['id'],
        where: {id: req.params.id},
        include: { 
            model: User,
            as: 'admins',
        }
    });
    if(client) {
        return sendResponse(res, 200, "", {admins: client['admins']});
    }
    else {
        return sendResponse(res, 404, "");
    }
});

router.post('/:id/admin', authMW, async (req, res, next) => {
    const email = req.body.email;
    const clientId = req.params.id;
    if(!email || !clientId) return sendResponse(res, 404, "No email/clientId was speicified!");

    const userForAdmin = await User.findOne({where: {email}});
    if(!userForAdmin) return sendResponse(res, 404, "User not existing with email!");

    userForAdmin.client_administrated_id = clientId;
    await userForAdmin.save();
    
    return sendResponse(res, 200, "Admin was added succesfully!", {admin: userForAdmin});
    
});

router.get('/:id/unseen', async (req, res, next) => {
    const clientId = req.params.id;
    
    const unseenMessages = await ClientService.getUnseenMessages(clientId);

    return sendResponse(res, 200, "Unseen messages!", {guests: unseenMessages});
});

export {router};