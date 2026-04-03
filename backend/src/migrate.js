const { sequelize } = require('./config/database');
const fs = require('fs');
const path = require('path');

async function migrate() {
    console.log('Running database migration...');
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        const schemaPath = path.join(__dirname, '../schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Split by semicolon to handle statements individually
        const sqlStatements = schema
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

        for (const statement of sqlStatements) {
            await sequelize.query(statement);
        }
        
        console.log('Schema migrated successfully!');
    } catch (error) {
        console.error('Migration error:', error.message);
        process.exit(1); 
    } finally {
        await sequelize.close();
    }
}

migrate();