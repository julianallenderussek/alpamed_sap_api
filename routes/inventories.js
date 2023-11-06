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
inventoryRouter.get('/warehouses', async (req, res) => {
    const result = await callSAPServer(queries.warehouse.locations)
    return res.status(200).json({message: result})
})

inventoryRouter.get('/general', async (req, res) => {
  const result = await callSAPServer(queries.inventory.getAllGeneral)
  return res.status(200).json({message: result})
})

inventoryRouter.get('/general/client/:clientId', async (req, res) => {
    const { clientId } = req.params
    const fullQuery = `${queries.inventory.getAllGeneralClient} '${clientId}'` 
    console.log(fullQuery)
    const result = await callSAPServer(fullQuery)
    return res.status(200).json({message: result})
})

inventoryRouter.get('/identifiers', async (req, res) => {
    
    const identifiers = await callSAPServer(queries.inventory.getLotIdentifiers)
    return res.status(200).json({identifiers: identifiers})
})

inventoryRouter.get('/lots', async (req, res) => {
    const lotsQuery = await callSAPServer(queries.inventory.getAllLots)
    const result = [];

    const identifiers = await callSAPServer(queries.inventory.getLotIdentifiers)
    
    for (let i =0; i < lotsQuery.length; i++) {
        let obj = {}
        const lot = lotsQuery[i];
        obj.lot = lot
        
        const lotID = await identifiers.find(lotInfo => lotInfo.DistNumber === lot.BatchNumber)
        console.log("MATCH", lotID, lot.BatchNumber)
        if (lotID) {
            obj.lot.MnfSerial = lotID 
            console.log("MATCH", lotID, lot.BatchNumber)
        }
        obj.reception = null
        obj.delivery = null
        obj.lineArticles = null

        if (lot.Direction === 0) {
            let receptionQuery = await callSAPServer(`${queries.reception.getReceptionByDocNum}${lot.BaseNum}`)
            obj.reception = receptionQuery[0]
            let lineArticlesQuery = await callSAPServer(`${queries.reception.getReceptionLineArticlesByDocEntry}${receptionQuery[0].DocEntry}`)
            obj.lineArticles = lineArticlesQuery
        }
        if (lot.Direction === 1) {
            let deliveryQuery = await callSAPServer(`${queries.delivery.getDeliveryByDocNum}${lot.BaseNum}`)
            obj.delivery = deliveryQuery[0]
            let lineArticlesQuery = await callSAPServer(`${queries.delivery.getDeliveryLineArticlesByDocEntry}${deliveryQuery[0].DocEntry}`)
            obj.lineArticles = lineArticlesQuery
        }
        result.push(obj)
    }
    return res.status(200).json({result: result})
})


inventoryRouter.get('/lots/client/:clientId', async (req, res) => {
    const { clientId } = req.params
    const fullQuery = `${queries.inventory.getLotsPerClient}'${clientId}'` 
    const lotsQuery = await callSAPServer(fullQuery)
    const result = [];

    const identifiers = await callSAPServer(queries.inventory.getLotIdentifiers)
    
    for (let i =0; i < lotsQuery.length; i++) {
        let obj = {}
        const lot = lotsQuery[i];
        obj.lot = lot
        const lotID = await identifiers.find(lotInfo => lotInfo.DistNumber === lot.BatchNumber)
        
        if (lotID) {
            console.log("MATCH", lotID, lot.BatchNumber)
            obj.lot.MnfSerial = lotID 
        }
    
        obj.reception = null
        obj.delivery = null
        obj.lineArticles = null
        if (lot.Direction === 0) {
            let receptionQuery = await callSAPServer(`${queries.reception.getReceptionByDocNum}${lot.BaseNum}`)
            obj.reception = receptionQuery[0]
            let lineArticlesQuery = await callSAPServer(`${queries.reception.getReceptionLineArticlesByDocEntry}${receptionQuery[0].DocEntry}`)
            obj.lineArticles = lineArticlesQuery
        }
        if (lot.Direction === 1) {
            let deliveryQuery = await callSAPServer(`${queries.delivery.getDeliveryByDocNum}${lot.BaseNum}`)
            obj.delivery = deliveryQuery[0]
            let lineArticlesQuery = await callSAPServer(`${queries.delivery.getDeliveryLineArticlesByDocEntry}${deliveryQuery[0].DocEntry}`)
            obj.lineArticles = lineArticlesQuery
        }
        result.push(obj)
    }
    return res.status(200).json({result: result})
})

inventoryRouter.get('/series', async (req, res) => {
    const seriesQuery = await callSAPServer(queries.inventory.getAllSerialNumber)
    const result = [];

    for (let i =0; i < seriesQuery.length; i++) {
        let obj = {}
        const lot = seriesQuery[i];
        obj.lot = lot
        obj.reception = null
        obj.delivery = null
        obj.lineArticles = null
        if (lot.Direction === 0) {
            let receptionQuery = await callSAPServer(`${queries.reception.getReceptionByDocNum}${lot.BaseNum}`)
            obj.reception = receptionQuery[0]
            let lineArticlesQuery = await callSAPServer(`${queries.reception.getReceptionLineArticlesByDocEntry}${receptionQuery[0].DocEntry}`)
            obj.lineArticles = lineArticlesQuery
        }
        if (lot.Direction === 1) {
            let deliveryQuery = await callSAPServer(`${queries.delivery.getDeliveryByDocNum}${lot.BaseNum}`)
            obj.delivery = deliveryQuery[0]
            let lineArticlesQuery = await callSAPServer(`${queries.delivery.getDeliveryLineArticlesByDocEntry}${deliveryQuery[0].DocEntry}`)
            obj.lineArticles = lineArticlesQuery
        }
        result.push(obj)
    }
    return res.status(200).json({message: result})
})

inventoryRouter.get('/series/client/:clientId', async (req, res) => {
    const { clientId } = req.params
    const fullQuery = `${queries.inventory.getAllSerialNumberClient} '${clientId}'` 
    const seriesQuery = await callSAPServer(fullQuery)
    const result = []

    for (let i =0; i < seriesQuery.length; i++) {
        let obj = {}
        const lot = seriesQuery[i];
        obj.lot = lot
        obj.reception = null
        obj.delivery = null
        obj.lineArticles = null
        if (lot.Direction === 0) {
            let receptionQuery = await callSAPServer(`${queries.reception.getReceptionByDocNum}${lot.BaseNum}`)
            obj.reception = receptionQuery[0]
            let lineArticlesQuery = await callSAPServer(`${queries.reception.getReceptionLineArticlesByDocEntry}${receptionQuery[0].DocEntry}`)
            obj.lineArticles = lineArticlesQuery
        }
        if (lot.Direction === 1) {
            let deliveryQuery = await callSAPServer(`${queries.delivery.getDeliveryByDocNum}${lot.BaseNum}`)
            obj.delivery = deliveryQuery[0]
            let lineArticlesQuery = await callSAPServer(`${queries.delivery.getDeliveryLineArticlesByDocEntry}${deliveryQuery[0].DocEntry}`)
            obj.lineArticles = lineArticlesQuery
        }
        result.push(obj)
    }
    return res.status(200).json({message: result})
})

module.exports = inventoryRouter;