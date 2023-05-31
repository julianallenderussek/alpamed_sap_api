const path = require("path");

module.exports = {
    testModeOn: true,
    test: {
        bat: path.join(__dirname, 'executables', 'purchase_order', 'test', 'test.bat'),
        exampleHome: path.join(__dirname, 'example.txt'),
    },
    purchaseOrder: {
        bat: path.join(__dirname, 'executables', 'purchase_order', 'create', 'create.bat'),
        xml: path.join(__dirname, 'executables', 'purchase_order', 'create', 'create.xml'),
        txt: path.join(__dirname, 'files', 'purchase_order', 'create', 'ordr.txt'),
        excel: path.join(__dirname, 'helpers', 'templates', 'purchase_order', 'ordr.xlsx'),
    },
    articles: {
        txt: path.join(__dirname, 'files', 'purchase_order', 'create', 'rdrd.txt'),
        excel: path.join(__dirname, 'helpers', 'templates', 'articles', 'rdr1.xlsx')
    },
    logs: path.join(__dirname, 'info.log')
}
