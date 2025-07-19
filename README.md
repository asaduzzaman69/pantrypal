# 🍳 PantryPal

**Transform your leftover ingredients into delicious meals using AI.**

PantryPal is a smart, mobile-first recipe generator built with modern tools like Groq, Supabase, and Next.js 15.

![Demo](https://drive.google.com/file/d/1JvVYuCkcSyJ0Q5UjgQIqHOGqk2BAzK58/view?usp=sharing)

---

## 🚀 Features (In Progress)

- 📸 **Ingredient scanning** via camera (Google Vision)
- 🤖 **AI-powered recipe generation** (Groq)
- ⚡ **Smart suggestions** based on your cooking habits
- 🔄 **Multiple recipe variants** from the same ingredients
- 🧠 **Personalized preferences** + cooking streaks
- 🗂️ **Recipe history and ratings**
- 🔔 **Notifications** for expiring ingredients
- 🎯 **Fully responsive** mobile-first design

---

## 🛠 Tech Stack

| Frontend | Backend/Infra | AI & Integrations |
|----------|---------------|-------------------|
| Next.js 15 (App Router) | Supabase (Postgres, Auth) | Groq (Recipe generation) |
| TypeScript | Clerk (Authentication) | Google Vision API |
| Tailwind CSS | Upstash Redis (Caching) | Vercel (Deployment) |
| shadcn/ui | Vercel AI SDK | |

---

## 📦 Project Structure

```
pantrypal/
├── app/                # Pages via App Router
├── components/         # UI and custom components
├── lib/               # Client configs (db, auth, ai)
├── hooks/             # Custom React hooks
├── types/             # Shared TypeScript types
└── public/            # Static assets
```

---

## ⚙️ Local Development

### Prerequisites

- [pnpm](https://pnpm.io/) installed
- Node.js 18+
- Accounts on: Supabase, Clerk, and any AI/Image services you plan to use

### Setup

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.local.example .env.local
# Fill in your .env.local with the appropriate keys

# Start development server
pnpm dev
```

---

## 🧪 Development Standards

- ✅ **ESLint + Prettier** for clean code
- ✅ **Husky + lint-staged** for pre-commit safety
- ✅ **GitHub Actions** for lint/type/format CI
- ✅ **Typed with TypeScript**
- ✅ **Uses pnpm** for fast dependency management

---

## 🔐 Environment Variables

All secrets are stored in `.env.local`. Example keys:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# AI Provider
AI_API_KEY=

# Vision API (Optional)
VISION_API_KEY=
```

---

## 🛣️ Roadmap

PantryPal is currently under solo development. See [ROADMAP.md](ROADMAP.md) for full feature planning.

---

## 🙋‍♂️ About the Developer

Hi, I'm **Himel** — a solo developer building PantryPal to solve a simple everyday problem: figuring out what to cook with what I already have.

This is both a real-world tool and a place for me to explore full-stack development with modern tools.

---

## 🛡 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Made with 🧠, ☕, and love — PantryPal**

</div>