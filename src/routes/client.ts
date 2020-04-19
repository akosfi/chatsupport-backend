import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import {sendResponse} from '../util';
import ClientService from '../services/ClientService';
import { authMW } from '../middlewares/auth/authMW';
import UserService from '../services/UserService';

var router = express.Router();

router.get('/', authMW, async (req: Request, res: Response, next: NextFunction) => {
    const decoded = jwt.decode(req.cookies.token) as { [key: string]: any; };
    
    const user = await UserService.findOne({where: {id: decoded['id']}});

    if(user.client_administrated_id) {
        const client = await ClientService.findOne({where: {id: user.client_administrated_id} });
        if(client) {
            return sendResponse(res, 200, "", {client});
        }
    }
    else {
        const client = await ClientService.findOne({where: {owner_id: decoded.id} }); 
        if(client) {
            return sendResponse(res, 200, "", {client});
        }
    }
    return sendResponse(res, 404, "");
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

    const client = await ClientService.findOneWithGuests({where: { id: req.params.id }});
    if (!client) {
        return sendResponse(res, 404, "");
    }
    else {
        return sendResponse(res, 200, "", { guests: client['guests'] });
    }
});

router.get('/:id/message', authMW, async (req: Request, res: Response, next: NextFunction) => {
    const client = await ClientService.findOneWithMessages({ where: { id: req.params.id } });
    if (!client) {
        return sendResponse(res, 404, "");
    }
    else {
        return sendResponse(res, 200, "", { messages: client['messages'] });
    }
});

router.get('/:id/admin', authMW, async (req, res, next) => {
    const client = await ClientService.findOneWithAdmins({
        attributes: ['id'],
        where: {id: req.params.id},
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

    const userForAdmin = await UserService.findOne({where: {email}});
    if(!userForAdmin) return sendResponse(res, 404, "User not existing with specified email!");

    userForAdmin.client_administrated_id = clientId;
    await userForAdmin.save();
    
    return sendResponse(res, 200, "Admin was added succesfully!", {admin: userForAdmin});
});

router.delete('/:id/admin', authMW, async (req, res, next) => {
    const admin = req.body.admin;
    const clientId = req.params.id;
    if(!admin || !clientId) return sendResponse(res, 404, "No email/clientId was speicified!");

    const userForAdmin = await UserService.findOne({where: {id: admin.id, client_administrated_id: clientId}});
    if(!userForAdmin) return sendResponse(res, 404, "User not existing with specified email!");

    userForAdmin.client_administrated_id = null;
    await userForAdmin.save();
    
    return sendResponse(res, 200, "Admin was removed succesfully!");
});

router.get('/:id/unseen', authMW, async (req, res, next) => {
    const clientId = req.params.id;
    
    const unseenMessages = await ClientService.getUnseenMessages(clientId);

    return sendResponse(res, 200, "Unseen messages!", {guests: unseenMessages});
});

export {router};