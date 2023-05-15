const readTemplateSingle = require('../helpers/general/readTemplateSingle');
const { createTxtFiles, createTxtFile } = require('../helpers/general/createTxtFile');
const runScript = require('../helpers/general/runScript');
const purchaseOrderRouter = require('express').Router();
const path = require('path');

purchaseOrderRouter.get('/getAll', (req, res) => {
  res.send('Hello World!');
});

purchaseOrderRouter.post('/create', async (req, res) => {
  const { articles, purchaseOrder } = req.body

  if (!articles || !purchaseOrder) {
    return res.status(403).json({success: false, message: "Please provide purchase order and articles"})
  }

  const purchaseOrderTemplate = await readTemplateSingle(path.join('helpers', 'templates', 'purchase_order', 'ordr.xlsx'));
  const articlesTemplate = await readTemplateSingle(path.join('helpers', 'templates', 'articles', 'rdr1.xlsx'));
  
  const purchaseOrderArr = await filteredResArr([purchaseOrder], purchaseOrderTemplate);  
  const articlesArr = await filteredResArr(articles, articlesTemplate);
  
  await createTxtFile(path.join('files', 'purchase_order', 'create', 'ordr.txt'), purchaseOrderArr);
  await createTxtFile(path.join('files', 'purchase_order', 'create', 'rdrd.txt'), articlesArr);

  runScript(path.join('executables', 'purchase_order', 'create', 'example.bat'))

  return res.status(200).json({message: "Here is the template"})
})

const filteredResArr = async (arr, template) => {

  let resultArr = [];
  const { firstRow, secondRow } = template.template
  
  resultArr.push(firstRow);
  resultArr.push(secondRow);

  const rowsArr =  await arr.map((obj) => {
    const entries = Object.entries(obj);
    const keys = Object.keys(obj);
    
    const result = [];
    for (let i = 0; i < firstRow.length; i++) {
      const keyFirstRow = firstRow[i];
      if (keys.includes(keyFirstRow)) {
        const entry = entries.find(entry => entry[0] === keyFirstRow);
        result.push(entry[1])
        continue
      }
      result.push("")
    }
    return result
  })

  rowsArr.forEach(row => {
    resultArr.push(row)
  });

  console.log(resultArr)
  
  return resultArr
}

purchaseOrderRouter.put('/create', async (req, res) => {
  const purchaseOrderTemplate = await readTemplateSingle('helpers/templates/purchase_order/ordr.xlsx');
  const articlesTemplate = await readTemplateSingle('helpers/templates/articles/rdr1.xlsx');
  
  

  return res.status(200).json({message: "Here is the template", data: articlesTemplate})
})



module.exports = purchaseOrderRouter;