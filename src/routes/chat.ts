import express from "express";

var router = express.Router();

router.get('/', (req, res, next) => {
    //fetch all chat clients that the user has right to
    return;
});

router.post('/create', (req, res, next) => {
    //create chat client
    return;
});

router.get('/{id}', (req, res, next) => {
    //fetch guests of chat client specified by id
    return;
});


export {router};