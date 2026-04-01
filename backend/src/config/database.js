const { Sequelize } = require('sequelize');
require('dotenv').config();

const dataUrl = process.env.DB_DIALECT;
// Create Sequelize instance (this connects to PostgreSQL)
let sequelize;

if (dataUrl) {
    console.log("Using DATABASE_URL connection");
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}

else {
    // Local development: Use individual parameters from .env
    console.log('Using local database connection');
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'postgres',
            logging: console.log
        }
    );
}

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        return false;
    }
};

// Close the connection (for cleanup)
const closeConnection = async () => {
    try {
        await sequelize.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error closing connection:', error);
    }
};

module.exports = { sequelize, testConnection, closeConnection };