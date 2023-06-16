const fs = require('fs')

// const createTxtFile = async (outputFilePath, textArr) => {
//     let text = "";

//     const transverseArr = (arr) => {
//       for (let i = 0; i < arr.length; i++) {
//         if (i === arr.length - 1) {
//           text += arr[i] + "\n";
//           break;
//         }
//         text += arr[i] + "\t";
//       }
//     };
  
//     for (let i = 0; i < textArr.length; i++) {
       
//       if (Array.isArray(textArr[i])) {
//         transverseArr(textArr[i])
//       }
//     }
  
//     await fs.writeFile(outputFilePath, text, (err) => {
//       if (err) {
//         console.error(err);
//         return false;
//       }
//       return true
//     });
// }

const createTxtFile = async (outputFilePath, textArr) => {
  const text = textArr.map(row => row.join('\t')).join('\n');

  fs.writeFile(outputFilePath, text, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File ${outputFilePath} written successfully.`);
    }
  });
}

module.exports = {
    createTxtFile
}