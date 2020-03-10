import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../db/models';

var router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const user_token = jwt.decode(req.cookies.token) as { [key: string]: any; };
    
    const user = await User.findOne({where: {id: user_token['id']}});

    return res.send({
        clients: user.chatClients 
    });
});

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
    //create chat client
    return;
});

router.get('/{id}', (req: Request, res: Response, next: NextFunction) => {
    //fetch guests of chat client specified by id
    return;
});


export {router};