require('dotenv').config();
const config = {
    port: process.env.DB_PORT,
    db: {
        development: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            dialect: "mysql"
        }
    }
}

module.exports = config