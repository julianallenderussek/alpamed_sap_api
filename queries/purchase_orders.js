const sql = require('mssql')

async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=localhost,1433;Database=AMD_Entrenamiento;User Id=U0002;Password=S@p123;Encrypt=true')
        const result = await sql.query`select * from ORDR`
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
}