import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"

import { connectDatabase } from "./db"

dotenv.config()


const port = Number(process.env.PORT)
const app = express()

app.use(express.json())
app.use(morgan("dev"))

const startServer = async () => {
    await connectDatabase()

    app.listen(port, () => {
        console.log("App listening on PORT port")
    })

}

startServer()