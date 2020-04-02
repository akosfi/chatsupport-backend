import express from "express";
import {Guest} from '../db/models/guest';
import {Message} from '../db/models/message';
import {sendResponse} from '../util';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    const guest = await Guest.findOne({
        where: { id: req.params.id },
        include: [{ model: Message, as: 'messages' }]
    });
    if (!guest) {
        return sendResponse(res, 404, "");
    }
    else {
        return sendResponse(res, 200, "", { messages: guest['messages'] });
    }
});

export {router};