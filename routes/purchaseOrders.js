const readTemplateSingle = require('../helpers/general/readTemplateSingle');
const { createTxtFiles, createTxtFile } = require('../helpers/general/createTxtFile');
const purchaseOrderRouter = require('express').Router();
const path = require('path');
const filePaths = require('../filePaths');
const logger = require('../config/logger');
const fs = require('fs')
const { runScript } = require("../helpers/general/runScript");
const callSAPServer = require('../queries/sapQuery');


purchaseOrderRouter.get('/getAll', (req, res) => {
  res.send('Hello World!');
});

/////////////////////////
/////////CREATE//////////
/////////////////////////

// Step One
purchaseOrderRouter.post('/create', async (req, res) => {
  await logger.log('info', { message: "Hitting route /purchaseOrder/create" }, {
    app: "SAP-API",
    route: "/purchaseOrder/create",
    body: req.body
  });
  const { articles, purchaseOrder } = req.body

  if (!articles || !purchaseOrder) {
    await logger.log('info', { message: "User did not provide article or purchase order on req.body" }, {
      app: "SAP-API",
      route: "/purchaseOrder/create"
    });
    return res.status(403).json({ success: false, message: "Please provide purchase order and articles" })
  }

  const purchaseOrderTemplate = await readTemplateSingle(filePaths.purchaseOrder.excel);
  const articlesTemplate = await readTemplateSingle(filePaths.articles.excel);

  const purchaseOrderArr = await filteredResArr([purchaseOrder], purchaseOrderTemplate);
  const articlesArr = await filteredResArr(articles, articlesTemplate);

  await createTxtFile(filePaths.purchaseOrder.txt, purchaseOrderArr);
  await createTxtFile(filePaths.articles.txt, articlesArr);

  await logger.log('info', { message: "Purchase order + Articles txt files succesfully created" }, {
    app: "SAP-API",
    route: "/purchaseOrder/create"
  });
  // runScript(filePaths.purchaseOrder.bat)
  // .then(async (stdout) => {
  //   await logger.log('info', { message: `Succesfully runned script in url: ${filePaths.purchaseOrder.bat}`}, { 
  //     app: "SAP-API",
  //     route: "/purchaseOrder/create", 
  //     stdout: `Output .bat file: ${stdout}` 
  //   });
  //   fs.unlink(filePaths.purchaseOrder.txt, async (err) => {
  //     if (err) {
  //       await logger.log('info', { message: `Error deleting : ${filePaths.purchaseOrder.bat}`}, { 
  //         app: "SAP-API",
  //         route: "/purchaseOrder/create", 
  //         err: `Error: file ${err}` 
  //       });
  //       console.error('Error deleting file:', err);
  //     } else {
  //       await logger.log('info', { message: `Succesfully deleted file: ${filePaths.purchaseOrder.bat}`}, { 
  //         app: "SAP-API",
  //         route: "/purchaseOrder/create" 
  //       });
  //       console.log('File deleted successfully');
  //     }
  //   });
  //   await logger.log('info', { message: `Succesfully created purchase order in SAP`}, { 
  //     app: "SAP-API",
  //     route: "/purchaseOrder/create",
  //     type: "Error",
  //     stdout: stdout
  //   });
  //   return res.status(200).json({message: "Running DTW Sap"})
  // })
  // .catch((error) => {
  //   console.error('Error:', error.message);
  //   return res.status(403).json({message: "Running DTW Sap", stdout: error.message})
  // });
  // Takeout
  return res.status(200).json({ message: "Text files created in SAP Server" })
})

// Step two
purchaseOrderRouter.post("/runScript/create/wms_id/:wms_id", async function (req, res) {
  const { wms_id } = req.params

  const resultPurchseOrder = await callSAPServer(`SELECT * FROM ORDR WHERE U_ID_WMS='${wms_id}'`)
  console.log(resultPurchseOrder)
  if (resultPurchseOrder.length > 0) {
    return res.status(403).json({ message: "`Purchase Order With ID Already Created in Sap", data: resultPurchseOrder })
  }
  runScript(filePaths.purchaseOrder.bat)
    .then(async (stdout) => {
      console.log('Output:', stdout);
      await logger.log('info', { message: `Purchase Order Successfully Created in Sap : ${wms_id}` }, {
        app: "SAP-API",
        route: "/runScript/create/wms_id/:wms_id",
        stdout: stdout,
        wms_id: wms_id
      });
      return res.status(200).json({ message: "`Purchase Order Successfully Created in Sap", stdout: stdout, wms_id: wms_id })
    })
    .catch(async (error) => {
      console.error('Error:', error.message);
      await logger.log('info', { message: `Purchase Order Failed to Create in Sap : ${wms_id}` }, {
        app: "SAP-API",
        route: "/runScript/create/wms_id/:wms_id",
        error: error
      });
      return res.status(403).json({ message: "Running DTW Sap", stdout: error.message })
    });
});

/////////////////////////
/////////UPDATE//////////
/////////////////////////

