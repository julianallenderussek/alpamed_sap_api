const fs = require('fs').promises;

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully');
    return true
  } catch (err) {
    console.error('Error deleting file:', err);
    return false
  }
}

module.exports = {
  deleteFile
}