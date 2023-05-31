const {
    createLogger,
    transports,
    format
} = require("winston");
require("winston-mongodb");
require('dotenv').config();

const { MONGO_URL } = process.env
console.log(process.env)

const logger = createLogger({
    transports: [
        new transports.File({
            filename: "info.log",
            format: format.combine(format.timestamp(), format.metadata(), format.json())
        }),
        new transports.MongoDB({
            level: 'info',
            db: process.env.MONGO_URL,
            collection: 'logs',
            format: format.combine(format.timestamp(), format.metadata(), format.json())
        })
    ]
});

module.exports = logger;

