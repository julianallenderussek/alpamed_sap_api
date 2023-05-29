const path = require("path");

module.exports = {
    testModeOn: true,
    text: {
        test: {
            purchaseOrder: path.join(__dirname, 'files', 'purchase_order', 'create', 'test', 'ordr.xml'),
            articles: path.join(__dirname, 'files', 'purchase_order', 'create', 'test', 'rdrd.xml')
        },
        production: {
            purchaseOrder: path.join(__dirname, 'files', 'purchase_order', 'create', 'ordr.txt'),
            articles: path.join(__dirname, 'files', 'purchase_order', 'create', 'rdrd.txt')
        }
    },
    xml: {
        test: {
            purchaseOrder: path.join(__dirname, 'files', 'purchase_order', 'create', 'test', 'ordr.xml'),
            articles: path.join(__dirname, 'files', 'purchase_order', 'create', 'test', 'rdrd.xml')
        },
        production: {
            purchaseOrder: path.join(__dirname, 'files', 'purchase_order', 'create', 'ordr.txt'),
            articles: path.join(__dirname, 'files', 'purchase_order', 'create', 'rdrd.txt')
        }
    },
    bat: {
        test: {
            purchaseOrder: path.join(__dirname, 'files', 'purchase_order', 'create', 'test', 'ordr.xml'),
            articles: path.join(__dirname, 'files', 'purchase_order', 'create', 'test', 'rdrd.xml')
        },
        production: {
            purchaseOrder: path.join(__dirname, 'files', 'purchase_order', 'create', 'ordr.txt'),
            articles: path.join(__dirname, 'files', 'purchase_order', 'create', 'rdrd.txt')
        }
    }
}