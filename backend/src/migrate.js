const { sequelize } = require('./config/database');
const fs = require('fs');
const path = require('path');

async function migrate() {
    console.log('Running database migration...');
    try {
        // Test connection
        await sequelize.authenticate();
        console.log('Database connected');

        // Read and execute schema.sql
        const schemaPath = path.join(__dirname, '../schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await sequelize.query(schema);
        console.log('Schema migrated successfully!');
        
    } catch (error) {
        console.error('Migration error:', error.message);
    } finally {
        await sequelize.close();
    }
}

migrate();