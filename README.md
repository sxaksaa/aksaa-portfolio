# Aksaa Portfolio

Cinematic personal portfolio for Aksaa, a computer science student focused on full-stack web development, Laravel backend systems, payment automation, learning platforms, and polished product interfaces.

This site is built as a focused portfolio page. Each project highlights the product problem behind it, the implementation work, and a polished laptop preview of the final interface.

## Featured Work

**Aksa Xiterz**  
Digital-products storefront with QRIS checkout, direct USDT payment flow, order automation, package stock rules, license delivery, and support-oriented guide pages.

**EduVest**  
Finance education platform for saham, crypto, and personal finance learning. The showcase focuses on video course playlists, learning progress, profile activity, FAQ content, and a premium dark-purple interface.

**BRL Fashion**  
Ecommerce storefront and admin workflow with catalog structure, product-size logic, checkout flow, customer-facing content, and public portfolio polish.

## What This Portfolio Shows

- Full-stack product thinking across frontend, backend, database, and operational flows.
- Laravel-oriented backend logic for payments, orders, roles, learning progress, stock, and history records.
- Frontend craft using Next.js, React, Tailwind CSS, responsive visual composition, and scroll reveal details.
- Recruiter-friendly internship positioning built around shipped project behavior, not generic profile filler.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react

## Project Structure

- `app/page.tsx` renders the single public portfolio route.
- `app/components/cinematic-experience.tsx` owns the portfolio content, project cases, and preview images.
- `app/components/scroll-reveal.tsx` handles reveal-on-scroll behavior.
- `public/portfolio-deck/` stores the three project preview images.
- `public/documents/` stores the downloadable CV.

## Local Development

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Production Check

```bash
npm run lint
npm run build
```
