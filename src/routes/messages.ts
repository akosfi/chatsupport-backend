import express from "express";

var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('get all messages');
    next();
});
router.post('/', (req, res, next) => {
    res.send('send message');
    next();
});

export {router};