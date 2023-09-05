const queries = {
    orders: {
        getAllOrders: `select * from ORDR`,
        insertOrder: `INSERT INTO ORDR (DocNum) VALUES (2)`, 
        getOrder: `SELECT * FROM ORDR WHERE DocNum = 1`,
        getSeries: `SELECT * FROM NNM1`
    },
    articles: {
        getAllArticles: `select * from RDRI`, 
    },
    dropdowns: {
                getServicesAndContainers: `SELECT * FROM dbo.OITM WHERE ItemCode LIKE '%SER%' OR itemCode LIKE '%CON%';`
    },
    tables: {
        getTables: `select * from RDR1`, 
        getClientCodes: `SELECT CardCode, CardName FROM dbo.OCRD WHERE CardCode LIKE 'CL%';`,       
        getNaveria: `SELECT FldValue, Descr FROM dbo.UFD1 WHERE TableID LIKE '%ORDR%' AND FieldID = 11`,
        getRegimen: `SELECT FldValue, Descr FROM dbo.UFD1 WHERE TableID LIKE '%ORDR%' AND FieldID = 20`,
        getEstatus: `SELECT FldValue, Descr FROM dbo.UFD1 WHERE TableID LIKE '%ORDR%' AND FieldID = 27`,
        getIMO: `SELECT [Code],[Name] FROM [AMD_Entrenamiento].[dbo].[@IMO]`,
        getTransporte: `SELECT [Code],[Name] FROM [AMD_Entrenamiento].[dbo].[@TRANSPORTE]`,
        getPuertoOrigen: `SELECT [Code],[Name] FROM [AMD_Entrenamiento].[dbo].[@PUERTO_ORIGEN]`,
        getPuertoDestin: `SELECT [Code],[Name] FROM [AMD_Entrenamiento].[dbo].[@PUERTO_DESTINO]`,
        getClients: `SELECT * FROM dbo.OCRD WHERE CardCode LIKE 'CL%';`
    },
    inventory: {
        getAllLots: "SELECT * FROM dbo.IBT1;",
        getLotsPerClient: `SELECT * FROM dbo.IBT1 WHERE CardCode=`,
        getAllSerialNumber: "SELECT * FROM dbo.SRI1;",
        getAllSerialNumberClient: `SELECT * FROM dbo.SRI1 WHERE CardCode=`,
        getAllGeneral: `SELECT * FROM dbo.OITL`,
        getAllGeneralClient: `SELECT * FROM dbo.OITL WHERE CardCode=`,
    },
    reception: {
        getReceptionByDocNum: `SELECT U_ID_WMS, DocEntry FROM ORDN WHERE DocNum=`,
        getReceptionLineArticlesByDocEntry: `SELECT Direction,Quantity, ItemCode FROM dbo.IBT1 WHERE BaseNum=`
    }
};

module.exports = queries;