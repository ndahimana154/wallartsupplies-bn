import fs from "fs";
import path from "path";

const modelsPath = path.join(__dirname, "../models");

fs.readdirSync(modelsPath)
    .filter(file => file.endsWith(".ts") || file.endsWith(".js"))
    .forEach(file => {
        require(path.join(modelsPath, file));
    });

import connectDB, { sequelizeInstance } from "./db";

async function syncDatabase() {
    try {
        await connectDB()

        await sequelizeInstance.sync({ force: true });
        console.log("All models synchronized successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error syncing database:", error);
        process.exit(1);
    }
}

syncDatabase();
