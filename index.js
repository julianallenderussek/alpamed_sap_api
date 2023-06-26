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
const receptionOrderRouter = require("./routes/reception");
const path = require("path");
const { xml, testModeOn } = require("./filePaths");
const { log } = require("console");
const { runInNewContext } = require("vm");
const filePaths = require("./filePaths");
const app = express();
const XMLObject = require('dynamic-xml-builder');
const readTemplateSingle = require("./helpers/general/readTemplateSingle");
const { create } = require('xmlbuilder2');
const { runScript } = require("./helpers/general/runScript");
const logsRouter = require("./routes/logs");
const logger = require("./config/logger");
const receptionRouter = require("./routes/reception");


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

    

app.get("/updateBash", async (req, res) => {
  
  const logonObject = {
    UserName: "manager",
    Password: "FKcIkJgJnJHKCIfMnA",
    Company: "AMD_Entrenamiento",
    Server: "SAPSERVER",
    UserAuthentication: "False",
    Language: {},
    LicenseServer: {},
    ChooseDB: "False",
    DBType: "15",
    DBUser: {},
    SybasePort: {},
    DBPassword: {},
  }

  const obj = {
    Transfer: {
      Logon: {
        ...logonObject
      },
      ObjectCode : { 
        ObjectCode: "oOrders"
      },
      FileExtractor: {
        Extorlogin: {},
        Files: {
          Documents: {},
          Document_Lines: {}
        }
      },
      Map: {
        Fields: {
          Documents: {
            SourceFields: {},
            TargetFields: {}
          },
          Document_Lines: {
            SourceFields: {},
            TargetFields: {}
          },
        }
      },
      Run: {}
    }
  }
    
  obj.Transfer.FileExtractor.Extorlogin
  obj.Transfer.FileExtractor.Extorlogin.ExID
  obj.Transfer.FileExtractor.Extorlogin.ExPW 
  obj.Transfer.FileExtractor.Extorlogin.ExDSN 
  obj.Transfer.FileExtractor.FileTypes = 2
  obj.Transfer.FileExtractor.Files
  obj.Transfer.FileExtractor.Files.Documents = testModeOn ? filePaths.xml.test.purchaseOrder : filePaths.xml.production.purchaseOrder 
  obj.Transfer.FileExtractor.Files.Document_Lines = testModeOn ? filePaths.xml.test.articles : filePaths.xml.production.articles
  
  const sourceFieldsPurchaseOrder = [
    "RecordKey",
    "DocNum",
    "DocDate",    
    "DocDueDate",
    "CardCode",
    "CardName",
    "NumAtCard",
    "SalesPersonCode",
    "TaxDate",
    "U_ID_OV",
    "U_Agencia",
    "U_C_AA",
    "U_Ref_AA",
    "U_N_Capt",
    "U_Naviera",
    "U_Direccion_Consig",
    "U_RFC",
    "U_Regimen",
    "U_H_Solicitado",
    "U_Estatus_contenedor",
    "U_ID_WMS",
    "U_Puerto"
  ];
  
  for (let i =0; i < sourceFieldsPurchaseOrder.length;i++) {
    const field = sourceFieldsPurchaseOrder[i]
    obj.Transfer.Map.Fields.Documents.SourceFields[field] = {}
  }

  for (let i =0; i < sourceFieldsPurchaseOrder.length;i++) {
    const field = sourceFieldsPurchaseOrder[i]
    obj.Transfer.Map.Fields.Documents.TargetFields[field] = field
  }

  const sourceFieldsArticles = [
    "RecordKey",
    "ParentKey",
    "LineNum",
    "ItemCode",
    "Quantity",
    "WarehouseCode",
    "FreeText",
    "ImportLog"
  ];
  
  for (let i =0; i < sourceFieldsArticles.length;i++) {
    const field = sourceFieldsArticles[i]
    obj.Transfer.Map.Fields.Document_Lines.SourceFields[field] = {}
  }

  for (let i =0; i < sourceFieldsArticles.length;i++) {
    const field = sourceFieldsArticles[i]
    obj.Transfer.Map.Fields.Document_Lines.TargetFields[field] = field
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
    obj.Transfer.Run[option[0]] = option[1]
  }

  
  const doc = create(obj);
  const xml = doc.end({ prettyPrint: true });

  fs.writeFile(filePaths.xml.production.purchaseOrder, xml, (err) => {
    if(err) {
      return console.log(err);
    }
    console.log(`The file was saved! in ${filePaths.xml.production.purchaseOrder}`);
    return res.status(200).json({message: "Done updating file"})
  })


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

      return res.status(200).json({ success: true, message: "Successfully created plain text file" });
    })
    .catch((err) => {
      console.log(err.message);
      return res
      .status(400)
      .json({ success: false, message: "Error on integration" });
    });
});

app.post("/runBat", function (req, res) {
  exec(filePaths.executables.test.purchaseOrder, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
    return res.status(200).json({result: `Output: ${stdout}`})
  });
});

app.post("/runScript/test", function (req, res) {
  runScript(filePaths.purchaseOrder.bat)
  .then((stdout) => {
    console.log('Output:', stdout);
    logger.info('info', 'Success: runned /runsScript/test')
    return res.status(200).json({message: "Running DTW Sap", stdout: stdout})
  })
  .catch((error) => {
    console.error('Error:', error.message);
    logger.info('info', 'Error: runned /runsScript/rest')
    return res.status(403).json({message: "Running DTW Sap", stdout: error.message})
  });  
});

app.post("/runScript/deleteFile", function (req, res) {
  fs.unlink(filePaths.purchaseOrder.txt, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      logger.info('info', 'Error: runned /runScript/deletFile')
      return res.status(200).json({message: "Error deleting purchase order files"})
    } else {
      console.log('File deleted successfully');
      logger.info('info', 'Success: runned /runScript/deleteFile')
      return res.status(200).json({message: "Delete purchase Order Files"})
    }
  });
});

app.post("/runScript/integrateSap", function (req, res) {
  runScript(filePaths.purchaseOrder.bat)
  .then((stdout) => {
    console.log('Output:', stdout);
    logger.info('info', `Success: runned /runScript/deleteFile => stdout: ${stdout}`)
    return res.status(200).json({message: "Running DTW Sap", stdout: stdout})
  })
  .catch((error) => {
    console.error('Error:', error.message);
    logger.info('info', `Error: runned /runScript/deleteFile => error: ${error.message}`)
    return res.status(403).json({message: "Running DTW Sap", stdout: error.message})
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
app.use('/reception', receptionRouter );
app.use('/logs', logsRouter );


app.put("/purchase_order", function (req, res) {
  return res
    .status(200)
    .json({ success: true, message: "Integration Server Running" });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
