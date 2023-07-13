const readTemplateSingle = require('../helpers/general/readTemplateSingle');
const { createTxtFiles, createTxtFile } = require('../helpers/general/createTxtFile');
const deliveryRouter = require('express').Router();
const path = require('path');
const filePaths = require('../filePaths');
const logger = require('../config/logger');
const fs = require('fs')
const { runScript } = require("../helpers/general/runScript");
const callSAPServer = require('../queries/sapQuery');

/////////////////////////
/////////CREATE//////////
/////////////////////////

deliveryRouter.post('/test', async (req, res) => {
  const wms_id = "123"
  const result = await callSAPServer(`SELECT * FROM ODLN`)
  return res.status(200).json({message: result})
})

deliveryRouter.post('/check/:wms_id', async (req, res) => {
  const { wms_id } = req.params;
  const result = await callSAPServer(`SELECT * FROM ODLN WHERE U_ID_WMS = ${wms_id}`)
  return res.status(200).json({message: result})
})

///// MATERIAL

// Step One
deliveryRouter.post('/create/material', async (req, res) => {
  await logger.log('info', { message: "Hitting route /delivery/create" }, {
    app: "SAP-API",
    route: "/delivery/create",
    body: req.body
  });
  const { deliveryArticles, delivery, batchInfo } = req.body

  if (!deliveryArticles || !delivery || !batchInfo) {
    await logger.log('info', { message: "User did not provide deliveryArticles / delivery / batchInfo on req.body" }, {
      app: "SAP-API",
      route: "/delivery/create/material"
    });
    return res.status(403).json({ success: false, message: "Please provide delivery, batchInfo and deliveryArticles" })
  }

  const deliveryTemplate = await readTemplateSingle(filePaths.delivery.excel);
  const deliveryArticlesTemplate = await readTemplateSingle(filePaths.deliveryArticles.excel);
  
  // Batch info cuz we are doing material
  const batchInfoTemplate = await readTemplateSingle(filePaths.batchInfo.excel);
  
  // Filtering Value arrays
  const deliveryOrderArr = await filteredResArr([delivery], deliveryTemplate);
  const deliveryArticlesArr = await filteredResArr(deliveryArticles, deliveryArticlesTemplate);
  const batchInfoArr = await filteredResArr(batchInfo, batchInfoTemplate);
  
  await createTxtFile(filePaths.delivery.txt, deliveryOrderArr);
  await createTxtFile(filePaths.deliveryArticles.txt, deliveryArticlesArr);
  await createTxtFile(filePaths.batchInfo.txtDelivery, batchInfoArr);
  
  await logger.log('info', { message: "Delivery + DeliveryArticles + BatchInfo txt files successfully created" }, {
    app: "SAP-API",
    route: "/delivery/material/create"
  });

  return res.status(200).json({message: "Delivery Text files created in SAP Server" })
})

// Step two
deliveryRouter.post("/runScript/create/material/wms_id/:wms_id", async function (req, res) {
  const { wms_id } = req.params

  const resultDelivery = await callSAPServer(`SELECT * FROM ODLN WHERE U_ID_WMS='${wms_id}'`)
  console.log(resultDelivery)
  if (resultDelivery.length > 0) {
    return res.status(403).json({ message: "`Delivery With ID Already Created in Sap", data: resultDelivery })
  }
  runScript(filePaths.delivery.batMaterialCreate)
    .then(async (stdout) => {
      console.log('Output:', stdout);
      await logger.log('info', { message: `Delivery Successfully Created in Sap : ${wms_id}` }, {
        app: "SAP-API",
        route: "/delivery/runScript/create/wms_id/:wms_id",
        stdout: stdout,
        wms_id: wms_id
      });
      return res.status(200).json({ message: "`Delivery Successfully Created in Sap", stdout: stdout, wms_id: wms_id })
    })
    .catch(async (error) => {
      console.error('Error:', error.message);
      await logger.log('info', { message: `Delivery Failed to Create in Sap : ${wms_id}` }, {
        app: "SAP-API",
        route: "/delivery/runScript/create/wms_id/:wms_id",
        error: error
      });
      return res.status(403).json({ message: "Running DTW Sap", stdout: error.message })
    });
});

