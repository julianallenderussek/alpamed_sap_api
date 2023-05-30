const { spawn } = require('child_process');

const runScript = (scriptPath) => {
  return new Promise((resolve, reject) => {
    const bat = spawn(scriptPath);
    let stdout = '';

    bat.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    bat.stderr.on('data', (data) => {
      reject(new Error(data.toString()));
    });

    bat.on('exit', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

module.exports = {
    runScript
}