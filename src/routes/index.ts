import express from "express";

import {router as authenticationRouter} from './authentication';
import {router as chatRouter} from './client';
import {authMW} from "../middlewares/auth/authMW";

const router = express.Router();


router.use('/user', authenticationRouter);
router.use('/client', chatRouter);

export {router};