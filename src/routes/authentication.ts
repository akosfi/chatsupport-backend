import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {User} from "../db/models";

const router = express.Router();

router.get('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    return User.findOne({ where: { email } }).then((user: any) => {
        if (!user) {
            res.status(404);
            return res.send({
                code: 404,
                message: "Wrong email/password."
            });
        } else if (!bcrypt.compareSync(password, user.password)) {
            res.status(404);
            return res.send({
                code: 404,
                message: "Wrong email/password."
            });
        } else {
            const token = jwt.sign({
                email: user.email,
                username: user.username,
            }, 'secret');
            res.cookie('token', token, { maxAge: 900000, httpOnly: true });
            res.status(200);
            return res.send({
                code: 200,
                message: "Logged in successfully."
            });
        }
    });
});

router.get('/register', (req, res, next) => {
    return User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((user: any) => {
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username,
        }, 'secret');
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        res.status(200);
        return res.send({
            code: 200,
            message: "Registered successfully."
        });
    })
    .catch((error: any) => {
        res.status(400);
        return res.send({
            code: 400,
            message: "Wrong email/password."
        });
    });
});

export {router};