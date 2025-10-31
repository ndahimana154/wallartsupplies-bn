import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const db_host = String(process.env.DB_HOST || "")
const db_username = String(process.env.DB_USERNAME || "")
const db_password = String(process.env.DB_PASSWORD || "")
const db_name = String(process.env.DB_NAME || "")

const sequelize = new Sequelize(db_name, db_username, db_password, {
    host: db_host,
    dialect: "postgres"
})

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB Connected!")
    } catch (error) {
        console.error("Unnable to connect to the database", error)
    }
}

export default connectDB