import express from "express";

const db = require('../db/models'); //TODO migrate sequelize to typescript
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/login', (req, res, next) => {
    return res.render('pages/login');
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    return db.User.findOne({ where: { username: username } }).then((user: any) => {
        if (!user) {
            return res.redirect('/login');
        } else if (!bcrypt.compareSync(password, user.password)) {
            return res.redirect('/login');
        } else {
            req.session.user = user.dataValues;
            return res.redirect('/chat');
        }
    });
});

router.get('/register', (req, res, next) => {
    return res.render('pages/register');
});

router.post('/register', (req, res, next) => {
    return db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((user: any) => {
        req.session.user = user.dataValues;
        return res.redirect('/chat');
    })
    .catch((error: any) => {
        return res.redirect('/register');
    });
});

export {router};