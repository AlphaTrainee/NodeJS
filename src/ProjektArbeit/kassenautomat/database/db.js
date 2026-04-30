import { Sequelize } from 'sequelize';
import 'dotenv/config';

const isMysql = process.env.DB_USE_MYSQL === 'true';

const sequelize = isMysql 
  ? new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false,
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database/database.sqlite',
      logging: false,
    });

export default sequelize;