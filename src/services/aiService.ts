import { GoogleGenerativeAI } from '@google/generative-ai';

async function analyzeInBrowser(imageData: string, preferences: string) {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }

  const base64Data = imageData.split(',')[1] || imageData;
  const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
    model: 'gemini-2.0-flash',
  });

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
        mimeType: 'image/jpeg',
        data: base64Data,
      },
    },
  ]);

  const text = result.response.text();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Gemini returned an unexpected response.');
  }

  return JSON.parse(jsonMatch[0]);
}

export async function analyzeFaceAndRecommend(imageData: string, preferences: string) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageData, preferences }),
  });

  const responseText = await response.text();
  let data = null;
  try {
    data = responseText ? JSON.parse(responseText) : null;
  } catch {
    data = null;
  }
  if (response.status === 404 && (import.meta as any).env?.DEV) {
    return analyzeInBrowser(imageData, preferences);
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        `AI analysis request failed with status ${response.status}. Please try again.`
    );
  }

  if (
    !data?.faceShape ||
    !data?.features ||
    !Array.isArray(data?.recommendations)
  ) {
    throw new Error('AI analysis returned an invalid result. Please try again.');
  }

  return data;
}
