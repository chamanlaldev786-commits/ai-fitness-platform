# AI Health & Fitness Platform

Designed & Developed by **Chaman Lal**

## Overview

A modern, AI‑inspired health dashboard that helps users track food intake, log workouts, visualize analytics, and get smart insights — all with a clean, responsive UI and smooth animations.

## Core Features

- Smart diet tracking (add meals, total/average calories)
- Exercise logging (add workouts, total/average duration)
- AI health insights (frontend simulation, helpful tips)
- Interactive charts (bar, line, pie)
- Global search and range filters on logs
- Mobile‑first, responsive, glassmorphism UI

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion
- Chart.js / Recharts

## Getting Started

Prerequisites: Node.js 18+

Install and run:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — run production build locally
- `npm run lint` — lint the project

## Project Structure

```
ai-fitness-platform/
├─ src/
│  ├─ app/                  # Pages (App Router)
│  ├─ components/           # UI, charts, layout
│  ├─ services/             # Data fetching, utilities
│  ├─ data/                 # Local JSON mock data
│  └─ utils/                # Mock API, helpers
├─ public/                  # Static assets
├─ next.config.mjs          # Next.js config
├─ package.json             # Scripts & deps
└─ README.md                # Documentation
```

## Key Routes

- `/` — Landing dashboard
- `/dashboard` — AI health summary
- `/dashboard/food-log` — Meals, calories, filters
- `/dashboard/exercise-log` — Workouts, duration, filters
- `/dashboard/ai-prediction` — AI tips, charts
- `/auth/login` and `/auth/signup` — Auth (mocked)
- `/counter` — Simple counter demo

## Data & Configuration

- Uses local JSON data in `src/data` (no backend required)
- No environment variables needed for local/dev
- Optimized images via `next/image` with Unsplash remote patterns

## Deployment (Vercel)

1. Push the repo to GitHub
2. Create a new Vercel project and select the repo
3. Build command: `npm run build`
4. Output directory: `.next`
5. Deploy and test key routes listed above

## Contact

Created by **Chaman Lal**

For collaboration or inquiries:

- Portfolio: add your link
- GitHub: add your link
- Email: add your email
