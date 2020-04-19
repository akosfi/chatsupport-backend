import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { authMW } from "../middlewares/auth/authMW";
import { sendResponse, signUserToken } from "../util";
import UserService from "../services/UserService";

const router = express.Router();

router.post('/login', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserService.findOne({ 
        where: { username },  
    });
    if (!user) {
        return sendResponse(res, 404, "Wrong username/password.");
    }
    else if (!bcrypt.compareSync(password, user.password)) {
        return sendResponse(res, 404, "Wrong username/password.");
    }
    else {
        delete user.password;
        const token = signUserToken(user);
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return sendResponse(res, 200, "Logged in successfully.", { user });
    }
});

router.post('/register', async (req, res, next) => {
    const user = await UserService.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.save();
    return sendResponse(res, 200, "Registered successfully.");
});

router.get('/me', authMW, async (req, res, next) => {
    const decoded = jwt.verify(req.cookies.token, 'secret');

    const user = await UserService.findOne({
        where: { id: decoded['id'] },
        attributes: ['id', 'username', 'email', 'chat_token', 'client_administrated_id'] 
    });
    if (!user) {
        return sendResponse(res, 401, "User not found.");
    }
    else {
        const token = signUserToken(user);
        res.cookie('token', token, { maxAge: 90000000, httpOnly: true });
        return sendResponse(res, 200, "User found.", { user });
    }
});

router.get('/logout', authMW, async (req, res, next) => {
    res.cookie('token', '', { maxAge: 0, httpOnly: true });
    return sendResponse(res, 200, "Logged out.", {});
});

router.get('/chat-token', authMW, async (req, res, next) => {
    const decoded = jwt.verify(req.cookies.token, 'secret');
    
    const user = await UserService.findOne({
        where: { id: decoded['id'] },
        attributes: ['id', 'username', 'email', 'chat_token', 'client_administrated_id']
    });
    if(!user) {
        return sendResponse(res, 404, "User not found.", {user});
    }
    else {
        user.chat_token = jwt.sign({
            id: user.id,
        }, 'secret');
        user.save();
        return sendResponse(res, 200, "", {chat_token: user.chat_token});
    }
});

export {router};