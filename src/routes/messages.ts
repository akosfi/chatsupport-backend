import express from "express";

var router = express.Router();

router.get('/', (req, res, next) => {
    //fetch previous messages of user (or guest?)
    return;
});

export {router};