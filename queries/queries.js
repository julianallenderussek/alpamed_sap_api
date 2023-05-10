const queries = {
    orders: {
        getAllOrders: `select * from ORDR`,
        insertOrder: `INSERT INTO ORDR (DocNum) VALUES (2)` 
    },
    articles: {
        getAllArticles: `select * from RDRI`, 
    },
    tables: {
        getTables: `select * from RDRI`, 
    }
};

module.exports = queries;