# FitLog — Workout Library

A dark, no-nonsense workout library built with Next.js and TypeScript. Browse 12 curated lifts, view detailed instructions, and build your daily plan — all with smooth UX and toast notifications.

## 🔗 Live Site

https://fit-log-rose.vercel.app/

## 🛠️ Technologies Used

- **Next.js 15** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS**
- **React-Toastify** — Toast notifications
- **Lucide React** — Icons
- **Context API** — Global state management
- **localStorage** — Data persistence

## ✨ Key Features

1. **Workout Library** — Browse 12 workouts in a responsive grid with images, muscle group tags, equipment info, and stats (duration, calories, rating).
2. **Detailed Workout Pages** — Dynamic routing shows full details: equipment, difficulty, sets, reps, instructions, and specs.
3. **Build Your Plan** — Add workouts to your today's plan or save for later with duplicate prevention and toast feedback.
4. **My Plan Dashboard** — Live metrics (exercises, minutes, calories), tab switching, sort dropdown (duration/calories/rating), mark as done, and remove functionality.
5. **Persistent State** — Plan and saved data persist across page reloads using localStorage.

## 🚀 Run Locally

```bash
npm install
npm run dev
