import express from "express";

const db = require('../db/models'); //TODO migrate sequelize to typescript

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('pages/index');
});

router.post('/login', (req, res, next) => {
    res.send('login');
    next();
});

router.get('/register', (req, res, next) => {
    res.render('pages/register');
});

router.post('/register', (req, res, next) => {
    db.User.create({
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password
    })
    .then((user: any) => {
        req.session.user = user.dataValues;
        console.log(user.dataValues);
        res.redirect('/chat');
    })
    .catch((error: any) => {
        console.log(error);
        res.redirect('/register');
    });
});

export {router};