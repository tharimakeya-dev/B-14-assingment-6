# FitLog — Workout Library

A dark, no-nonsense gym companion. Browse a library of twelve lifts, lock them
into today's plan, save others for later, and watch your session's work add
up — exercises, minutes, and calories update live as you go.

> Train with intent. Log every set.

## ✨ Features

1. **Workout library** — all twelve lifts fetched from the FitLog API and shown
   as responsive cards (3×4 on desktop) with image, category tags, equipment,
   and a duration / calories / rating stat row.
2. **Workout detail pages** — a two-column layout with a large visual, key-specs
   panel (equipment, difficulty, sets, reps, duration, calories, rating) and a
   numbered instructions list. Each library card links straight to its detail
   page.
3. **Today's Plan & Saved** — add a lift to today's plan or save it for later;
   the navbar **Plan** and **Saved** badges update live and both link to
   `/my-plan`. Today's plan is capped at five lifts.
4. **My Plan log page** — live metrics (exercises / minutes / calories), a
   Today's Plan / Saved tab switch, a loading state, per-card actions
   (View Details / Mark as Done / Remove), and a friendly empty state.
5. **Sort & search** — sort the library by duration, calories, or rating, and
   search lifts by name or muscle-group tag.
6. **Toast notifications** for every add / save / done / remove action, plus a
   custom 404 page and loading animations.
7. **Persistence** — your plan and saved lists survive reloads via
   `localStorage`.

## 🛠️ Technologies

- **Next.js** 
- **React 19**
- **Type Script**
- **Tailwind CSS** 
- **Oswald display font via `next/font`**
- **Fit Log API — data source**
- **Next.js App Router**
- **Context API**
- **Lucide React**
- **React Hot Toast**
- **Local Storage**

## 🔌 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## 🚀 Getting started

```bash
yarn install
yarn dev      # start the dev server at http://localhost:3000
yarn build    # production build
yarn start    # serve the production build
```

## 📁 Project structure

```
app/
  layout.tsx              # root layout: navbar, footer, toaster
  page.tsx                # home: hero + library section
  loading.tsx             # route-level loading animation
  not-found.tsx           # custom 404
  my-plan/page.tsx        # the plan/log page
  workout/[id]/page.tsx   # workout detail page (statically generated)
  components/             # Navbar, Footer, cards, toaster, icons, …
  lib/
    workouts.ts           # API data layer (getWorkouts / getWorkoutById)
    plan-store.tsx        # plan/saved store (localStorage-backed)
    toast.tsx             # toast store
```

## 📱 Responsive

Works across mobile, tablet, and desktop — the library grid collapses from
three columns to one, the hero stacks, and the navbar exposes a mobile menu.

## Submission Links
   **Live Link**:https://b-14-assingment-6.vercel.app/

 
  **GitHub Repository**:https://github.com/tharimakeya-dev/B14-A6

