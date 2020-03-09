import express from "express";

import {router as messageRouter} from './messages';
import {router as authenticationRouter} from './authentication';
import {router as chatRouter} from './chat';
import {authMW} from "../middlewares/auth/authMW";

const router = express.Router();

router.use('/messages', messageRouter);
router.use('/chat', authMW, chatRouter);

export {router};