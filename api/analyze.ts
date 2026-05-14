import { GoogleGenerativeAI } from '@google/generative-ai';

const jsonResponse = (res: any, status: number, body: unknown) => {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

const parseBody = (body: any) => {
  if (!body) return {};
  if (typeof body === 'string') return JSON.parse(body);
  return body;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return jsonResponse(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return jsonResponse(res, 500, {
      error: 'Gemini API key is not configured. Add GEMINI_API_KEY in Vercel.',
    });
  }

  try {
    const { imageData, preferences = '' } = parseBody(req.body);
    if (!imageData || typeof imageData !== 'string') {
      return jsonResponse(res, 400, { error: 'Image data is required.' });
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
      return jsonResponse(res, 502, {
        error: 'Gemini returned an unexpected response.',
      });
    }

    return jsonResponse(res, 200, JSON.parse(jsonMatch[0]));
  } catch (error) {
    console.error('AI Face Analysis Error:', error);
    return jsonResponse(res, 500, {
      error: 'AI analysis failed. Please try again.',
    });
  }
}
