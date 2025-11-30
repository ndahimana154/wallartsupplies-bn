import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

async function test() {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateMessage({
            message: { content: "Hello from Gemini!" }
        });
        console.log(result.response[0].content[0].text);
    } catch (e) {
        console.error("ERROR:", e);
    }
}

test();
