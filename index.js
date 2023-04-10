const express = require("express");
const app = express();

const { exec } = require("child_process");
const { spawn } = require("child_process");
const { log } = require("console");
const readXlsxFile = require('read-excel-file/node')
const fs = require("fs")

// cors -> 

app.get("/", function (req, res) {
  return res
    .status(200)
    .json({ success: true, message: "Integration Server Running" });
});

app.get("/purchase_order/create", async function (req, res) {
  await readXlsxFile("./templates/purchase_order/ordr.xlsx").then((data) => {
    
    const filtered = {
      columns: [],
      columnsTwo: [],
      values: []
    }

    for (let i =0; i < data[0].length; i++) {
      const value = data[2][i]
      if (value) {
        filtered.columns.push(data[0][i]);
        filtered.columnsTwo.push(data[1][i]);
        filtered.values.push(value)
      }
    }

    
    createTxtFile(filtered.columns, filtered.columnsTwo, filtered.values)

    return res
    .status(200)
    .json({ success: true, data: data });
  })
});

// function createTabDelimitedFile(filtered) {
//   // Combine the arrays into a 2D array for easier processing
  
//   // Create a string with the header row
//   let fileContent = '';

//   // Loop through the arrays and append each row to the file content

//   const values = Object.values(filtered);
//   for (let i =0; i < values.length ;i++) {
//     const valuesArr = values[i];
//     for (let j =0; j < valuesArr.length; j++) {
//       const value = valuesArr[j];
//       fileContent += `${value}\t`
//     }
//     fileContent += `\n`
//   }
//   console.log(fileContent)
//   // Write the file to disk
//   fs.writeFileSync('output.txt', fileContent);
// }


function createTxtFile(arr1, arr2, arr3) {
  let text = '';

  const transverseArr = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if(i === arr.length - 1) {
        console.log(" FINAL COUNTDOWN");
        text += arr[i] + '\n'
        break
      }
      text += arr[i] + '\t'
      // text += arr1[i] + '\t' + arr2[i] + '\t' + arr3[i] + '\n';
    }
    console.log(text)
  }

  transverseArr(arr1)
  transverseArr(arr2)
  transverseArr(arr3)

  fs.writeFile(
    "output.txt",
    text,
    (err) => {
      if (err) {
        console.error(err);
        return 
      }
     }
  )

}

app.post("/purchase_order", function (req, res) {
  const fs = require("fs");

  const content = "Some content!";

  fs.writeFile(
    "./files/purchase_order/create/purchase_order.txt",
    content,
    (err) => {
      if (err) {
        console.error(err);
        return 
      }
      console.log("Running script");
      runScript("./executables/hello.sh")
    }
  )

  return res
    .status(200)
    .json({ success: true, message: "Integration Server Running" });
});

app.put("/purchase_order", function (req, res) {
  return res
    .status(200)
    .json({ success: true, message: "Integration Server Running" });
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});

function runScript (scriptPath) {
  // Replace 'path/to/script.sh' with the path to your bash script

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