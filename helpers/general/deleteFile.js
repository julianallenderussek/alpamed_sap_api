const path = require('path');
const filePaths = require('../../filePaths');
const fs = require('fs').promises;

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully');
  } catch (err) {
    console.error('Error deleting file:', err);
  }
}

module.exports = {
  deleteFile
}