import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"

dotenv.config()

import connectDB from "./database/config/db"
import indexRoutes from "./routes/indexRoutes"
import { sendError } from "./helpers/apiResponse"

const port = Number(process.env.PORT)
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("dev"))

app.use("/api", indexRoutes);
// app.use("*", (req, res) => sendError(res, "Endpoint not found!", 404))

const connectServer = async () => {
    await connectDB()

    app.listen((port), () => {
        console.log(`App listening on PORT: ${port}`)
    })
}

connectServer()
