# Aksaa Portfolio

Cinematic personal portfolio for Aksaa, a computer science student focused on full-stack web development, Laravel backend systems, payment automation, learning platforms, and polished product interfaces.

This site is built as a single-scroll portfolio story. Each chapter highlights a practical project, the product problem behind it, and the engineering behavior it demonstrates.

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
- Motion-heavy frontend craft using Next.js, GSAP, ScrollTrigger, Lenis, and responsive visual composition.
- Recruiter-friendly internship positioning built around shipped project behavior, not generic profile filler.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis

## Project Structure

- `app/page.tsx` renders the single public portfolio route.
- `app/components/cinematic-experience.tsx` owns the scroll timeline and panel transitions.
- `app/components/cinematic/project-data.ts` stores screenshot and project copy data.
- `app/components/cinematic/panels.tsx` contains the portfolio panels.
- `app/components/cinematic/showcase-steps.tsx` contains reusable showcase screen layouts.
- `public/projects/` stores project screenshots used in the cinematic scenes.

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
