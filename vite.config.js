import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dynamicImport from "vite-plugin-dynamic-import";
import path from "path";
import fs from "fs";
import url from "url";
import svgr from "vite-plugin-svgr";

// Fonction pour obtenir le chemin du répertoire
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Lire le fichier de configuration des plugins
const pluginsConfigPath = path.resolve(__dirname, "public/plugins-config.json");
const pluginsConfig = JSON.parse(fs.readFileSync(pluginsConfigPath, "utf8"));

// Ajouter des alias pour les plugins
const aliases = {};
pluginsConfig.plugins.forEach((pluginName) => {
  const pluginPath = path.resolve(__dirname, "plugins", pluginName, "src");
  aliases[pluginName] = pluginPath;
});

export default defineConfig({
  plugins: [react(), dynamicImport(), svgr()],
  resolve: {
    alias: aliases,
    extensions: [".js", ".jsx"],
  },
});
