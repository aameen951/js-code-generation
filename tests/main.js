const os = require('os');
const JsCodeGeneration = require("../index");
const path = require('path');

async function test(){
  const gen_dir = path.join(os.tmpdir(), "wooooooooooooooooow");
  console.log(gen_dir);
  const g = new JsCodeGeneration(__dirname, gen_dir);
  g.addGenerator(require('./generators/main'));
  await g.compile();
  await g.watch();
}
test();
