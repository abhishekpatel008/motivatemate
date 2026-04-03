const { sequelize } = require('./config/database');
const fs = require('fs');
const path = require('path');

async function migrate() {
    console.log('Starting Database Migration...');
    try {
        await sequelize.authenticate();
        const schemaPath = path.join(__dirname, '../schema.sql');

        // Read and strip hidden encoding characters
        let schema = fs.readFileSync(schemaPath, 'utf8').replace(/^\uFEFF/, '').replace(/\0/g, '');

        // Clean up comments and empty lines
        const cleanSchema = schema
            .replace(/--.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .split('\n')
            .filter(line => line.trim() !== '')
            .join(' ');

        const sqlStatements = cleanSchema.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);

        for (let i = 0; i < sqlStatements.length; i++) {
            try {
                // Log exactly what is being sent if it's the first statement
                if (i === 0) console.log(`Executing Statement 1: ${sqlStatements[i].substring(0, 50)}...`);
                await sequelize.query(sqlStatements[i]);
            } catch (err) {
                if (err.message.toLowerCase().includes('already exists')) {
                    console.log(`Step ${i + 1}: Skipping (Already exists)`);
                } else {
                    console.error(`FAILED at Statement ${i + 1}:`, sqlStatements[i]);
                    throw err;
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