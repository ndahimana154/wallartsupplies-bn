import { Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ExtendedRequest } from "../types/Request";
import { sendError, sendSuccess } from "../helpers/apiResponse";
import productRepositories from "../repositories/productRepositories";

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const sendChat = async (req: ExtendedRequest, res: Response): Promise<any> => {
  const products = await productRepositories.findAllProducts();
  const storeData = {
    storeName: "Jinhua Hanjji Trading Company LTD",
    punchline:
      "Preserving memories, enhancing art, and telling stories through exceptional framing since 2015. Where craftsmanship meets creativity.",
    description:
      "Founded in a small studio in 2015,Jinhua Hanjji  Trading Company LTD began with a simple mission: to provide artists, photographers, and art lovers with framing solutions that truly honor their work. What started as a passion project between two art school graduates has grown into a trusted name in custom framing, serving clients nationwide while maintaining our commitment to handcrafted quality. Today, we continue to blend traditional framing techniques with innovative approaches, ensuring every piece we frame tells its story beautifully for generations to come.",
    products: products,
    contact: {
      phone: "+250 780 000 000",
      instagram: "@bonheur_arts",
      email: "info@bonheurarts.com",
    },
  };
  const { message } = req.body;
  const FRONTEND_URL = process.env.FRONTEND_URL;


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
- about company(who we are, what we do,ourt mission, our goal) and you refine them accourding to data yo have.
If query needs products, list products but also put link to the product details and order using its slug, product link ${FRONTEND_URL}/product-detail/slug make link of product product respectively.
If unsure, ask for more details.

Store Data:
${JSON.stringify(storeData)}
        `;

    const finalPrompt = `
${systemPrompt}

User: ${message}
        `;

    const result = await model.generateContent(finalPrompt);

    const reply =
      result.response.text() ?? "Sorry, I couldn't generate a response.";

    return sendSuccess(res, "Chat response generated successfully", { reply });
  } catch (error: any) {
    const msg = error?.message ?? String(error);
    const statusCode = msg.includes("403") ? 403 : 500;

    return sendError(
      res,
      process.env.NODE_ENV === "production"
        ? "Sorry, the AI service is unavailable."
        : `AI service error: ${msg}`,
      statusCode
    );
  }
};

export default {
  sendChat,
};
