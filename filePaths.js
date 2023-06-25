const path = require("path");

module.exports = {
    testModeOn: true,
    test: {
        bat: path.join(__dirname, 'executables', 'purchase_order', 'test', 'test.bat'),
        exampleHome: path.join(__dirname, 'example.txt'),
    },
    /// PURCHASE ORDER
    purchaseOrder: {
        bat: path.join(__dirname, 'executables', 'purchase_order', 'create', 'create.bat'),
        batUpdate: path.join(__dirname, 'executables', 'purchase_order', 'update', 'update.bat'),
        xml: path.join(__dirname, 'executables', 'purchase_order', 'create', 'create.xml'),
        xmlUpdate: path.join(__dirname, 'executables', 'purchase_order', 'update', 'update.xml'),
        txt: path.join(__dirname, 'files', 'purchase_order', 'create', 'ordr.txt'),
        txtupdate: path.join(__dirname, 'files', 'purchase_order', 'update', 'ordr.txt'),
        excel: path.join(__dirname, 'helpers', 'templates', 'purchase_order', 'ordr.xlsx'),
    },
    articles: {
        txt: path.join(__dirname, 'files', 'purchase_order', 'create', 'rdrd.txt'),
        txtupdate: path.join(__dirname, 'files', 'purchase_order', 'update', 'rdrd.txt'),
        excel: path.join(__dirname, 'helpers', 'templates', 'articles', 'rdr1.xlsx')
    },
    ///
    /// RECEPTION
    recepction: {
        excel: path.join(__dirname, 'files', 'purchase_order', 'create', 'rdrd.txt'),
    },
    recepctionArticles: {
        excel: path.join(__dirname, 'files', 'purchase_order', 'create', 'rdrd.txt'),
    },
    batchInfo: {
        excel: path.join(__dirname, 'files', 'purchase_order', 'create', 'rdrd.txt'),
    },
    lotInfo: {
        excel: path.join(__dirname, 'files', 'purchase_order', 'create', 'rdrd.txt'),
    },

    ///
    logs: path.join(__dirname, 'info.log')
}
