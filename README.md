# MYNKA — Video Production & Advertising Agency

Marketing site for MYNKA, built with Next.js. Features a scroll-reactive gradient
background that shifts through hot pink, violet, orange, and cyan palettes as you
move through the page.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel via GitHub

1. Create a new repository on GitHub and push this project:

   ```bash
   git remote add origin https://github.com/<your-username>/mynka-website.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and
   import the `mynka-website` repository.

3. Vercel auto-detects Next.js — no configuration needed. Click **Deploy**.

Every push to `main` will trigger a new production deployment automatically.

## Customizing

- **Copy & sections** — edit `app/page.tsx`
- **Colors & styling** — edit `app/globals.css` (brand colors are CSS variables at the top)
- **Scroll gradient palettes** — edit the `PALETTES` array in `components/GradientBackground.tsx`; each entry maps to one page section, in order
- **Contact email** — search for `hello@mynka.agency` in `app/page.tsx`
