const readTemplateSingle = require('../helpers/general/readTemplateSingle');
const { createTxtFiles, createTxtFile } = require('../helpers/general/createTxtFile');
const inventoryRouter = require('express').Router();
const path = require('path');
const filePaths = require('../filePaths');
const logger = require('../config/logger');
const fs = require('fs')
const { runScript } = require("../helpers/general/runScript");
const callSAPServer = require('../queries/sapQuery');
const queries = require('../queries/queries');

/////////////////////////
/////////CREATE//////////
/////////////////////////

inventoryRouter.get('/general', async (req, res) => {
  const result = await callSAPServer(queries.inventory.getAllGeneral)
  return res.status(200).json({message: result})
})


inventoryRouter.get('/general/client/:clientId', async (req, res) => {
    const { clientId } = req.params
    const fullQuery = queries.inventory.getAllGeneralClient + clientId
    console.log(fullQuery)
    const result = await callSAPServer(fullQuery)
    return res.status(200).json({message: result})
})

inventoryRouter.get('/lots', async (req, res) => {
    const result = await callSAPServer(queries.inventory.getAllLots)
    return res.status(200).json({message: result})
})

inventoryRouter.get('/lots/client/:clientId', async (req, res) => {
    const { clientId } = req.params
    const fullQuery = queries.inventory.getLotsPerClient + clientId
    console.log(fullQuery)
    const result = await callSAPServer(fullQuery)
    return res.status(200).json({message: result})
})


inventoryRouter.get('/series', async (req, res) => {
    const result = await callSAPServer(queries.inventory.getAllSerialNumber)
    return res.status(200).json({message: result})
})

inventoryRouter.get('/series/client/:clientId', async (req, res) => {
    const { clientId } = req.params
    const fullQuery = queries.inventory.getAllSerialNumberClient + clientId
    console.log(fullQuery)
    const result = await callSAPServer(fullQuery)
    return res.status(200).json({message: result})
})

module.exports = inventoryRouter;