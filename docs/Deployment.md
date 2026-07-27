# Deployment Guide

SquadPlay is built with **Vite** and designed to be effortlessly hosted on any static web server (Vercel, Netlify, GitHub Pages, AWS S3). Because it relies on zero backend architecture, scaling is infinite and hosting is practically free.

## Progressive Web App (PWA) Configuration

SquadPlay uses `vite-plugin-pwa` to generate a powerful Service Worker (`sw.js`). This service worker aggressively caches HTML, CSS, JavaScript, and static JSON datasets (Trivia, Charades) the very first time a user visits the site.

### Verifying the Production Build Locally

Always verify the service worker and production bundle locally before deploying.

```bash
# 1. Generate the production artifacts in /dist
npm run build

# 2. Preview the production build via Vite
npm run preview
```

Open your browser's DevTools -> Application -> Service Workers, and verify that the worker is successfully registered and precaching the assets.

## Deploying to Vercel (Recommended)

Vercel offers the simplest out-of-the-box hosting for Vite applications.

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the Vite framework.
3. Keep the default Build Command (`npm run build`) and Output Directory (`dist`).
4. Click **Deploy**.

*Vercel will handle automatic SSL, global CDN distribution, and cache invalidation headers.*

## Deploying to GitHub Pages

If deploying to GitHub Pages, you must ensure that your base URL is configured properly in `vite.config.js`.

1. Open `vite.config.js`.
2. Add `base: '/squadplay/'` (or your repository name) to the configuration object.
3. Re-run `npm run build`.
4. Deploy the contents of the `/dist` folder to your `gh-pages` branch.

**Warning for PWA on GH Pages:** Ensure that your `manifest.json` asset links are also prefixed with the proper base URL, or the browser will fail to fetch the PWA icons and prompt the installation dialog.
