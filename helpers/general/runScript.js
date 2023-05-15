const runScript = (scriptPath) => {
    // Spawn a new process to execute the script
    const child = spawn("bash", [scriptPath]);
  
    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
  
    // Log any errors that occur while executing the script
    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
  
    // Log a message when the script has finished executing
    child.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
}

module.exports =  runScript;