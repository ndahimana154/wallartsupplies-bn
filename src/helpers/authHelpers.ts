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

export const generateToken = async (id: string) => {
    return jwt.sign({ id }, JWT_SECRET)
}

export const verifyToken = async (payload: string) => {
    return jwt.verify(payload, JWT_SECRET)
}

export const decodeToken = (token: string): any | null => {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }
        return jwt.verify(token, secret);
    } catch (error: any) {
        console.error("Token verification error:", error.message);
        return { status: 401, message: "Token verification failed" };
    }
};