import express from "express";
import {GuestUser} from '../db/models/guestuser';
import {ChatMessage} from '../db/models/chatmessage';
import {sendResponse} from '../util';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    const guest = await GuestUser.findOne({
        where: { id: req.params.id },
        include: [{ model: ChatMessage, as: 'messages' }]
    });
    if (!guest) {
        return sendResponse(res, 404, "");
    }
    else {
        return sendResponse(res, 200, "", { guest });
    }
});



export {router};