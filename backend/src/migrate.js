const { sequelize } = require('./config/database');
const fs = require('fs');
const path = require('path');

async function migrate() {
    console.log('Starting Database Migration...');
    try {
        await sequelize.authenticate();
        console.log('Connected to Database.');

        const schemaPath = path.join(__dirname, '../schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // 1. Remove single-line comments (-- comment)
        // 2. Remove multi-line comments (/* comment */)
        // 3. Remove empty lines
        const cleanSchema = schema
            .replace(/--.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .split('\n')
            .filter(line => line.trim() !== '')
            .join(' ');

        // 4. Split by semicolon, but filter out empty results
        const sqlStatements = cleanSchema
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0);

        console.log(`Executing ${sqlStatements.length} SQL statements...`);

        for (let i = 0; i < sqlStatements.length; i++) {
            const statement = sqlStatements[i];
            try {
                await sequelize.query(statement);
            } catch (queryError) {
                // Ignore "already exists" errors so the script doesn't crash 
                // if it half-finished a previous run
                if (queryError.message.toLowerCase().includes('already exists')) {
                    console.log(`Step ${i + 1}: Skipping (Already exists)`);
                } else {
                    console.error(`Error in Statement ${i + 1}:`, queryError.message);
                    throw queryError;
                }
            }
        }

        console.log('Schema migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error.message);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
}

migrate();