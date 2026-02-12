import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { ENV } from "./env";
import { resolveRuntimePath } from "./paths";
import fg from "fast-glob";

export const initializeDatabaseAndServer = async (sequelize: Sequelize) => {
  if (!ENV.UPDATE_MODEL) return; // evita sobrescrita se flag estiver habilitada

  try {

    const modelsDir = resolveRuntimePath("modules");
    const patterns = process.env.NODE_ENV === "production" ? ['**/*-model.js'] : ['**/*-model.js', '**/*-model.ts'];
    const files = fg.sync(patterns, { cwd: modelsDir, absolute: true });

    const db: Record<string, any> = { sequelize, Sequelize };
    for (const file of files) {
      if (file.endsWith(".d.ts")) continue;
      const mod = await import(file);
      const model = mod.default ?? mod;
      const modelName = file.replace(/-model\.(ts|js)$/, "");
      console.log(`[DB] Carregando model ${modelName} de ${path.basename(file)}...`);
      db[modelName] = model;
    }

    Object.values(db).forEach((m: any) => {
      if (m && typeof m.associate === "function") {
        m.associate(db);
      }
    });

    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida.");

    // Em produção: sem force/alter; em dev: alter opcional; em test: geralmente recria
    const syncOptions =
      ENV.NODE_ENV === "production"
        ? {}
        : ENV.NODE_ENV === "test"
          ? { force: true }
          : { alter: true };

    await sequelize.sync(syncOptions);
    console.log("Banco sincronizado.");
  } catch (err) {
    console.error("Erro ao inicializar DB:", err);
    throw err;
  }
};
