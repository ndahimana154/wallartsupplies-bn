import express from "express"
import dotenv from "dotenv"

dotenv.config()

import connectDB from "./db"

const port = Number(process.env.PORT)
const app = express()

const connectServer = async () => {
    await connectDB()

    app.listen((port), () => {
        console.log(`App listening on PORT: ${port}`)
    })
}

connectServer()
