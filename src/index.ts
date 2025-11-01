import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"

dotenv.config()

import connectDB from "./database/config/db"
import indexRoutes from "./routes/indexRoutes"

const port = Number(process.env.PORT)
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("dev"))

app.use("/api", indexRoutes);

const connectServer = async () => {
    await connectDB()

    app.listen((port), () => {
        console.log(`App listening on PORT: ${port}`)
    })
}

connectServer()
