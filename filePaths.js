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
    reception: {
        bat: path.join(__dirname, 'executables', 'reception', 'create', 'create.bat'),
        batUpdate: path.join(__dirname, 'executables', 'reception', 'update', 'create.bat'),
        excel: path.join(__dirname, 'helpers', 'templates', 'reception', 'ordn.xlsx'),
        txt: path.join(__dirname, 'files', 'reception', 'create', 'ordn.txt'),
        txtupdate: path.join(__dirname, 'files', 'reception', 'update', 'ordn.txt'),
        batMaterialCreate: path.join(__dirname, 'executables', 'reception','material', 'create', 'create.bat'),
        batMaterialUpdate: path.join(__dirname, 'executables', 'reception', 'material','update', 'update.bat'),
        batLoadCreate: path.join(__dirname, 'executables', 'reception', 'load','create', 'create.bat'),
        batLoadUpdate: path.join(__dirname, 'executables', 'reception', 'load','update', 'update.bat'),
    },
    receptionArticles: {
        excel: path.join(__dirname, 'helpers', 'templates', 'receptionArticles', 'rdn1.xlsx'),
        txt: path.join(__dirname, 'files', 'reception', 'create', 'rdn1.txt'),
        txtupdate: path.join(__dirname, 'files', 'reception', 'update', 'rdn1.txt'),
    },
    delivery: {
        bat: path.join(__dirname, 'executables', 'delivery', 'create', 'create.bat'),
        batUpdate: path.join(__dirname, 'executables', 'delivery', 'update', 'create.bat'),
        excel: path.join(__dirname, 'helpers', 'templates', 'delivery', 'ordn.xlsx'),
        txt: path.join(__dirname, 'files', 'delivery', 'create', 'ordn.txt'),
        txtupdate: path.join(__dirname, 'files', 'delivery', 'update', 'ordn.txt'),
        batMaterialCreate: path.join(__dirname, 'executables', 'delivery','material', 'create', 'create.bat'),
        batMaterialUpdate: path.join(__dirname, 'executables', 'delivery', 'material','update', 'update.bat'),
        batLoadCreate: path.join(__dirname, 'executables', 'delivery', 'load','create', 'create.bat'),
        batLoadUpdate: path.join(__dirname, 'executables', 'delivery', 'load','update', 'update.bat'),
    },
    deliveryArticles: {
        excel: path.join(__dirname, 'helpers', 'templates', 'deliveryArticles', 'rdn1.xlsx'),
        txt: path.join(__dirname, 'files', 'delivery', 'create', 'rdn1.txt'),
        txtupdate: path.join(__dirname, 'files', 'delivery', 'update', 'rdn1.txt'),
    },
    batchInfo: {
        excel: path.join(__dirname, 'helpers', 'templates', 'batchInfo', 'btnt.xlsx'),
        txt: path.join(__dirname, 'files', 'reception', 'create', 'btnt.txt'),
        txtupdate: path.join(__dirname, 'files', 'reception', 'update', 'btnt.txt'),
        txtDelivery: path.join(__dirname, 'files', 'delivery', 'create', 'btnt.txt'),
        txtupdateDelivery: path.join(__dirname, 'files', 'delivery', 'update', 'btnt.txt'),
    },
    lotInfo: {
        excel: path.join(__dirname, 'helpers', 'templates', 'lotInfo', 'srnt.xlsx'),
        txt: path.join(__dirname, 'files', 'reception', 'create', 'srnt.txt'),
        txtupdate: path.join(__dirname, 'files', 'reception', 'update', 'srnt.txt'),
        txtDelivery: path.join(__dirname, 'files', 'delivery', 'create', 'srnt.txt'),
        txtupdateDelivery: path.join(__dirname, 'files', 'delivery', 'update', 'srnt.txt'),
    },
    ///
    logs: path.join(__dirname, 'info.log')
}
