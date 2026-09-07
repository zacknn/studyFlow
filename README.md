# StudyFlow

StudyFlow is a full-stack learning platform built for students who want a faster, smarter way to discover useful study resources, turn documents into actionable knowledge, and learn with AI support.

This is the v1 release: a working product that brings together community-driven study content, AI-powered document assistance, and a polished student experience in one place.

---

## Why StudyFlow

Students often have to jump between scattered resources: notes, PDFs, links, tutorials, and chatbots. StudyFlow brings that workflow into one place.

With StudyFlow, students can:
- upload and share study material
- browse public resources from other learners
- turn documents into summaries and quizzes
- ask AI questions about a specific post
- practice with a voice-enabled AI tutor

---

## V1 Highlights

### Core product experience
- modern landing page and marketing experience
- secure auth flow with email/password and GitHub OAuth
- user-created posts with titles, descriptions, tags, and visibility settings
- file and link attachments for rich study resources
- public browse experience for discovering content

### AI-powered learning tools
- document summaries generated from uploaded files
- quiz generation based on post content
- AI chat tied to the material in a post
- standalone AI tutor for general study assistance
- voice teaching experience using Vapi for real-time tutoring

### Technical foundation
- Next.js app with App Router
- Prisma + PostgreSQL data layer
- oRPC for type-safe API contracts
- upload pipeline for documents and media
- responsive UI with Tailwind and reusable component system

---

## Features

### Student posts
- create study posts with file attachments
- add relevant links and references
- organize content with labels and tags
- publish publicly or keep private
- track views and engagement

### Authentication
- email/password sign up and login
- GitHub OAuth support
- protected routes and session handling

### AI tools per post
- Summary: extract useful insights from uploaded documents
- Quiz: create practice questions from course material
- Chat: ask questions grounded in the uploaded post content

### AI Tutor
- general conversation-based study assistant
- persistent history for a more useful learning workflow
- works without a post as a freeform academic helper

### Voice teacher
- real conversational tutoring experience
- AI can reference uploaded material before and during the session
- first-class voice learning workflow for revision and active recall

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- Tailwind CSS
- shadcn-style UI primitives
- next-themes for dark/light mode

### Backend
- oRPC
- Prisma ORM
- PostgreSQL
- better-auth
- Zod validation

### AI and media
- Vercel AI SDK
- Google Gemini
- Uploadthing
- Vapi

### Data and UX
- TanStack React Query
- Type-safe API contracts and hooks
- responsive, polished UI for desktop and mobile

---

## Project Structure

```bash
studyFlow/
├── app/
│   ├── api/
│   │   ├── [[...reset]]/
│   │   ├── ai/
│   │   ├── auth/
│   │   ├── docs/
│   │   ├── openapi.json/
│   │   └── uploadthing/
│   ├── components/
│   ├── contract/
│   ├── dashboard/
│   ├── generated/
│   ├── lib/
│   ├── router/
│   ├── schemas/
│   ├── types/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/
├── lib/
├── prisma/
├── public/
├── docker-compose.yml
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── prisma.config.ts
├── tsconfig.json
├── README.md
└── .env.example
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- PostgreSQL database
- API credentials for:
  - Better Auth
  - Google Gemini
  - Uploadthing
  - Vapi

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env` file in the project root with the following structure:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/studyflow"
BETTER_AUTH_SECRET="your_secret_here"
BETTER_AUTH_URL="http://localhost:3000"

GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

UPLOADTHING_TOKEN="your_uploadthing_token"

GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"

NEXT_PUBLIC_VAPI_PUBLIC_KEY="your_vapi_public_key"
VAPI_PRIVATE_KEY="your_vapi_private_key"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database setup

```bash
npx prisma generate
npx prisma migrate dev
```

### Run the app

```bash
pnpm dev
```

Then open: http://localhost:3000

---

## API docs

Once the app is running, the OpenAPI and docs UI are available here:

- http://localhost:3000/api/docs
- http://localhost:3000/api/openapi.json

---

## V1 status

This project is in a solid v1 phase:
- the core product flows work end-to-end
- authentication and protected areas are in place
- study resource creation and discovery are functional
- AI features support practical learning workflows
- the app is structured for future expansion

This is a strong foundation for version 2 improvements like deeper discovery, richer community features, analytics, and more advanced learning personalization.

---

## Roadmap

### Planned next steps
- stronger search and filtering
- improved dashboard and user profile experience
- AI history and workspace organization
- more advanced post recommendation logic
- expanded community and social features
- additional learning analytics and progress tracking

---

## License

MIT
