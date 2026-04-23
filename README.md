<div align="center">
<img width="1200" height="475" alt="CargoPeak Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# CargoPeak

**Fast & Reliable Cargo Services from the UAE**

A modern logistics company website with shipment tracking, instant quote requests, and multi-modal freight services.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white&style=flat-square)

</div>

---

## About

CargoPeak is a UAE-based logistics company website offering Air Freight, Sea Freight, Land Transport, and Door-to-Door Delivery services. The site is built around five pages — Home, Services, Quote, Tracking, and Contact — all wrapped in a persistent layout with a sticky navbar, footer, and a floating WhatsApp chat button for instant customer support.

The **Quote** page lets customers submit a shipment request with their details, route, and cargo specifications. The **Tracking** page provides a timeline-based shipment tracking UI. Both are frontend-ready and designed to be wired up to a backend or third-party logistics API.

## Features

- **Air, Sea, Land & Door-to-Door** freight service pages
- **Quote Request Form** — collects customer details, route, service type, and cargo weight
- **Shipment Tracking** — timeline UI showing pickup, processing, customs, and transit stages
- **Responsive Design** — mobile-first with animated hamburger nav
- **WhatsApp Integration** — floating chat button for instant customer contact
- **Smooth Animations** — powered by Framer Motion

## Tech Stack

| Tool | Version |
|------|---------|
| React | 19 |
| TypeScript | 5.8 |
| Vite | 6 |
| Tailwind CSS | 4 |
| React Router | 7 |
| Framer Motion | 12 |
| Lucide React | latest |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# 3. Start the dev server
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # TypeScript type check
```

## License

Apache 2.0
