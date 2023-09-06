const readTemplateSingle = require('../helpers/general/readTemplateSingle');
const { createTxtFiles, createTxtFile } = require('../helpers/general/createTxtFile');
const pdfRouter = require('express').Router();
const callSAPServer = require('../queries/sapQuery');

pdfRouter.get('/test', async (req, res) => {
  return res.status(200).json({message: "Hello from pdfs"})
})


pdfRouter.get('/purchase_order/:wms_id', async (req, res) => {
  const { wms_id } = req.params;
  console.log(`SELECT * FROM ORDR WHERE U_ID_WMS='${wms_id}'`)
  const purchase_order = await callSAPServer(`SELECT * FROM ORDR WHERE U_ID_WMS='${wms_id}'`)
  if (!purchase_order) {
  return res.status(404).json({message: `Reception with U_ID_WMS: ${wms_id} does not exists in SAP Database` })
  }
  
  console.log("PURCHASE ORDER")
  console.log(purchase_order)

  const lineArticles = await callSAPServer(`SELECT * FROM RDR1 WHERE DocEntry='${purchase_order.DocEntry}'`)
  
  
  console.log("CHEWBACA")
  console.log(lineArticles)

  let result = {
    purchase_order,
    lineArticles
  }

  return res.status(200).json({reception: result})
})

pdfRouter.get('/reception/:wms_id', async (req, res) => {
  const { wms_id } = req.params;
  const reception = await callSAPServer(`SELECT * FROM ORDN WHERE U_ID_WMS='${wms_id}'`)
  if (!reception) {
  return res.status(404).json({message: `Reception with U_ID_WMS: ${wms_id} does not exists in SAP Database` })
  }
  const lineArticles = await callSAPServer(`SELECT * FROM RDN1 WHERE DocEntry='${reception.DocEntry}'`)
  
  let result = {
    reception,
    lineArticles
  }

  return res.status(200).json({reception: result})
})


pdfRouter.get('/delivery/:wms_id', async (req, res) => {
  const { wms_id } = req.params;
  const delivery = await callSAPServer(`SELECT * FROM ODLN WHERE U_ID_WMS='${wms_id}'`)
  if (!delivery) {
  return res.status(404).json({message: `Reception with U_ID_WMS: ${wms_id} does not exists in SAP Database` })
  }
  const lineArticles = await callSAPServer(`SELECT * FROM DLN1 WHERE DocEntry='${delivery.DocEntry}'`)
  
  let result = {
    delivery,
    lineArticles
  }

  return res.status(200).json({reception: result})
})

module.exports = pdfRouter;