import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {User} from "../db/models";
import { authMW } from "../middlewares/auth/authMW";

const router = express.Router();

router.post('/login', async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    return User.findOne({ where: { username } }).then((user: any) => {
        if (!user) {
            return res.status(404).send({
                code: 404,
                message: "Wrong username/password."
            });
        } else if (password != user.password) { //!bcrypt.compareSync(password, user.password)
            return res.status(404).send({
                code: 404,
                message: "Wrong username/password."
            });
        } else {
            const token = signToken(user);
            res.cookie('token', token, { maxAge: 900000, httpOnly: true });
            return res.status(200).send({
                code: 200,
                message: "Logged in successfully.",
                user
            });
        }
    });
});

router.post('/register', (req, res, next) => {
    return User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((user: User) => {
        const token = signToken(user);
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return res.status(200).send({
            code: 200,
            message: "Registered successfully."
        });
    })
    .catch((error: any) => {
        console.log(error);
        return res.status(400).send({
            code: 400,
            message: "Failed to register."
        });
    });
});

router.get('/me', authMW, async (req, res, next) => {
    const decoded = jwt.verify(req.cookies.token, 'secret');
    const user = await User.findOne({ where: { id: decoded['id'] } });

    if(!user) {
        return res.status(404).send({
            code: 404,
            message: "User not found."
        });
    }
    else {
        const token = signToken(user);
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return res.status(200).send({
            code: 200,
            message: "User found.",
            user
        });
    }
});


router.get('/chat-token', authMW, async (req, res, next) => {
    const decoded = JSON.parse(jwt.verify(req.cookies.token, 'secret') as string);
    const user = await User.findOne({ where: { id: decoded.id } });
            
    if(!user) {
        return res.status(404).send({
            code: 404,
            message: "User not found."
        });
    }
    else {
        user.chat_token = jwt.sign({
            number: Math.floor(Math.random() * 100000)
        }, 'secret');
        user.save();
        return res.status(200).send({
            code: 200,
            chat_token: user.chat_token,
        });
    }
});


const signToken = (user: User) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, 'secret');
}

export {router};