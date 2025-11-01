import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = String(process.env.JWT_SECRET)

export const hashPassword = async (plain: string) => {
    return await bcrypt.hash(plain, 10)
}

export const comparePassword = async (plain: string, hash: string) => {
    return await bcrypt.compare(plain, hash)
}

export const generateToken = async (payload: string) => {
    return jwt.sign(payload, JWT_SECRET)
}