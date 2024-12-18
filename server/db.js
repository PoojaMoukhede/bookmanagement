const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Change this if you're using PostgreSQL or other DB
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = { sequelize, connectToDatabase };
