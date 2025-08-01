require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_bms',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  }
  // test: {
  //   username: process.env.DB_USER || 'postgres',
  //   password: process.env.DB_PASSWORD || '',
  //   database: process.env.DB_NAME || 'db_bms_test',
  //   host: process.env.DB_HOST || 'localhost',
  //   dialect: 'postgres',
  // },
  // production: {
  //   username: process.env.DB_USER || 'postgres',
  //   password: process.env.DB_PASSWORD || '',
  //   database: process.env.DB_NAME || 'db_bms_prod',
  //   host: process.env.DB_HOST || 'localhost',
  //   dialect: 'postgres',
  // },
};
