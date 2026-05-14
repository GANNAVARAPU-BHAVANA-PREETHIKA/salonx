# Vercel deployment readiness checklist (SalonX)

- [ ] Add Vercel config for SPA routing (handle /book/:id, /queue, etc.)
- [x] Fix env var handling for Vite on Vercel (use VITE_GEMINI_API_KEY + import.meta.env)
- [x] Remove bundler-time `define` that hardcodes API key / process.env usage

- [x] Update README with Vercel setup steps (env var name, build command)
- [x] Add vercel.json for SPA rewrites to /index.html
- [ ] Run `npm run build` locally to validate build succeeds

