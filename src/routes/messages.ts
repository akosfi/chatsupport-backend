import express from "express";

var router = express.Router();

router.get('/', (req, res, next) => {
    return res.send('get all messages');
});
router.post('/', (req, res, next) => {
    return res.send('send message');
});

export {router};