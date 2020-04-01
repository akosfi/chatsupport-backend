import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

const authMW = (req, res, next) => {
    if(req.cookies.token){
        jwt.verify(req.cookies.token, "secret", (err: any, decoded: any) => {
            if(err) {
                return res.send({
                    code: 401,
                    message: "Unauthorized."
                });
            }
            return next();
        });
    }
    else {
        return res.send({
            code: 401,
            message: "Unauthorized."
        }); 
    }
};

export {authMW};