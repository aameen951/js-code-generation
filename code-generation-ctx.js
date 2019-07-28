const fs = require("promise-fs");
const path = require("path");

class CodeGenerationCtx
{
  constructor(project_dir, gen_dir){
    this.project_dir = project_dir;
    this.output_dir = gen_dir;

    this.dependencies = new Set();
    fs.ensureDirExists(this.output_dir);
  }
  getGenOutputPath(rel_path)
  {
    return path.resolve(this.output_dir, rel_path).replace(/\\/g, '/');
  }
  importPathFromOutput(rel_path)
  {
    return this.importPath(rel_path, this.output_dir);
  }
  importPath(rel_path, rel_from)
  {
    const to = this.resolveRelPath(rel_path);
    const from = this.resolveRelPath(rel_from);
    return path.relative(from, to).replace(/\\/g, '/');
  }
  resolveRelPath(rel_path){
    return path.resolve(this.project_dir, rel_path);
  }
  async generateCode(rel_path, data)
  {
    console.log("Generating", rel_path);
    const output_path = this.getGenOutputPath(rel_path);
    await fs.writeFile(output_path, data);
  }
  async readDependency(rel_path, options)
  {
    this.addDependency(rel_path);
    const p = this.resolveRelPath(rel_path);
    return await fs.readFile(p, options);
  }
  addDependency(rel_path)
  {
    this.dependencies.add(this.resolveRelPath(rel_path));
  }
}

module.exports = CodeGenerationCtx;