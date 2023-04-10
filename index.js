const express = require("express");

const { exec } = require("child_process");
const { spawn } = require("child_process");
const bodyParser = require('body-parser');
const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");
const ExcelJS = require('exceljs');

const app = express();


let wb = new ExcelJS.Workbook();


// Middleware
app.use(bodyParser.json());
// cors ->

app.get("/", function (req, res) {
  return res
    .status(200)
    .json({ success: true, message: "Integration Server Running" });
});

app.post("/test", function (req, res) {
  const { body } = req; 

  const fileName = "./templates/purchase_order/ordr.xlsx"
  
  wb.xlsx
    .readFile(fileName)
    .then( async () => {
      const ws = await wb.getWorksheet("Sheet1");
      
      let firstRow = ws.getRow(1).values;
      let secondRow = ws.getRow(2).values;
      let thirdRow = ws.getRow(3);

      firstRow.shift()
      secondRow.shift()

      const entries = Object.entries(body)
      const keys = Object.keys(body)

      let result = [[], [], []];

      // Maybe here rearrange the values from the backend 
      
      // Get body values and using mapping - Filter them 

      for (let i = 0; i < firstRow.length; i++) {
        const value = firstRow[i];
        if (keys.includes(value)) {
          for (let j = 0; j < entries.length; j++) {
            if (entries[j][0] === value) {
              result[0].push(value);
              result[1].push(secondRow[i]);
              if (value === "DocNum") {
                result[2].push("1");
                continue
              }
              result[2].push(entries[j][1]);
            }
          }
        }
      }

      createTxtFile(result[0], result[1], result[2]);

      return res.status(200).json({ success: true, message: "Integration Server Running" });
    })
    .catch((err) => {
      console.log(err.message);
      return res
      .status(400)
      .json({ success: false, message: "Error on integration" });
    });
});

app.get("/purchase_order", async function (req, res) {
  await readXlsxFile("./templates/purchase_order/ordr.xlsx").then( async (data) => {
    const filtered = {
      columns: [],
      columnsTwo: [],
      values: [],
    };

    for (let i = 0; i < data[0].length; i++) {
      const value = data[2][i];
      if (value) {
        filtered.columns.push(data[0][i]);
        filtered.columnsTwo.push(data[1][i]);
        filtered.values.push(value);
      }
    }

    await createTxtFile(filtered.columns, filtered.columnsTwo, filtered.values);

    return res.status(200).json({ success: true, data: data });
  });
});


async function createTxtFile(arr1, arr2, arr3) {
  let text = "";

  const transverseArr = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length - 1) {
        text += arr[i] + "\n";
        break;
      }
      text += arr[i] + "\t";
      // text += arr1[i] + '\t' + arr2[i] + '\t' + arr3[i] + '\n';
    }
    console.log(text);
  };

  transverseArr(arr1);
  transverseArr(arr2);
  transverseArr(arr3);

  await fs.writeFile("output.txt", text, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
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
        return;
      }
      console.log("Running script");
      runScript("./executables/hello.sh");
    }
  );

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

function runScript(scriptPath) {
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
