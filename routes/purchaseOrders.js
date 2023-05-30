const readTemplateSingle = require('../helpers/general/readTemplateSingle');
const { createTxtFiles, createTxtFile } = require('../helpers/general/createTxtFile');
const runScript = require('../helpers/general/runScript');
const purchaseOrderRouter = require('express').Router();
const path = require('path');
const filePaths = require('../filePaths');

purchaseOrderRouter.get('/getAll', (req, res) => {
  res.send('Hello World!');
});

purchaseOrderRouter.post('/create', async (req, res) => {
  const { articles, purchaseOrder } = req.body

  if (!articles || !purchaseOrder) {
    return res.status(403).json({success: false, message: "Please provide purchase order and articles"})
  }

  const purchaseOrderTemplate = await readTemplateSingle(filePaths.purchaseOrder.excel);
  const articlesTemplate = await readTemplateSingle(filePaths.articles.excel);
  
  const purchaseOrderArr = await filteredResArr([purchaseOrder], purchaseOrderTemplate);  
  const articlesArr = await filteredResArr(articles, articlesTemplate);
  
  await createTxtFile(filePaths.purchaseOrder.txt, purchaseOrderArr);
  await createTxtFile(filePaths.articles.txt, articlesArr);

  runScript(filePaths.purchaseOrder.bat)
  .then((stdout) => {
    console.log('Output:', stdout);
    fs.unlink(filePaths.purchaseOrder.txt, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });
    return res.status(200).json({message: "Running DTW Sap", stdout: stdout})
  })
  .catch((error) => {
    console.error('Error:', error.message);
    return res.status(403).json({message: "Running DTW Sap", stdout: error.message})
  });
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
    for (let i = 0; i < secondRow.length; i++) {
      const keySecondRow = secondRow[i];
      if (keys.includes(keySecondRow)) {
        const entry = entries.find(entry => entry[0] === keySecondRow);
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

purchaseOrderRouter.put('/update', async (req, res) => {
  const purchaseOrderTemplate = await readTemplateSingle('helpers/templates/purchase_order/ordr.xlsx');
  const articlesTemplate = await readTemplateSingle('helpers/templates/articles/rdr1.xlsx');
  
  

  return res.status(200).json({message: "Here is the template", data: articlesTemplate})
})



module.exports = purchaseOrderRouter;