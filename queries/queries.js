const queries = {
    orders: {
        getAllOrders: `select * from ORDR`,
        insertOrder: `INSERT INTO ORDR (DocNum) VALUES (2)` 
    },
    articles: {
        getAllArticles: `select * from RDRI`, 
    },
    dropdowns: {
        getServicesAndContainers: `SELECT * FROM dbo.OITM WHERE ItemCode LIKE '%SER%' OR itemCode LIKE '%CON%';`
    },
    tables: {
        getTables: `select * from RDRI`, 
    }
};

module.exports = queries;