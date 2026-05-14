import { GoogleGenerativeAI } from "@google/generative-ai";

function getApiKeyOrWarn() {
  // Note: Vite exposes env vars on import.meta.env at build time.
  // Some TS configs require a type augmentation, so we access via (import.meta as any).
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn(
      'Missing VITE_GEMINI_API_KEY. AI Scan will not work on this deployment.'
    );
  }
  return apiKey || '';
}

export async function analyzeFaceAndRecommend(imageData: string, preferences: string) {
  try {
    const apiKey = getApiKeyOrWarn();
    if (!apiKey) return null;

    const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Remove metadata prefix if present (e.g. "data:image/jpeg;base64,")
    const base64Data = imageData.split(',')[1] || imageData;

    const prompt = `Analyze this person's face shape and features. Based on their face shape and these preferences: "${preferences}", suggest 3 luxury hairstyles. 
    Format your response as a valid JSON object with the following structure:
    {
      "faceShape": "string",
      "features": "string",
      "recommendations": [
        { "title": "string", "reasoning": "string" }
      ]
    }`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Attempt to extract JSON if it's wrapped in markdown
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return null;
  } catch (error) {
    console.error("AI Face Analysis Error:", error);
    return null;
  }
}
