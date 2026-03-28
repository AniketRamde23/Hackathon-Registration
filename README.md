# 🚀 HackFlow Ecosystem

Welcome to **HackFlow**, a production-grade internal Hackathon event platform engineered to handle extreme scale, rigid security bounds, and real-time interactive evaluations natively.

## 🏗️ Architecture Stack
HackFlow operates over a strict physical **Monorepo** (powered by Turborepo) wrapping 3 independent `Next.js 14` Frontends mapping seamlessly onto a specifically hardened `Node.js 18 / Express` backend layer.

* **Database:** MongoDB (mongoose models, cascade deletion protections)
* **API:** RESTful Express bindings leveraging Sentry APM tracking
* **WebSockets:** Socket.io (Broadcasting Database Aggregations securely)
* **Authentication:** Firebase OAuth2 SSO paired with strict explicit HttpOnly JWT Cookies safely stripping Replay attacks.
* **Payments:** Razorpay native cryptographic checkout validations + API webhooks
* **Asset Storage:** Cloudinary CDN (Automated dynamic QR code ticket mapping limits)
* **Communications:** Twilio + SendGrid OTP SMS verification injections natively hooking the architecture.

## 📦 Project Directory Breakdown
- `apps/participant/` - Public facing Registration portals, responsive multi-step Wizards, Payment loops, and dynamic QR boarding-pass Dashboards.
- `apps/admin/` - Superuser layout mapping live Recharts Analytics, dynamic WebRTC physical QR hardware scanners, and comprehensive User Database metrics.
- `apps/judge/` - Isolated portal allowing manual web-slider evaluations mapping complex numeric targets straight back onto native Real-Time WebSockets powering Live Leaderboards locally across the entire infrastructure!
- `backend/` - The unified API processing engine evaluating strictly encoded API schemas.
- `packages/shared/` - Internal NPM arrays locking exact TS interfaces explicitly targeting robust parameter definitions.

---

## 💻 Local Development Pipeline Execute

### Prerequisites Setup
- Node.js `v18+`
- A native MongoDB instance `mongodb://127.0.0.1:27017/hackflow-dev` or specific Mongo Atlas URIs securely bound.
- Firebase Account configured natively containing generic Firebase Application keys.
- Basic Razorpay Test keys.

### Orchestration Commands
1. Install complete Workspace dependency chains natively wrapping the monorepo bounds:
   ```bash
   npm install
   ```
2. Navigate to the `backend/` root, rename `.env.example` -> `.env` and fill all explicit keys properly. Mirror the equivalent variable keys inside `apps/participant/.env.local`.
3. Ignite the Turborepo compilation environment side-by-side using the universal root execute command natively firing Node instances seamlessly:
   ```bash
   npm run dev
   ```

**Live Targets Check:**
- 🔴 Execution API Layer: `http://localhost:5000`
- 🟢 Participant Frontend: `http://localhost:3000`
- 🔵 Admin Console: `http://localhost:3001`
- 🟠 Judge Terminal: `http://localhost:3002`

---

## 🔒 Security Specifications Validated
1. **Network Mitigation**: Express API routes are strictly locked via `helmet` and `express-rate-limit` frameworks preventing active brute force dictionary injections (statically capped at `10 req/hr` over Auth paths).
2. **Payload Protection**: `express-mongo-sanitize` prevents Mongo object logic breaks completely isolating standard NoSQL injections dynamically while `xss-clean` protects internal parsing targets intercepting raw Script injection loops!
3. **Session Immunity**: JWT payloads operate solely mapped into explicit native `HttpOnly` Secure objects completely rendering XSS payload abstractions harmless locally alongside the DOM tracking boundaries.

---

## ☁️ Deployment Environment
The backend API compiles through standard **Railway Node** (`Dockerfile` specifically bundled locally inside `backend/`). The three independent Next.js architectures perfectly load against standard **Vercel** deployments referencing unique physical `vercel.json` routing configurations securely resolving API calls dynamically!
