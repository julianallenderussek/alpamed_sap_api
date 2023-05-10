const sql = require('mssql')

const sqlConfig = {
  user: "sap",
  password: "S@p123",
  database: "AMD_Entrenamiento",
  server: "rfeamd.dyndns.org",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    //encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

const callSAPServer = async (query) => {
 console.log("CALLING SERVER");
try {
  // make sure that any items are correctly URL encoded in the connection string
  await sql.connect(sqlConfig)
  const result = await sql.query(query)
  console.log(result.recordset)
  
 } catch (err) {
  // ... error checks
  console.log("ERROR", err)
 }
}

queries = {
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
}

module.exports = callSAPServer