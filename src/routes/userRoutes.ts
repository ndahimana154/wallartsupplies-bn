import express from "express"

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
    return res.status(200).json({
        status: 200,
        message: "Welcome to the Wall Art Supplies"
    })
})

export default userRoutes