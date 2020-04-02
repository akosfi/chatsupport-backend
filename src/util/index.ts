import jwt from 'jsonwebtoken';

import {User} from '../db/models/user';

export function sendResponse(response, code, message, misc = {}) {
    return response.status(404).send({
        code,
        message,
        ...misc
    });
}


export function signUserToken(user: User) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, 'secret');
}