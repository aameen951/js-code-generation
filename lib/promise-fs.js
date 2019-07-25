const fs = require("fs");

function writeFile(file, data, options)
{
  return new Promise((resolve, reject)=>{
    fs.writeFile(file, data, options, (err) => {
      if(err)reject(err);
      else resolve();
    });
  });
}

module.exports = {
  writeFile,
};
