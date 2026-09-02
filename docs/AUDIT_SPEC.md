# Next.js + REST API — Full Engineering Audit Specification

You are a **Senior Next.js Architect, Web Security Engineer, Performance Engineer, and Code Reviewer**.

Perform a **deep engineering audit** of this existing Next.js application.

The application uses **Next.js as the frontend/application layer and Medusa / Supabase / REST API as the backend/data source**.

Do NOT assume the existing architecture is correct. Your job is to inspect the actual codebase, identify architectural problems, security risks, performance issues, unnecessary complexity, and opportunities to use Next.js correctly.

---

## 1. First: Understand the Existing Architecture

Before suggesting changes, inspect the entire repository and create an architecture map.

Identify:
- Next.js version
- React version
- App Router vs Pages Router
- TypeScript/JavaScript
- Rendering strategy
- Server Components
- Client Components
- Server Actions
- Route Handlers
- Middleware
- Backend / REST API integration
- Authentication architecture
- Data-fetching architecture
- State-management architecture
- Caching strategy
- Image handling
- File/media handling
- Environment variables
- Deployment assumptions
- External services
- API abstraction layers
- Error handling
- Logging/monitoring

---

## 2. Next.js Architecture Audit
- Server vs Client Components boundaries
- Unnecessary `"use client"` directives
- Hydration costs & duplicated server/client logic

## 3. Backend / REST API Architecture
- Centralized API clients vs ad-hoc fetching
- Browser vs Server-side fetching
- Sensitive credentials exposure

## 4. Authentication & Authorization Security Audit
- Storage of JWT / tokens (localStorage vs HttpOnly cookies)
- Session handling, OAuth flows, and Supabase integration
- Server-side authorization checks vs client-side assumptions

## 5. API Security Audit
- Exposed endpoints, IDOR, input/output validation, rate limiting, CORS

## 6. Backend-Specific Security Audit
- Service keys, tokens, `.env` exposure, `NEXT_PUBLIC_*` variables

## 7. Caching Audit
- Fetch caching, ISR, `revalidate`, tags, dynamic data vs static data

## 8. Data Fetching Audit
- Waterfalls, duplicate requests, memoization, server components

## 9. State Management Audit
- Context, Redux/Zustand, URL state, Server state

## 10. Performance Audit
- Bundle size, hydration, image optimization (`next/image`), fonts

## 11. Security Headers
- CSP, HSTS, X-Frame-Options, CORS, Referrer-Policy

## 12. XSS / Injection Audit
- `dangerouslySetInnerHTML`, user-generated content, input sanitization

## 13. File & Media Security
- Media handling, upload endpoints, file validation

## 14. Error Handling
- Boundaries, 404/500, user-facing error leakage

## 15. Type Safety & Data Contracts
- TypeScript types, `any` usage, runtime validation (Zod)

## 16. Codebase Architecture
- Folder structure, separation of concerns, coupling

## 17. Environment & Deployment Audit
- Secrets, build-time vs runtime variables, CI/CD

## 18. Observability
- Logging, error tracking, metrics

## 19. Architecture Anti-Patterns
- Detection of 14 key anti-patterns

## 20. AI-Generated Code Audit
- Over-engineering, hallucinated patterns, cargo-cult Next.js APIs

## 21. Final Architecture Recommendation
- Target architecture blueprint

## 22. Prioritized Action Plan (P0, P1, P2, P3)

## 23. Audit Deliverables Structure
- Executive Summary with scores
- Architecture Diagram
- Critical Findings
- Domain-by-Domain Findings
- Quick Wins
- Recommended Target Architecture
- Prioritized Roadmap (Phase 1 to Phase 5)
- Final Verdict answering the 10 critical architectural questions
