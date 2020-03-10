import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

const authMW = (req: Request, res: Response, next: NextFunction) => {
    if(req.cookies.token){
        jwt.verify(req.cookies.token, "secret", (err: any, decoded: any) => {
            if(err) {
                res.status(403);
                return res.end();
            }
            return next();
        });
    }
    else {
        res.status(403);
        return res.end();
    }
};

export {authMW};