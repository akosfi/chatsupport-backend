import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import {User, ChatClient, GuestUser} from '../db/models/';

var router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const user = await fetchUserFromRequest(req);
    
    const chatClient = await ChatClient.findOne({where: {owner_id: user.id.toString()}});


    if(chatClient) {
        res.status(200);
        return res.send({
            code: 200,
            chatClient 
        });
    }
    else {
        res.status(404);
        return res.send({
            code: 404,
            chatClient: null 
        });
    }

});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const user = await fetchUserFromRequest(req);

    const chatClient = await ChatClient.create({
        license: Math.floor(Math.random() * 1000000),
        owner_id: user.id
    });

    if(chatClient){
        res.status(200);
        return res.send({
            code: 200,
            message: 'ChatClient created successfully.',
            client: chatClient
        });
    }
    else {
        res.status(404);
        return res.send({
            code: 404,
            message: 'Chat Client cannot be created!',
        });
    };
});

router.get('/:id/guest', async (req: Request, res: Response, next: NextFunction) => {
    
    const chatClient = await ChatClient.findOne({
        where: {owner_id: 1},
        include: [ChatClient.associations.guests]
    });

    const guest = await GuestUser.findOne({
        include: [ChatClient]
    });

    console.log(chatClient.guests);
    //where: {owner_id: user.id.toString()},

    //guestUsers

    if(!chatClient) {
        res.status(404);
        return res.send({
            code: 404,
            guests: null 
        });
    }

    const guests = await GuestUser.findAll({where: {chat_client_id: chatClient.id.toString()}});

    res.status(200);
    return res.send({
        code: 200,
        guests 
    });
});

const fetchUserFromRequest = async (req: Request) => {
    const user_token = jwt.decode(req.cookies.token) as { [key: string]: any; };
    
    return await User.findOne({where: {id: user_token['id']}});
}


export {router};