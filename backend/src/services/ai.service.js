// src/services/ai.service.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import ApiError from "../utils/ApiError.js";

const getGeminiClient = () => {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    throw new ApiError(500, "GEMINI_API_KEY is missing");
  }

  return new GoogleGenerativeAI(key);
};

const extractJsonFromText = (text) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new ApiError(500, "Gemini did not return JSON");
  }

  const jsonString = text.slice(start, end + 1);

  try {
    return JSON.parse(jsonString);
  } catch {
    throw new ApiError(500, "Invalid JSON from Gemini");
  }
};

export const analyzeReviewsWithAI = async (reviews = []) => {
  if (!reviews.length) {
    return {
      summary: "Insufficient audience reviews available.",
      sentiment: "mixed",
    };
  }

  const genAI = getGeminiClient();

  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"];
  let lastError = null;

  const prompt = `
You are analyzing audience reviews of a movie.

1. Provide a concise 4-5 sentence summary of overall audience opinion.
2. Classify overall sentiment strictly as one of:
   - positive
   - mixed
   - negative

Return ONLY valid JSON:
{
  "summary": "...",
  "sentiment": "positive | mixed | negative"
}

Reviews:
${reviews.slice(0, 8).join("\n\n")}
`;

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const result = await model.generateContent(prompt);
      const text = result?.response?.text?.() || "";

      if (!text) throw new Error("Empty Gemini response");

      const parsed = extractJsonFromText(text);

      if (!["positive", "mixed", "negative"].includes(parsed.sentiment)) {
        parsed.sentiment = "mixed";
      }

      return parsed;
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw new ApiError(
    500,
    lastError?.message || "Gemini models failed"
  );
};