<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8046f56d-c250-4bbd-bb32-0b7e3688fe04

## Vercel deployment

1. Create a Vercel project from this repo.
2. Add an Environment Variable:
   - `VITE_GEMINI_API_KEY` = your Gemini API key
3. Build settings (defaults for Vite):
   - Build command: `npm run build`
   - Output directory: `dist`

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Create a local `.env.local` file with:
   - `VITE_GEMINI_API_KEY=...`
3. Run the app:
   `npm run dev`

