import express from "express";
import {Message} from '../db/models/message';
import {sendResponse} from '../util';
import { authMW } from "../middlewares/auth/authMW";
import GuestService from "../services/GuestService";

const router = express.Router();

router.get('/:id', authMW, async (req, res, next) => {
    const guest = await GuestService.findOne({
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