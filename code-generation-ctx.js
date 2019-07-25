const fs = require("./lib/promise-fs");
const path = require("path");

class CodeGenerationCtx
{
  constructor(project_dir, gen_dir){
    this.project_dir = project_dir;
    this.output_dir = gen_dir;

    this.dependencies = new Set();
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
    const to = path.resolve(this.project_dir, rel_path);
    const from = path.resolve(this.project_dir, rel_from);
    return path.relative(from, to).replace(/\\/g, '/');
  }
  async generateCode(rel_path, data)
  {
    console.log("Generating", rel_path);
    const output_path = this.getGenOutputPath(rel_path);
    await fs.writeFile(output_path, data);
  }
  addDependency(rel_path)
  {
    this.dependencies.add(path.resolve(this.project_dir, rel_path));
  }
}

module.exports = CodeGenerationCtx;