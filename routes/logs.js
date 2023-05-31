const readTemplateSingle = require('../helpers/general/readTemplateSingle');
const { createTxtFiles, createTxtFile } = require('../helpers/general/createTxtFile');
const runScript = require('../helpers/general/runScript');
const logsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');
const filePaths = require('../filePaths');
const logger = require('../config/logger');
const { deleteFile } = require('../helpers/general/deleteFile');

async function parseLogToJson(data) {
  const logArray = data
        .trim()
        .split('\n')
        .map(JSON.parse)
        .reverse();

  return logArray;
}

async function setPermission() {
  const permissions = 0o777;
  await fs.chmod(filePaths.logs, permissions, (err) => {
    if (err) {
      console.error('Error setting file permissions:', err);
    } else {
      console.log('File permissions set successfully.');
    }
  });
}

logsRouter.get('/all', async (req, res) => {
  fs.readFile(filePaths.logs, 'utf8', async (err, data) => {
    if (err) {
      await logger.log('info', 'Testing logger')
      await setPermission()
      return res.status(400).json({success: false, err: err, message: "Error querying logs form system" })
    } else {
      if (data === "") {
        data = "No logs"
        await logger.log('info', 'Testing logger')
      } else {
        data = await parseLogToJson(data)
      }
      return res.status(200).json({success: true, logs: data })
    }
  });
});

logsRouter.get('/write', async (req, res) => {
  logger.log('info', 'Testing logger')
  return res.status(200).json({message: "Added log", succes: true})
});

logsRouter.delete('/reset', async (req, res) => {
  deleteFile(filePaths.logs)
  return res.status(200).json({message: "Restared log file"})
})



module.exports = logsRouter;