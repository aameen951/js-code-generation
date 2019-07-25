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
function mkdir(path, options)
{
  return new Promise((resolve, reject)=>{
    fs.mkdir(path, options, (err) => {
      if(err)reject(err);
      else resolve();
    });
  });
}
async function ensureDirExists(path, options)
{
  try
  {
    await mkdir(path, options);
  }
  catch(e)
  {
    if(e.code !== 'EEXIST') 
      throw e;
  }
}

module.exports = {
  writeFile,
  mkdir,
  ensureDirExists,
};
