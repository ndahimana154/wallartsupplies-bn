import { Categories, Products, Session, User } from "../models";
import connectDB, { sequelizeInstance } from "./db";

async function syncDatabase() {
    try {
        await connectDB();
        console.log("Database connection established successfully!");

        await User.sync({ force: true });
        await Categories.sync({ force: true });
        await Products.sync({ force: true });
        await Session.sync({ force: true });

        console.log("All models synchronized successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error syncing database:", error);
        process.exit(1);
    }
}

syncDatabase();
