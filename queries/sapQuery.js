const sql = require('mssql')

const sqlConfig = {
  user: "sap",
  password: "S@p123",
  database: "AMD",
  server: "localhost",
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

  try {
    await sql.connect(sqlConfig)
    console.log("Calling SAP")
    // make sure that any items are correctly URL encoded in the connection string
    const result = await sql.query(query)
    console.log("returned rom sap");
    return result.recordset
  } catch (err) {
    // ... error checks
    console.log("ERROR", err)
  }
}

queries = {
  orders: {
    getAllOrders: `select * from ORDR`,
    getOrder: `SELECT * FROM ORDR WHERE DocNum = 2`,
    insertOrder: `INSERT INTO ORDR (DocNum) VALUES (2)`
  },
  articles: {
    getAllArticles: `select * from RDRI`,
  },
  tables: {
    getTables: `select * from RDRI`,
  }
}

// Comment

module.exports = callSAPServer
