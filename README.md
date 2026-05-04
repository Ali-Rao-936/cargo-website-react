<div align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=black" />

<br/><br/>

# 🚢 CargoPeak

### Full-Stack Logistics & Shipping Platform — UAE

A modern, production-ready logistics website built for a UAE-based cargo and shipping company. Features live customer ratings, email workflows, Google OAuth, shipment tracking, and dedicated country destination pages — all powered by React 19, TypeScript, and Supabase.

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛫 **Multi-Modal Services** | Air freight, sea freight (FCL/LCL), road cargo (GCC), door-to-door, packing & relocation, customs clearance, warehousing, express delivery, vehicle shipping, project logistics, e-commerce fulfillment |
| 🌍 **Country Destination Pages** | Dedicated routes for Saudi Arabia, Qatar, Oman, Kuwait, Bahrain, Iraq, Canada, and Russia |
| 📋 **Quote Request Form** | Validated form that emails a notification to the business and a confirmation to the customer via Resend |
| 📦 **Shipment Tracking** | Tracking UI with mock data — ready to wire to a real tracking API |
| ⭐ **Live Customer Ratings** | Supabase-backed star ratings with half-star display; live average shown on homepage |
| 🔐 **Authentication** | Google OAuth and email/password login via Supabase Auth |
| 💬 **WhatsApp Quick Contact** | Floating WhatsApp button for instant customer reach |
| 🎞️ **Scroll Animations** | Smooth scroll-triggered entrance animations powered by Motion |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 6, React Router v7 |
| **Styling** | Tailwind CSS v4, Lucide React icons |
| **Backend** | Express.js (Node), `tsx` for TypeScript execution |
| **Email** | [Resend](https://resend.com) |
| **Database & Auth** | [Supabase](https://supabase.com) |
| **Animation** | Motion (`motion/react`) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Resend](https://resend.com) account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cargopeak.git
cd cargopeak
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from resend.com |
| `FROM_EMAIL` | Verified sender address (`onboarding@resend.dev` works for testing) |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key |

### 4. Start the development server

```bash
npm run dev
```

This starts two processes concurrently:

- **Client** — Vite dev server at `http://localhost:3000`
- **Server** — Express API at `http://localhost:3001`

---

## 📜 Scripts

```bash
npm run dev        # Start client + server in development mode
npm run build      # Production build to dist/
npm run preview    # Preview the production build locally
npm run lint       # TypeScript type-check (tsc --noEmit)
npm run clean      # Delete dist/
```

---

## 📁 Project Structure

```
cargopeak/
├── src/
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, WhatsAppLink
│   │   └── ui/                # Button, Input, Textarea primitives
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── utils.ts           # cn() helper (clsx + tailwind-merge)
│   │   ├── quoteValidation.ts
│   │   └── contactValidation.ts
│   └── pages/
│       ├── Home.tsx
│       ├── Services.tsx
│       ├── CountryCargoPage.tsx
│       ├── Quote.tsx
│       ├── Tracking.tsx
│       ├── Contact.tsx
│       ├── Auth.tsx
│       ├── AddRating.tsx
│       └── AllRatings.tsx
│
└── server/
    ├── index.ts               # Express app — /api/quote and /api/contact
    └── emailTemplates.ts      # HTML email builders
```

---

## 🗺️ Routes

| Path | Page |
|---|---|
| `/` | Home — hero, services overview, stats, live ratings |
| `/services` | Services — full list, FAQ, destination links |
| `/services/cargo-to/:country` | Country-specific cargo page |
| `/quote` | Quote request form |
| `/tracking` | Shipment tracking |
| `/contact` | Contact form |
| `/auth` | Login / Sign up |
| `/ratings` | All customer reviews |
| `/ratings/add` | Submit a rating (authenticated users only) |

---

## 🎨 Brand Tokens

Defined in `src/index.css` via Tailwind's `@theme`:

| Token | Value | Preview |
|---|---|---|
| `brand-blue` | `#1e3a8a` | ![#1e3a8a](https://img.shields.io/badge/-%231e3a8a-1e3a8a?style=flat-square) |
| `brand-orange` | `#f97316` | ![#f97316](https://img.shields.io/badge/-%23f97316-f97316?style=flat-square) |
| `brand-light` | `#f8fafc` | ![#f8fafc](https://img.shields.io/badge/-%23f8fafc-f8fafc?style=flat-square) |

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **Ali Gul** — Dubai, UAE

</div>
