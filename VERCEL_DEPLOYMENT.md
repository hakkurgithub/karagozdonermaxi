# Vercel Deployment Guide

This document explains how to properly deploy this application to Vercel.

## Configuration

### vercel.json
The `vercel.json` file is configured to properly serve a Vite-based React SPA:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/((?!assets|logo\\.svg|logo\\.jpg|logo\\.png|.*\\.).*)",
      "destination": "/index.html"
    }
  ]
}
```

**Key Points:**
- `outputDirectory: "dist"` - Must match the Vite build output directory
- `rewrites` - Uses regex to exclude static assets and files with extensions from SPA routing
- The regex pattern `((?!assets|logo\\.svg|logo\\.jpg|logo\\.png|.*\\.).*)` matches routes that:
  - Do NOT start with `assets/`
  - Are NOT `logo.svg`, `logo.jpg`, or `logo.png`
  - Do NOT contain a file extension (indicated by a dot)

### vite.config.ts
The Vite configuration is set up for root deployment:

```typescript
{
  base: '/',           // Root path deployment
  outDir: 'dist',      // Output directory (must match vercel.json)
  assetsDir: 'assets'  // Assets subdirectory
}
```

## Deployment Steps

1. **Ensure clean build:**
   ```bash
   npm run build
   ```

2. **Verify Vercel settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: `vite`

3. **Clear Vercel cache if needed:**
   - Go to Vercel Dashboard → Your Project → Settings → General
   - Scroll to "Cache" section
   - Click "Clear Cache"

4. **Deploy:**
   - Commit and push changes to trigger deployment
   - Or use Vercel CLI: `vercel --prod`

## Troubleshooting

### Blank Screen / MIME Type Errors
If you see a blank screen or MIME type errors like "text/html instead of text/javascript":

1. Verify `vercel.json` has the correct `rewrites` configuration (not old `routes`)
2. Ensure `outputDirectory` is set to `dist`
3. Clear Vercel deployment cache
4. Redeploy

### Assets Not Loading
1. Check that files are in `dist/assets/` after build
2. Verify `vite.config.ts` has `assetsDir: 'assets'`
3. Ensure `base: '/'` in vite config

### 404 on Refresh
This means the rewrites are not working:
1. Verify `vercel.json` exists in root directory
2. Check the rewrite pattern in `vercel.json`
3. Redeploy after changes

## Testing Locally

Before deploying, test the build locally:

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Test that assets are served correctly
curl -I http://localhost:4173/assets/index-*.js
# Should return: Content-Type: text/javascript

# Test that unknown routes return index.html
curl -I http://localhost:4173/some-random-route
# Should return: Content-Type: text/html
```

## File Structure

After build, the `dist/` directory should look like:

```
dist/
├── index.html
├── logo.jpg
├── logo.svg
└── assets/
    ├── index-[hash].js
    ├── index-[hash].js.map
    ├── index-[hash].css
    ├── vendor-[hash].js
    └── vendor-[hash].js.map
```
