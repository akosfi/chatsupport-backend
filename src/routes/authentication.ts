import express from "express";

const db = require('../db/models'); //TODO migrate sequelize to typescript

const router = express.Router();

router.get('/login', (req, res, next) => {
    return res.render('pages/index');
});

router.post('/login', (req, res, next) => {
    return res.send('login');
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
        console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
        req.session.user = user.dataValues;
        return res.redirect('/chat');
    })
    .catch((error: any) => {
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        return res.redirect('/register');
    });
});

export {router};