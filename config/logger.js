const {
    createLogger,
    transports,
    format
} = require("winston");
const filePaths = require("../filePaths");
const fs = require("fs")

const logger = createLogger({
    transports: [
        new transports.File({
            filename: "info.log",
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});

module.exports = logger;

