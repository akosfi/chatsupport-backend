import { Sequelize, Options } from "sequelize";
import {config} from './config';

export const sequelize = new Sequelize(config.development.url, config.development);