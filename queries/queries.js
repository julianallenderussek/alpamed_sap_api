const queries = {
    orders: {
        getAllOrders: `select * from ORDR`,
        getOrder: `SELECT * FROM ORDR WHERE DocNum = 24`,
        insertOrder: `INSERT INTO ORDR (DocNum) VALUES (2)`
    },
    articles: {
        getAllArticles: `select * from RDRI`, 
    },
    dropdowns: {
                getServicesAndContainers: `SELECT * FROM dbo.OITM WHERE ItemCode LIKE '%SER%' OR itemCode LIKE '%CON%';`
    },
    tables: {
        getTables: `select * from RDR1`, 
        getClientCodes: `SELECT CardCode, CardName FROM dbo.OCRD WHERE CardCode LIKE 'CL%';`
    }
};

module.exports = queries;