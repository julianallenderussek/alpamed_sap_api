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

clientsRouter.get('/clients:clientId', async (req, res) => {
    const { clientId } = req.params
    const fullQuery = `${queries.tables.getClientById}'${clientId}'` 
    console.log(fullQuery)
    const result = await callSAPServer(fullQuery)
    return res.status(200).json({message: result})
})

clientsRouter.get('/clients', async (req, res) => {
 const result = await callSAPServer(queries.tables.getClients)
 return res.status(200).json({message: result})
})


module.exports = clientsRouter;