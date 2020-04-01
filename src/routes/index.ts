import express from "express";

import {router as authenticationRouter} from './authentication';
import {router as chatRouter} from './client';
import {router as guestController} from './guest';

const router = express.Router();

router.use('/user', authenticationRouter);
router.use('/client', chatRouter);
router.use('/guest', guestController);

export {router};