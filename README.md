# StudyFlow

A full-stack study resource sharing platform where students can share notes, tutorials, and references — with AI-powered tools to help them learn.

---

## What it does

Students can create posts with files and links attached, share them publicly or privately, and use AI tools to summarize documents, generate quizzes, and chat with an AI tutor. A voice teacher feature powered by Vapi lets students have real tutoring sessions about their documents.

---

## Tech Stack

### Frontend
- **Next.js 16** — App Router, Server + Client Components
- **Tailwind CSS** — styling
- **Lucide React** — icons
- **next-themes** — dark/light mode

### Backend
- **oRPC** — end-to-end type-safe API with OpenAPI docs
- **Prisma** — ORM with PostgreSQL
- **better-auth** — authentication (email/password + GitHub OAuth)
- **Zod** — schema validation

### File Storage
- **Uploadthing** — file uploads (PDFs, images, documents)

### AI
- **Vercel AI SDK** — streaming AI responses
- **Google Gemini 2.0 Flash** — text chat, document summary, quiz generation
- **Vapi** — voice AI teacher (real-time voice conversations)

### Data Fetching
- **TanStack React Query** — client-side data fetching and caching
- **oRPC React Query** — type-safe query/mutation hooks

---

## Features

### Posts
- Create posts with title, description, type (tutorial/reference), tags
- Attach multiple files (PDFs, images, documents)
- Attach multiple links with labels
- Public or private visibility
- Like and view counters

### Authentication
- Email and password signup/login
- GitHub OAuth
- Session-based auth via better-auth

### AI Tools (per post)
- **Summary** — AI reads the attached PDF and generates a structured summary
- **Quiz** — AI generates multiple choice questions from the document
- **Chat** — conversational AI that knows about the post content

### AI Tutor (standalone)
- General purpose AI study assistant
- Works without any post — students can ask anything
- Full conversation history saved per user

### Voice Teacher (Vapi)
- Real-time voice call with an AI teacher
- Teacher is briefed on the document content before the call
- Natural conversation, handles interruptions
- Feels like a real tutoring session

---

## Project Structure

```
studyFlow/
├── app/
│   ├── api/
│   │   ├── [[...rest]]/        # oRPC main handler
│   │   ├── openapi.json/       # OpenAPI spec
│   │   ├── docs/               # Scalar UI docs
│   │   ├── uploadthing/        # File upload handler
│   │   └── ai/
│   │       ├── chat/           # AI chat route
│   │       ├── summary/        # Document summary route
│   │       └── quiz/           # Quiz generation route
│   ├── components/             # Shared UI components
│   ├── contract/               # oRPC contracts
│   ├── dashboard/
│   │   ├── browse-note/        # Public posts list
│   │   ├── create-post/        # Create new post
│   │   ├── post/[id]/          # Post detail + AI tools
│   │   │   └── edit/           # Edit post
│   │   └── ai/                 # AI tutor page
│   ├── generated/              # Prisma generated client
│   ├── lib/
│   │   ├── auth-client.ts      # better-auth client
│   │   ├── auth.ts             # better-auth config
│   │   ├── base.ts             # oRPC base with errors
│   │   ├── orpc.ts             # oRPC React Query client
│   │   ├── prisma.ts           # Prisma client
│   │   ├── uploadthing.ts      # Uploadthing helpers
│   │   ├── hooks/
│   │   │   └── use-ai-chat.ts  # AI chat hook
│   │   └── queries/
│   │       └── post.queries.ts # React Query hooks
│   ├── login/                  # Login page
│   ├── middleware/             # Auth middleware
│   ├── private/                # Protected route example
│   ├── router/                 # oRPC handlers
│   ├── schemas/                # Zod schemas
│   ├── signup/                 # Signup page
│   ├── types/                  # Shared TypeScript types
│   ├── layout.tsx
│   ├── page.tsx                # Landing page
│   └── providers.tsx           # React Query + theme providers
├── components/                 # shadcn/ui components
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── prisma.config.ts        # Prisma config
│   └── migrations/
├── public/                     # Static assets
├── context.ts                  # oRPC context (headers)
├── docker-compose.yml          # Local PostgreSQL
├── next.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- pnpm

### Installation

```bash
# clone the repo
git clone https://github.com/zacknn/studyflow.git
cd studyflow

# install dependencies
pnpm install

# set up environment variables
cp .env.example .env
```

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/studyflow"

# Better Auth
BETTER_AUTH_SECRET="your_secret_here"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Uploadthing
UPLOADTHING_TOKEN="your_uploadthing_token"

# Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"

# Vapi (Voice AI)
NEXT_PUBLIC_VAPI_PUBLIC_KEY="your_vapi_public_key"
VAPI_PRIVATE_KEY="your_vapi_private_key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Setup

```bash
# run migrations
npx prisma migrate dev

# generate prisma client
npx prisma generate
```

### Run the app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## API Documentation

Once running, visit [http://localhost:3000/api/docs](http://localhost:3000/api/docs) for the full interactive API documentation powered by Scalar UI.

### Available endpoints

```
Posts
├── POST   /posts              Create a post
├── GET    /posts              List posts (paginated)
├── GET    /posts/{id}         Get a post
├── PATCH  /posts/{id}         Update a post
├── DELETE /posts/{id}         Delete a post
├── POST   /posts/{id}/like    Like a post
└── POST   /posts/{id}/view    Increment views

Files
├── POST   /posts/{id}/files   Attach a file
└── DELETE /files/{id}         Delete a file

Links
├── POST   /posts/{id}/links   Attach a link
├── PUT    /links/{id}         Update a link
└── DELETE /links/{id}         Delete a link
```

---

## Database Schema

```
User          — auth + profile
Session       — better-auth sessions
Account       — OAuth accounts
Post          — study posts
File          — files attached to posts
Link          — links attached to posts
AIHistory     — AI chat sessions
AIMessage     — individual messages in a chat session
```

---

## Roadmap

- [ ] Dashboard page (user's own posts)
- [ ] Post detail page with AI tools
- [ ] Vapi voice teacher integration
- [ ] AI history page (past conversations)
- [ ] Search and filtering improvements
- [ ] Pagination on browse page
- [ ] User profile page
- [ ] Email verification

---

## License

MIT
