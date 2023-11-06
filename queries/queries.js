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
        getPuertoOrigen: `SELECT [Code] FROM [AMD_Entrenamiento].[dbo].[@PUERTO_ORIGEN]`,
        getPuertoDestin: `SELECT [Code] FROM [AMD_Entrenamiento].[dbo].[@PUERTO_DESTINO]`,
        getClients: `SELECT CardName,CardCode, Country, City, Currency, LicTradNum, Phone1, Phone2, MailZipCod, Address FROM dbo.OCRD`,
        getClientById: `SELECT CardName,CardCode, Country, City, Currency, LicTradNum, Phone1, Phone2, MailZipCod, Address FROM dbo.OCRD WHERE CardCode=`,
        location: 'SELECT WhsCode from dbo.OWHS'
    },
    inventory: {
        getAllLots: "SELECT * FROM dbo.IBT1;",
        getLotIdentifiers: "SELECT MnfSerial, DistNumber from OBTN",
        getLotsPerClient: `SELECT * FROM dbo.IBT1 WHERE CardCode=`,
        getAllSerialNumber: "SELECT * FROM dbo.SRI1;",
        getAllSerialNumberClient: `SELECT * FROM dbo.SRI1 WHERE CardCode=`,
        getAllGeneral: `SELECT * FROM dbo.OITL`,
        getAllGeneralClient: `SELECT * FROM dbo.OITL WHERE CardCode=`,
    },
    reception: {
        getReceptionByDocNum: `SELECT * FROM ORDN WHERE DocNum=`,
        getReceptionLineArticlesByDocEntry: `SELECT * FROM RDN1 WHERE DocEntry=`
    },
    delivery: {
        getDeliveryByDocNum: `SELECT * FROM ODLN WHERE DocNum=`,
        getDeliveryLineArticlesByDocEntry: `SELECT * FROM DLN1 WHERE DocEntry=`
    }
};

module.exports = queries;