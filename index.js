const express = require("express");

const { exec } = require("child_process");
const { spawn } = require("child_process");
const bodyParser = require('body-parser');
const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan")
const ExcelJS = require('exceljs');
const queries = require("./queries/queries");
const callSAPServer = require("./queries/sapQuery");
const purchaseOrderRouter = require("./routes/purchaseOrders");
const path = require("path");
const { xml, testModeOn } = require("./filePaths");
const { log } = require("console");
const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));
// Middleware
app.use(bodyParser.json());

app.get("/", function (req, res) {
  return res
    .status(200)
    .json({ success: true, message: "Integration Server Running" });
});

    

app.get("/updateBash", function (req, res) {
  const data = new XMLObject('data');
  data.Transfer = "FKcIkJgJnJHKCIfMn"
  
  data.Logon
  data.Logon.UserName = "manager";
  data.Logon.Password = "FKcIkJgJnJHKCIfMnA";
  data.Logon.Company = "AMD_Entrenamiento";
  data.Logon.Server = "SAPSERVER";
  data.Logon.UserAuthentication = "False";
  data.Logon.Language
  data.Logon.LicenseServer
  data.Logon.ChooseDB = "False"
  data.Logon.DBType = "15"
  data.Logon.DBUser
  data.Logon.SybasePort
  data.Logon.DBPassword
  data.ObjectCode = "oOrders";
  
  data.FileExtractor
  data.FileExtractor.Extorlogin.ExID
  data.FileExtractor.Extorlogin.ExPW 
  data.FileExtractor.Extorlogin.ExDSN 
  data.FileExtractor.FileTypes = 2
  data.FileExtractor.Files
  data.FileExtractor.Files.Documents = testModeOn ? xml.test.purchaseOrder : xml.production.purchaseOrder 
  data.FileExtractor.Files.Document_Lines = testModeOn ? xml.production.purchaseOrder : xml.production.purchaseOrder
  data.Map
  data.Fields
  data.Documents
  data.Documents_Lines
  data.Fields

  const sourceFieldsPurchaseOrder = [ "RecordKey" ,"ParentKey", "LineNum"];
  for (let i =0; i < sourceFieldsPurchaseOrder.length;i++) {
    const field = sourceFieldsPurchaseOrder[i]
    data.Fields.Documents.SourceFields[field]
  }

  const targetFieldsPurchaseOrder = [ "RecordKey", "LineNum", "ItemCode"];
  for (let i =0; i < targetFieldsPurchaseOrder.length;i++) {
    const field = targetFieldsPurchaseOrder[i]
    data.Fields.Documents.TargetFields[field] = field
  }

  const sourceFieldsArticles = [ "RecordKey","ParentKey", "LineNum"];
  for (let i =0; i < sourceFieldsArticles.length;i++) {
    const field = sourceFieldsArticles[i]
    data.Fields.Document_Lines.SourceFields[field]
  }

  const targetFieldArticles = [ "RecordKey","ParentKey", "LineNum"];
  for (let i =0; i < targetFieldArticles.length;i++) {
    const field = targetFieldArticles[i]
    data.Fields.Document_Lines.TargetFields[field] = field
  }

  const options = [ 
    ["Import", 1],
    ["Rollback", "False"],
    ["MaxError",10],
    ["Update", 0],
    ["TestRun", 0],
    ["AddAllItems","Checked"],
    ["LineData",0],
    ["DataType",2],
    ["MultiThread","False"],
    ["ThreadNum", 4]
  ];
    
  for (let i =0; i < options.length;i++) {
    const option = options[i]
    console.log(option)
    data.Fields.Document_Lines.TargetFields[option[0]] = option[1]
  }

  const echo = spawn('echo', [data.toXML()]);

  const writeStream = fs.createWriteStream(filePath);
  echo.stdout.pipe(writeStream);

  writeStream.on('finish', () => {
    console.log(`XML file written successfully at: ${filePath}`);
  });

  return res.send( {xml: data.toXML()})
});

app.post("/test", function (req, res) {
  const { body } = req; 
  let wb = new ExcelJS.Workbook();
  const fileName = "helpers/templates/purchase_order/ordr.xlsx"
  
  wb.xlsx
    .readFile(fileName)
    .then( async () => {
      const ws = await wb.getWorksheet("Sheet1");
      
      let firstRow = ws.getRow(1).values;
      let secondRow = ws.getRow(2).values;
      let thirdRow = ws.getRow(3);


      firstRow.shift()
      secondRow.shift()


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

      return res.status(200).json({ success: true, message: "Succesfully created plain text file" });
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

app.get("/sap/queries", async function (req, res) {
  
  console.log(queries)
  return res.status(200).json({message: "This are the sap query options", queries})
});

app.post("/sap/query", async function (req, res) {
  const { table, query } = req.body;

  if (!table || !query || !queries[table][query]) {
    return res.status(400).json({message: "Please provide a valid query"})
  }

  const sqlQuery = queries[table][query]
  console.log(sqlQuery)
  const result = await callSAPServer(sqlQuery) 

  console.log(result)

  return res.status(200).json({message: "Check this", result: result})
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

app.use('/purchaseOrder', purchaseOrderRouter );

app.put("/purchase_order", function (req, res) {
  return res
    .status(200)
    .json({ success: true, message: "Integration Server Running" });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
