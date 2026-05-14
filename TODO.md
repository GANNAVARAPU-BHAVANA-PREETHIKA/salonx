# Vercel deployment readiness checklist (SalonX)

- [ ] Add Vercel config for SPA routing (handle /book/:id, /queue, etc.)
- [ ] Fix env var handling for Vite on Vercel (use VITE_GEMINI_API_KEY + import.meta.env)
- [ ] Remove bundler-time `define` that hardcodes API key / process.env usage
- [ ] Update README with Vercel setup steps (env var name, build command)
- [ ] Run `npm run build` locally to validate build succeeds

