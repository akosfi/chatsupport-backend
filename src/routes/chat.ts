import express from "express";

var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('chats');
    next();
});

router.get('/create', (req, res, next) => {
    res.send('chats');
    next();
});

router.post('/create', (req, res, next) => {
    res.send('chats');
    next();
});

router.get('/{id}', (req, res, next) => {
    res.send('chats');
    next();
});


export {router};