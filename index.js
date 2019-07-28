
const WatchPack = require("watchpack");
const CodeGenerationCtx = require("./code-generation-ctx");

class JsCodeGeneration
{
  constructor(project_dir, gen_dir){
    this.project_dir = project_dir;
    this.gen_dir = gen_dir;
    this.generators = [];
    this.dependencies = [];
    this.watcher = new WatchPack({});
    this.watcher.on("aggregated", this.onFileChange.bind(this));
  }
  addGenerator(generate_cb){
    this.generators.push(generate_cb);
  }
  async onFileChange(changes, removals){
    await this.compile();
    this.watch();
  }
  async compile()
  {
    const ctx = new CodeGenerationCtx(this.project_dir, this.gen_dir);
    await Promise.all(this.generators.map(g => g(ctx)));
    this.dependencies = Array.from(ctx.dependencies.values());
  }
  watch(){
    this.watcher.watch(this.dependencies, []);
  }
}

module.exports = JsCodeGeneration;
