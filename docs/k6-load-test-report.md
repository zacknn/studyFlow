# Load Testing Report — StudyFlow

**Date:** 2026-09-14
**Tool:** [k6](https://k6.io) (open source, local execution)
**Target:** `http://localhost:3000` — Next.js 16.1.1 (Turbopack), production build (`pnpm build && pnpm start`)

---

## 1. Overview

This report documents the initial load-testing phase for StudyFlow using k6. The goal was to establish a baseline of how the application behaves under concurrent authenticated load, identify breaking points, and set up a reusable test harness.

## 2. Environment

| Component | Detail |
|---|---|
| App | Next.js 16.1.1, production build |
| Auth | Better Auth (session cookie: `better-auth.session_token`) |
| OS | Arch Linux (single machine: app + DB + load generator) |
| Load tool | k6, local CLI + `--out web-dashboard` |
| Database | Local dev database (test account only) |

> ⚠️ **Limitation:** all tests run on a single machine acting as app server, database, and load generator. Results below ~130–150 VUs are meaningful; saturation beyond that partly reflects local hardware limits, not only application limits.

## 3. Test Harness

- Location: `k6/test.js`
- Auth flow: login via `/api/auth/sign-in/email` in `setup()` (runs once), session cookie shared across all VUs; real `userId` resolved at runtime via `/api/auth/get-session`
- Pages exercised per iteration (all DB-backed, server-rendered):
  `/dashboard`, `/dashboard/browse-note`, `/dashboard/community`, discussion detail + edit, `/dashboard/create-post`, post detail + edit, profile
- **Load test account:** dedicated `loadtest@example.com` — no real user data is touched

## 4. Results

### 4.1 Homepage — dev vs production

| Metric | `npm run dev` | `pnpm build && pnpm start` |
|---|---|---|
| avg | 287 ms | **6.88 ms** |
| p95 | 792 ms | **9.95 ms** |
| max | 944 ms | 50 ms |
| failures | 0 / 79 req | 0 / 3,135 req |

Dev mode inflates response times ~40x. All load numbers below are production builds.

### 4.2 Authenticated pages — 50 VUs, staged ramp (2 min)

- **8,077 checks — 100% passed, zero request failures**
- avg 34 ms · med 20 ms · p95 103 ms
- ~111 req/s sustained
- App scales linearly to 50 VUs with no degradation

### 4.3 Stress test — 200 VUs, staged ramp (~6 min, web dashboard)

- 35k requests, peak **138.5 req/s**
- **Saturation observed:** request duration climbs continuously to p99 ≈ 7 s; `http_req_waiting` dominates → server-side queueing
- Throughput plateaus at ~138 req/s while VUs climb → practical local ceiling reached
- Failure rate flat at ~11% — see Known Issues

**Dashboard analysis:**
- Latency degradation begins at roughly 130–150 VUs (single-machine limits included)
- Failure rate is present from the start of the run, at all load levels

### 4.4 Smoke test — 1 VU, 1 iteration (current state)

10/11 checks green. Full authenticated journey (login → session → 9 pages) passes; the profile route fails deterministically.

## 5. Known Issues

| Issue | Status | Notes |
|---|---|---|
| `/dashboard/profile/[userId]` returns non-200 for the load-test account | 🔴 Open | Reproducible at 1 VU, so **not load-related** — an application bug. The test correctly resolves the user ID from the session (`/api/auth/get-session` passes), so the profile page itself mishandles this user. |
| Flat ~11% failure rate in the 200-VU run | 🔴 Open | Consistent with the profile bug failing once per iteration (~1 of 9–10 requests). Real failure rate under load is unknown until the profile bug is fixed — the 200-VU run must be repeated afterwards. |
| Single-machine test rig | 🟡 Accepted | App + DB + k6 on one host. Saturation numbers are lower-bound estimates; validate on separate infra before production claims. |
| AI endpoints (`/api/ai/*`, `/api/vapi/*`) | ⚪ Excluded | Call external paid APIs — excluded from load tests to avoid burning credits and hitting rate limits. |

## 6. Conclusions

- The app handles **50 concurrent authenticated users comfortably** (p95 ≈ 103 ms, zero errors).
- Saturation appears between **~130–200 VUs on local hardware**; the bottleneck is server-side processing (request waiting dominates), not networking.
- The k6 harness (`k6/test.js` + web dashboard) is reusable: `k6 run --out web-dashboard k6/test.js`.

## 7. Next Steps

- [ ] Fix `/dashboard/profile/[userId]` and re-run the 200-VU stress test to get the true failure rate
- [ ] Run with `htop` to separate hardware saturation from application saturation
- [ ] Profile the DB during saturation (`pg_stat_activity`) to check for connection-pool exhaustion / slow queries
- [ ] Add write-path tests (create discussion / post) — currently read-only
- [ ] 10–15 min soak test to catch memory leaks and connection leaks
- [ ] Deploy to a VPS (separate from load generator) and validate 500 users
