const readTemplateSingle = require('../helpers/general/readTemplateSingle');
const { createTxtFiles, createTxtFile } = require('../helpers/general/createTxtFile');
const receptionRouter = require('express').Router();
const path = require('path');
const filePaths = require('../filePaths');
const logger = require('../config/logger');
const fs = require('fs')
const { runScript } = require("../helpers/general/runScript");
const callSAPServer = require('../queries/sapQuery');

/////////////////////////
/////////CREATE//////////
/////////////////////////

receptionRouter.post('/test', async (req, res) => {
  const wms_id = "123"
  const result = await callSAPServer(`SELECT * FROM ORDN'`)
  return res.status(200).json({message: result})
})

///// MATERIAL
receptionRouter.get('/check/:wms_id', async (req, res) => {
  const { wms_id } = req.params;
  const result = await callSAPServer(`SELECT * FROM ORDN WHERE U_ID_WMS = ${wms_id}`)
  if (!result) {
  return res.status(404).json({message: `Reception with U_ID_WMS: ${wms_id} does not exists in SAP Database` })
  }
  return res.status(200).json({reception: result})
})

// Step One
receptionRouter.post('/create/material', async (req, res) => {
  await logger.log('info', { message: "Hitting route /reception/create" }, {
    app: "SAP-API",
    route: "/reception/create",
    body: req.body
  });
  const { receptionArticles, reception, batchInfo } = req.body

  if (!receptionArticles || !reception || !batchInfo) {
    await logger.log('info', { message: "User did not provide receptionArticles / reception / batchInfo on req.body" }, {
      app: "SAP-API",
      route: "/reception/create/material"
    });
    return res.status(403).json({ success: false, message: "Please provide reception, batchInfo and receptionArticles" })
  }

  const receptionTemplate = await readTemplateSingle(filePaths.reception.excel);
  const receptionArticlesTemplate = await readTemplateSingle(filePaths.receptionArticles.excel);
  
  // Batch info cuz we are doing material
  const batchInfoTemplate = await readTemplateSingle(filePaths.batchInfo.excel);
  
  console.log("Clone Wars AAAAAAAAAAAAAAAAAAAAAAAA", batchInfoTemplate);

  // Filtering Value arrays
  const receptionOrderArr = await filteredResArr([reception], receptionTemplate);
  const receptionArticlesArr = await filteredResArr(receptionArticles, receptionArticlesTemplate);
  const batchInfoArr = await filteredResArr(batchInfo, batchInfoTemplate);
  
  console.log("WHAT UP",batchInfoArr)

  await createTxtFile(filePaths.reception.txt, receptionOrderArr);
  await createTxtFile(filePaths.receptionArticles.txt, receptionArticlesArr);
  await createTxtFile(filePaths.batchInfo.txt, batchInfoArr);
  
  await logger.log('info', { message: "Reception + ReceptionArticles + BatchInfo txt files successfully created" }, {
    app: "SAP-API",
    route: "/reception/material/create"
  });

  return res.status(200).json({message: "Reception Text files created in SAP Server" })
})




module.exports = receptionRouter;