purchaseOrderRouter.post('/update', async (req, res) => {
  await logger.log('info', { message: "Hitting route /purchaseOrder/update" }, {
    app: "SAP-API",
    route: "/purchaseOrder/update",
    body: req.body
  });
  const { articles, purchaseOrder } = req.body

  if (!articles || !purchaseOrder) {
    await logger.log('info', { message: "User did not provide article or purchase order on req.body to Update" }, {
      app: "SAP-API",
      route: "/purchaseOrder/update"
    });
    return res.status(403).json({ success: false, message: "Please provide purchase order and articles" })
  }

  const purchaseOrderTemplate = await readTemplateSingle(filePaths.purchaseOrder.excel);
  const articlesTemplate = await readTemplateSingle(filePaths.articles.excel);

  const purchaseOrderArr = await filteredResArr([purchaseOrder], purchaseOrderTemplate);
  const articlesArr = await filteredResArr(articles, articlesTemplate);

  await createTxtFile(filePaths.purchaseOrder.txtupdate, purchaseOrderArr);
  await createTxtFile(filePaths.articles.txtupdate, articlesArr);

  await logger.log('info', { message: "Purchase order + Articles txt files updated created" }, {
    app: "SAP-API",
    route: "/purchaseOrder/update"
  });
  // runScript(filePaths.purchaseOrder.bat)
  // .then(async (stdout) => {
  //   await logger.log('info', { message: `Succesfully runned script in url: ${filePaths.purchaseOrder.bat}`}, { 
  //     app: "SAP-API",
  //     route: "/purchaseOrder/update", 
  //     stdout: `Output .bat file: ${stdout}` 
  //   });
  //   fs.unlink(filePaths.purchaseOrder.txt, async (err) => {
  //     if (err) {
  //       await logger.log('info', { message: `Error deleting : ${filePaths.purchaseOrder.bat}`}, { 
  //         app: "SAP-API",
  //         route: "/purchaseOrder/update", 
  //         err: `Error: file ${err}` 
  //       });
  //       console.error('Error deleting file:', err);
  //     } else {
  //       await logger.log('info', { message: `Succesfully deleted file: ${filePaths.purchaseOrder.bat}`}, { 
  //         app: "SAP-API",
  //         route: "/purchaseOrder/update" 
  //       });
  //       console.log('File deleted successfully');
  //     }
  //   });
  //   await logger.log('info', { message: `Succesfully created purchase order in SAP`}, { 
  //     app: "SAP-API",
  //     route: "/purchaseOrder/update",
  //     type: "Error",
  //     stdout: stdout
  //   });
  //   return res.status(200).json({message: "Running DTW Sap"})
  // })
  // .catch((error) => {
  //   console.error('Error:', error.message);
  //   return res.status(403).json({message: "Running DTW Sap", stdout: error.message})
  // });
  // Takeout
  return res.status(200).json({ message: "Text files updated in SAP Server" })
})

purchaseOrderRouter.post("/runScript/update/wms_id/:wms_id", async function (req, res) {
  const { wms_id } = req.params

  const resultPurchseOrder = await callSAPServer(`SELECT * FROM ORDR WHERE U_ID_WMS='${wms_id}'`)
  console.log(resultPurchseOrder)
  if (resultPurchseOrder.length <= 0) {
    return res.status(403).json({ message: "`Purchase Order With ID does not exists in Sap", data: resultPurchseOrder })
  }
  runScript(filePaths.purchaseOrder.bat)
    .then(async (stdout) => {
      console.log('Output:', stdout);
      await logger.log('info', { message: `Purchase Order Successfully updated in Sap : ${wms_id}` }, {
        app: "SAP-API",
        route: "/runScript/update/wms_id/:wms_id",
        stdout: stdout,
        wms_id: wms_id
      });
      return res.status(200).json({ message: "`Purchase Order Successfully updated in Sap", stdout: stdout, wms_id: wms_id })
    })
    .catch(async (error) => {
      console.error('Error:', error.message);
      await logger.log('info', { message: `Purchase Order Failed to update in Sap : ${wms_id}` }, {
        app: "SAP-API",
        route: "/runScript/update/wms_id/:wms_id",
        error: error
      });
      return res.status(403).json({ message: "Running DTW Sap", stdout: error.message })
    });
});

/////////////////////////
/////////GET DATA////////
/////////////////////////
// Step three
purchaseOrderRouter.get("/sap/wms_id/:id", async function (req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Please provide an id" })
  }
  const resultPurchseOrder = await callSAPServer(`SELECT * FROM ORDR WHERE U_ID_WMS='${id}'`)
  const docEntry = resultPurchseOrder[0].DocEntry; //
  const resultArticle = await callSAPServer(`SELECT * FROM RDR1 WHERE DocEntry='${docEntry}'`);

  return res.status(200).json({ message: "Check this", result: resultPurchseOrder, articles: resultArticle })
});

/////////////////////////
/////////COMMON//////////
/////////////////////////


const filteredResArr = async (arr, template) => {

  let resultArr = [];
  const { firstRow, secondRow } = template.template

  resultArr.push(firstRow);
  resultArr.push(secondRow);

  const rowsArr = await arr.map((obj) => {
    const entries = Object.entries(obj);
    const keys = Object.keys(obj);

    const result = [];
    for (let i = 0; i < secondRow.length; i++) {
      const keySecondRow = secondRow[i];
      if (keys.includes(keySecondRow)) {
        const entry = entries.find(entry => entry[0] === keySecondRow);
        result.push(entry[1])
        continue
      }
      result.push("")
    }
    return result
  })

  rowsArr.forEach(row => {
    resultArr.push(row)
  });

  console.log(resultArr)

  return resultArr
}


module.exports = purchaseOrderRouter;