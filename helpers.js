const fs = require('fs');

// Function to compare two files
function compareFiles(file1, file2) {
  // Read the contents of both files
  const content1 = fs.readFileSync(file1, 'utf-8');
  const content2 = fs.readFileSync(file2, 'utf-8');

  // Compare the contents of the files
  if (content1 === content2) {
    console.log("The files are identical.");
  } else {
    console.log("The files are not identical.");
  }
}

// Call the function and pass in the file names
compareFiles('./output.txt', './ordrdelimited.txt');