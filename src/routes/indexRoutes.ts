import express from "express"
import userRoutes from "./userRoutes"

const indexRoutes = express.Router()

indexRoutes.use("/user", userRoutes);

export default indexRoutes