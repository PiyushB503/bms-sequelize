import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_bms',
  port: 5432,
});

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
