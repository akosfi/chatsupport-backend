import express from "express";

var router = express.Router();

router.get('/', (req, res, next) => {
    return res.send('chats');
});

router.get('/create', (req, res, next) => {
    return res.send('chats');
});

router.post('/create', (req, res, next) => {
    return res.send('chats');
});

router.get('/{id}', (req, res, next) => {
    return res.send('chats');
});


export {router};