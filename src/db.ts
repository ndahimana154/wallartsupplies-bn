import { PrisimaClient } from "../generated/prisma"
import { withAccelerate } from "@prisma/extension-accelerate"

export const prisma = new PrisimaClient().$extends(withAccelerate)

export const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("✅✅✅ Connected to database successfully!")
    } catch (error) {
        console.error("❌❌❌ Error connecting to the database")
    }
}