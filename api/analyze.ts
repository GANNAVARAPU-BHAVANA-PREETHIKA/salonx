import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
  maxDuration: 30,
};

const jsonResponse = (res: any, status: number, body: unknown) => {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

const parseBody = (body: any) => {
  if (!body) return {};
  if (typeof body === 'string') return JSON.parse(body);
  return body;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Unknown Gemini API error.';
};

export default async function handler(req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (req.method === 'GET') {
    return jsonResponse(res, 200, {
      ok: true,
      keyConfigured: Boolean(apiKey),
      model: 'gemini-2.0-flash',
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return jsonResponse(res, 405, { error: 'Method not allowed' });
  }

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
    if (base64Data.length > 3_500_000) {
      return jsonResponse(res, 413, {
        error: 'Captured image is too large. Please retake the scan and try again.',
      });
    }

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
    const message = getErrorMessage(error);
    console.error('AI Face Analysis Error:', message);
    return jsonResponse(res, 500, {
      error: `AI analysis failed: ${message}`,
    });
  }
}
