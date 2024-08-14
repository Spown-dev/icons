const fs = require("fs");
const path = require("path");

// Chemin du dossier contenant les fichiers SVG
const folderPath = "src/svg";

// Nouvelle balise <svg>
const newSvgTag = `<svg id="Calque_1" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">`;

// Fonction pour remplacer la balise <svg>
function replaceSvgTag(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Erreur lors de la lecture du fichier ${filePath}:`, err);
      return;
    }

    // Expression régulière pour trouver la balise <svg>
    const svgTagRegex = /<svg[^>]*>/;

    // Remplacement de la balise
    const updatedData = data.replace(svgTagRegex, newSvgTag);

    // Écriture du fichier mis à jour
    fs.writeFile(filePath, updatedData, "utf8", (err) => {
      if (err) {
        console.error(`Erreur lors de l'écriture du fichier ${filePath}:`, err);
      } else {
        console.log(`Fichier mis à jour: ${filePath}`);
      }
    });
  });
}

// Lire tous les fichiers SVG dans le dossier
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier:", err);
    return;
  }

  // Filtrer les fichiers pour ne traiter que les fichiers SVG
  const svgFiles = files.filter((file) => path.extname(file) === ".svg");

  // Remplacer la balise <svg> dans chaque fichier
  svgFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);
    replaceSvgTag(filePath);
  });
});
