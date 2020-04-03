import {Dialect} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  'development': {
    url: process.env.DEV_DATABASE_URL as string,
    dialect: 'postgres' as Dialect,
  },
  'production': {
    url: process.env.DATABASE_URL as string,
    dialect: 'postgres' as Dialect,
  }
};

export default config;