///// CONTAINER
// Step One
deliveryRouter.post('/create/container', async (req, res) => {
  await logger.log('info', { message: "Hitting route /container/create" }, {
    app: "SAP-API",
    route: "/container/create",
    body: req.body
  });
  const { deliveryArticles, delivery, lotInfo } = req.body

  if (!deliveryArticles || !delivery || !lotInfo) {
    await logger.log('info', { message: "User did not provide deliveryArticles / delivery / lotInfo on req.body" }, {
      app: "SAP-API",
      route: "/lotInfo/create/material"
    });
    return res.status(403).json({ success: false, message: "Please provide delivery, lotInfo and deliveryArticles" })
  }

  const deliveryTemplate = await readTemplateSingle(filePaths.delivery.excel);
  const deliveryArticlesTemplate = await readTemplateSingle(filePaths.deliveryArticles.excel);
  
  // Batch info cuz we are doing material
  const lotInfoTemplate = await readTemplateSingle(filePaths.lotInfo.excel);
  
  // Filtering Value arrays
  const deliveryOrderArr = await filteredResArr([delivery], deliveryTemplate);
  const deliveryArticlesArr = await filteredResArr(deliveryArticles, deliveryArticlesTemplate);
  const lotInfoArr = await filteredResArr(lotInfo, lotInfoTemplate);
  
  await createTxtFile(filePaths.delivery.txt, deliveryOrderArr);
  await createTxtFile(filePaths.deliveryArticles.txt, deliveryArticlesArr);
  await createTxtFile(filePaths.lotInfo.txtDelivery, lotInfoArr);
  
  await logger.log('info', { message: "Delivery + DeliveryArticles + lotInfo txt files successfully created" }, {
    app: "SAP-API",
    route: "/container/material/create"
  });

  return res.status(200).json({message: "Delivery Text files created in SAP Server" })
})

// Step two
deliveryRouter.post("/runScript/create/container/wms_id/:wms_id", async function (req, res) {
  const { wms_id } = req.params

  const deliveryReception = await callSAPServer(`SELECT * FROM ODLN WHERE U_ID_WMS='${wms_id}'`)
  console.log(deliveryReception)
  if (deliveryReception.length > 0) {
    return res.status(403).json({ message: "`Delivery With ID Already Created in Sap", data: resultDelivery })
  }
  runScript(filePaths.delivery.batLoadCreate)
    .then(async (stdout) => {
      console.log('Output:', stdout);
      await logger.log('info', { message: `Delivery Successfully Created in Sap : ${wms_id}` }, {
        app: "SAP-API",
        route: "/delivery/runScript/create/wms_id/:wms_id",
        stdout: stdout,
        wms_id: wms_id
      });
      return res.status(200).json({ message: "`Delivery Successfully Created in Sap", stdout: stdout, wms_id: wms_id })
    })
    .catch(async (error) => {
      console.error('Error:', error.message);
      await logger.log('info', { message: `Delivery Failed to Create in Sap : ${wms_id}` }, {
        app: "SAP-API",
        route: "/delivery/runScript/create/wms_id/:wms_id",
        error: error
      });
      return res.status(403).json({ message: "Running DTW Sap", stdout: error.message })
    });
});



/////////////////////////
/////////UPDATE//////////
/////////////////////////

deliveryRouter.post('/update', async (req, res) => {
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
  // Takeout
  return res.status(200).json({ message: "Text files updated in SAP Server" })
})

deliveryRouter.post("/runScript/update/wms_id/:wms_id", async function (req, res) {
  const { wms_id } = req.params

  const resultPurchseOrder = await callSAPServer(`SELECT * FROM ORDR WHERE U_ID_WMS='${wms_id}'`)
  console.log(resultPurchseOrder)
  if (resultPurchseOrder.length <= 0) {
    return res.status(403).json({ message: "`Purchase Order With ID does not exists in Sap", data: resultPurchseOrder })
  }
  runScript(filePaths.purchaseOrder.batUpdate)
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
deliveryRouter.get("/sap/wms_id/:id", async function (req, res) {
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


module.exports = deliveryRouter;