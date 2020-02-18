import express from "express";

var router = express.Router();

router.get('/login', (req, res, next) => {
    res.send('login');
    next();
});

router.post('/login', (req, res, next) => {
    res.send('login');
    next();
});

router.get('/register', (req, res, next) => {
    res.send('register');
    next();
});

router.post('/register', (req, res, next) => {
    res.send('register');
    next();
});

export {router};