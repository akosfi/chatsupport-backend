import { Sequelize, Options } from "sequelize";
import {config} from './config';

export const sequelize = new Sequelize(config.development.url, config.development);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });