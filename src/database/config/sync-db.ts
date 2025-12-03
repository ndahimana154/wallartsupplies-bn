import { Categories, HeroAds, Products, Session, User, ProductViews } from "../models";
import CustomInquiries from "../models/CustomInquiries";
import connectDB from "./db";

/**
 * sync-db script
 * By default this performs a non-destructive sync using `alter: true` which
 * updates tables to match models (adds columns, changes types where safe).
 *
 * To force a destructive sync (drop & recreate tables) set the env var
 * `FORCE_SYNC=true` when running this script. Use destructive sync only in
 * development when you intentionally want to reset the database.
 */
async function syncDatabase() {
    const forceSync = String(process.env.FORCE_SYNC || "false").toLowerCase() === "true";
    try {
        await connectDB();
        console.log("Database connection established successfully!");

        if (forceSync) console.warn("WARNING: Running destructive sync (force: true) - this will DROP and recreate tables.");

        // Use `force` when destructive reset is explicitly requested, otherwise use `alter` to update schema.
        await User.sync({ force: forceSync, alter: !forceSync });
        await Categories.sync({ force: forceSync, alter: !forceSync });
        await Products.sync({ force: forceSync, alter: !forceSync });
        await ProductViews.sync({ force: forceSync, alter: !forceSync });
        await Session.sync({ force: forceSync, alter: !forceSync });
        await HeroAds.sync({ force: forceSync, alter: !forceSync });
        await CustomInquiries.sync({ force: forceSync, alter: !forceSync });

        console.log("All models synchronized successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error syncing database:", error);
        process.exit(1);
    }
}

syncDatabase();
