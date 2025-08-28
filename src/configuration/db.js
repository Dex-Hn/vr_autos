const sequelize = require('sequelize');
require('dotenv').config();
    
const db = new sequelize(
    process.env.dbname,
    process.env.dbuser,
    process.env.dbpass,
    {
        host: process.env.dbhost,
        dialect: 'mysql',
        port: process.env.dbport
    }
);

module.exports = db;
