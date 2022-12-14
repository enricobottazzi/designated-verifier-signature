const fs = require('fs');
const snarkjs = require('snarkjs')

async function verifyProof(paths) {
// declare the data variable and initialize it to an empty object
let proof = await readFileData(`${paths.pathToProof}`);
let publicSignals = await readFileData(`${paths.pathToPublic}`);
let vkey = await readFileData(`${paths.pathToArtifacts}/vkey.json`);

const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);

if (res === true) {
  console.log("Verification OK");
  // add a call to process.exit() to terminate the program
  process.exit();
} else {
  console.log("Invalid proof");
  // add a call to process.exit() to terminate the program
  process.exit();
}
}

async function readFileData(path) {
    // declare the data variable and initialize it to an empty object
    let data = {};
  
    try {
      // read the file using fs.readFile() and wait for it to complete
      const fileData = await fs.promises.readFile(path);
  
      // fileData is a Buffer, so we need to convert it to a string before parsing it as JSON
      data = JSON.parse(fileData.toString());
    } catch (err) {
      throw err;
    }
  
    return data;
  }

module.exports = verifyProof