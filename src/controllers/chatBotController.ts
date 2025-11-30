import { Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ExtendedRequest } from "../types/Request";
import { sendError, sendSuccess } from "../helpers/apiResponse";

const storeData = {
    storeName: "Bonheur Arts",
    description: "A Rwandan digital art & frame design store offering custom wall designs, frames, posters, and canvas prints.",
    products: [
        {
            id: 1,
            name: "Black Modern Frame",
            price: "25,000 RWF",
            size: "A4 / A3",
            description: "Sleek black frame perfect for modern home decor."
        },
        {
            id: 2,
            name: "Wooden Brown Frame",
            price: "35,000 RWF",
            size: "A4 / A3 / A2",
            description: "Handcrafted wooden frame for warm & natural design style."
        },
        {
            id: 3,
            name: "Custom Poster Design",
            price: "50,000 RWF",
            size: "A3 / A2",
            description: "Fully customized digital poster based on customer request."
        }
    ],
    shipping: {
        Kigali: "2,000 RWF",
        OutsideKigali: "5,000 RWF"
    },
    contact: {
        phone: "+250 780 000 000",
        instagram: "@bonheur_arts",
        email: "info@bonheurarts.com"
    }
};

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const sendChat = async (req: ExtendedRequest, res: Response): Promise<any> => {
    const { message } = req.body;

    try {
        const systemPrompt = `
You are an AI assistant for ${storeData.storeName}.
Speak politely and clearly.
Help customers with:
- product details
- prices
- sizes
- shipping
- recommendations
- custom orders

If unsure, ask for more details.

Store Data:
${JSON.stringify(storeData)}
        `;

        const finalPrompt = `
${systemPrompt}

User: ${message}
        `;

        const result = await model.generateContent(finalPrompt);

        const reply = result.response.text() ?? "Sorry, I couldn't generate a response.";

        return sendSuccess(res, "Chat response generated successfully", { reply });

    } catch (error: any) {
        const msg = error?.message ?? String(error);
        const statusCode = msg.includes("403") ? 403 : 500;

        return sendError(res,
            process.env.NODE_ENV === "production"
                ? "Sorry, the AI service is unavailable."
                : `AI service error: ${msg}`,
            statusCode
        );
    }
};

export default {
    sendChat
};
