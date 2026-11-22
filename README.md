# UnKool — Reference-matched customisation storefront

This Vite + React project follows the uploaded UnKool screenshot: dark announcement strip, compact white navigation, warm off-white/yellow/black hero, headline on the left, fashion model in the centre, and customiser on the right.

## Interactive customiser
- Product switcher: T-shirt, mug, cap, hoodie, keychain and bag
- Product colour swatches
- Upload artwork (JPG, PNG, WEBP)
- Add/edit custom text
- Font and print colour selection
- Live product mockup updates immediately as product, colour, text or artwork changes
- Starter text templates and reset
- Add-to-cart demo counter

## Run locally
Install Node.js LTS, extract this folder, open a terminal in this folder:
```bash
npm install
npm run dev
```
Vite will show a local URL (usually http://localhost:5173).

## Deploy to Vercel
1. Upload all project files to a GitHub repository.
2. In Vercel select Add New → Project and import the repository.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Select Deploy.

## Important before taking customer orders
This is a front-end prototype. The live mockup, upload, text and product selection work in the browser. Real cart persistence, customer accounts, checkout, payment gateway, order database, production-ready print placement, image storage, inventory, shipping and admin panel still need backend integration. The model image is a generated visual asset; replace with approved brand photography if desired.
