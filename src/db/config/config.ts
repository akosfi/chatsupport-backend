import {Dialect} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  development: {
    url: process.env.DEV_DATABASE_URL as string,
    dialect: 'postgres' as Dialect,
  }
}