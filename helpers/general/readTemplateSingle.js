const ExcelJS = require('exceljs');
const fs = require("fs");

const readTemplateSingle = async (filePath) => {
    let wb = new ExcelJS.Workbook();
    
    const result = wb.xlsx.readFile(filePath).then( async () => {
    const ws = await wb.getWorksheet("Sheet1");
    
    let firstRow = ws.getRow(1).values;
    let secondRow = ws.getRow(2).values;

    firstRow.shift()
    secondRow.shift()

    const templateSchema = {
        template: {
            firstRow: firstRow,
            secondRow: secondRow,
        }
    }

    return templateSchema 
  })
  return result
}

module.exports = readTemplateSingle