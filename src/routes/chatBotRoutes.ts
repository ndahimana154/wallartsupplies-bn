import express from "express";
import chatBotController from "../controllers/chatBotController";

const chatBotRoutes = express.Router();

chatBotRoutes.post("/ask", chatBotController.sendChat);

export default chatBotRoutes;