import { Sequelize, Options } from "sequelize";
import config from './config';


const _config = (process.env.NODE_ENV === 'production') ? config['production'] : config['development']; 

export const sequelize = new Sequelize(_config.url, _config);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });