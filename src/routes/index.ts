import express from "express";

import {router as messageRouter} from './messages';
import {router as authenticationRouter} from './authentication';
import {router as chatRouter} from './chat';
import {authMW} from "../middlewares/auth/authMW";
import {inverseAuthMW} from "../middlewares/auth/inverseAuthMW";

const router = express.Router();

router.use('/api/messages', messageRouter);
router.use('/chat', authMW, chatRouter);
router.use('/', inverseAuthMW ,authenticationRouter);

export {router};