# StudyFlow: Development Journey Documentation

## Project Overview

StudyFlow is a study assistant application that evolved through multiple iterations, stack changes, and continuous refinement. This document chronicles the complete development journey from initial concept to v1 release.

---

## Phase 1: Initial Attempt & Stack Selection

### First Stack Decision

The project began with selecting the initial technology stack:

| Component | Technology |
|-----------|------------|
| Framework | Next.js |
| Authentication | NextAuth |
| ORM | Prisma |
| Database | PostgreSQL |
| Styling | Tailwind CSS |
| AI Integration | Vapi |

### Building the Foundation

Development started with creating a landing page using Vercel AI, attempting to replicate the provided design. Progress was smooth until implementing NextAuth authentication, which proved to be a significant blocker. Despite extensive troubleshooting through documentation and AI assistance, the authentication system never functioned properly.

> **Note:** This was before modern AI coding agents existed, making debugging significantly more challenging.

**Outcome:** The project was abandoned due to authentication issues.

---

## Phase 2: Fresh Start (January)

### New Beginnings

The repository was deleted and work began anew with a revised approach:

- **Authentication:** Switched to Better Auth
- **Landing Page:** Built quickly using Google Gemini
- **Database:** PostgreSQL running in a Docker container
- **Schema:** Prisma schema designed and implemented

### Authentication Success

Better Auth proved to be a dramatic improvement:

- ✅ Worked immediately following documentation
- ✅ OAuth implementation was straightforward
- ✅ Prisma integration was seamless
- ✅ Significantly easier than NextAuth experience

---

## Phase 3: Core Development (February)

### UI Development

Built the authentication pages (login/signup) using shadcn/ui components exclusively. This period established the dual-component folder structure:

- **Custom components:** Built from scratch
- **Library components:** Downloaded and integrated

### Browse Notes Feature

Developed the browse notes page with focus on quality. Key discovery was the `useDebounce` hook, which dramatically improved search functionality when implemented.

### API Architecture Overhaul

Discovered the importance of API security and documentation through educational content. This led to adopting **oRPC** — an end-to-end type-safe API solution.

**Implementation details:**
- Built with Claude (LLM) assistance — first time using this tool
- Two weeks of development to achieve full functionality
- Complete with documentation and test coverage

---

## Phase 4: Feature Expansion (March)

### Database Evolution

Extended the database schema with:
- Files table
- Links table

### File Upload Integration

Adopted **UploadThing** for file handling, maintaining the principle of using only free or trial-available technologies. Integration was straightforward and successful.

### AI Assistant Development

Built the initial AI assistant featuring:
- Quiz generation
- Summary creation
- Endpoint integration
- OpenAPI documentation

**Technology choice:** Gemini as the LLM provider

**Assessment:** Slow performance and limited quality, but sufficient for v1 release.

---

## Phase 5: Polish & Completion (Late March – April)

### UI Refinements

- Profile page implementation
- Community page with full endpoint and query support
- Bug fixes throughout the application
- Chatbot UI improvements

---

## Phase 6: Final Polish (Summer)

### UI Enhancement

Used Kimi 3 (AI) for comprehensive UI improvements and aesthetic refinements.

### Feature Completion

- **Forgot Password:** Implemented using Resend for email delivery
- **Vapi Integration:** Added voice capabilities to the application

### Quality Assurance

- **TestSprite:** Implemented for application testing
- **MCP Servers:** First exploration and successful implementation
- **Code Quality:** Resolved nearly all linting issues
- **Build Stability:** Fixed all build-related problems

### Documentation

Updated the README file comprehensively, marking the completion of StudyFlow v1.

---

## Technology Stack Summary

| Category | Initial | Final |
|----------|---------|-------|
| Framework | Next.js | Next.js |
| Authentication | NextAuth ❌ | Better Auth ✅ |
| ORM | Prisma | Prisma |
| Database | PostgreSQL | PostgreSQL (Docker) |
| Styling | Tailwind CSS | Tailwind CSS + shadcn/ui |
| API Layer | — | oRPC |
| File Upload | — | UploadThing |
| Email Service | — | Resend |
| AI/LLM | Vapi | Gemini |
| Voice AI | Vapi | Vapi |
| Testing | — | TestSprite |

---

## Key Learnings

1. **Authentication libraries matter:** NextAuth vs Better Auth demonstrated how tooling choices can make or break a project.

2. **Type safety is valuable:** oRPC provided end-to-end type safety that improved development experience.

3. **Free-tier technologies work:** UploadThing, Resend, and similar tools offer viable solutions for indie projects.

4. **Iterative improvement:** Each phase built upon previous lessons, gradually improving quality.

5. **AI assistance evolves:** From no AI agents to Claude, Gemini, and Kimi 3 — leveraging AI tools accelerated development.

---

## Timeline Overview

```
Phase 1: Initial attempt          → Abandoned (auth issues)
Phase 2: January                   → Fresh start, Better Auth
Phase 3: February                  → Core features, oRPC
Phase 4: March                     → AI assistant, UploadThing
Phase 5: Late March – April        → UI polish, community features
Phase 6: Summer                    → Forgot password (Resend), Vapi,
                                     final polish, v1 complete
```

---

*Documentation compiled for StudyFlow v1 release.*