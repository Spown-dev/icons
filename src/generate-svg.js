const fs = require("fs");
const path = require("path");

const svgDir = path.join(__dirname, "./svg");
const indexFile = path.join(svgDir, "index.js");

fs.readdir(svgDir, (err, files) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier des SVGs:", err);
    return;
  }

  const svgFiles = files.filter((file) => file.endsWith(".svg"));

  const imports = svgFiles
    .map((file) => {
      const name = path.basename(file, ".svg").replace(/[^a-zA-Z0-9_]/g, "_");
      return `import ${name} from './${file}';`;
    })
    .join("\n");

  const exports = svgFiles
    .map((file) => {
      const name = path.basename(file, ".svg").replace(/[^a-zA-Z0-9_]/g, "_");
      return `export { ${name} };`;
    })
    .join("\n");

  const content = `${imports}\n\n${exports}`;

  fs.writeFile(indexFile, content, (err) => {
    if (err) {
      console.error("Erreur lors de la génération de index.js:", err);
      return;
    }
    console.log("Fichier index.js généré avec succès!");
  });
});
