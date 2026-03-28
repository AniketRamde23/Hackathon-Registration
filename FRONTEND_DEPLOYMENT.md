# Vercel Production Deployment Checklist

## Core Deployment Instructions

To successfully deploy the frontend apps on Vercel without Monorepo overlaps:
1. Navigate directly to `vercel.com` → **Add New** → **Project**.
2. Connect your Github Repository containing `HackFlow`.
3. In the explicit **Root Directory** field, overwrite `./` with tracking targets:
   - `apps/participant`
   - `apps/admin`
   - `apps/judge`
4. The deployment engine auto-detects **Next.js**. Do *not* override the build commands locally (this is handled gracefully by `vercel.json` config files mapped inside each NextJS app).

## Environment Keys Matrix

Bind these strict production variables identically into Vercel Project Settings for all three node targets:
```env
NEXT_PUBLIC_API_URL=https://hackflow-backend.railway.app
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="hackflow-prod.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_*********"  # WARNING: Requires Live Verification Scope!
```

## Custom Domains (Optional)
- Participant Application: `register.hackflow.com` (Target Hub / Auth)
- Admin Architecture: `admin.hackflow.com` (Control Plane)
- Judge Metrics: `judge.hackflow.com` (Execution Evaluation Bounds)

## Strict Production Verifications

- [ ] Ensure **Razorpay Webhooks/Signatures** strictly map against the `rzp_live_` endpoints, migrating strictly away from testing hashes.
- [ ] Add the newly mapped Vercel Domains into **Firebase Authorized Domains** explicitly preventing Authentication Blockers!
- [ ] Cross-check **SendGrid Sender Identity Domains**, ensuring physical inbox deliverability and preventing Spam classifications on Registration Confirmations.
- [ ] Explicitly map and physically test complete e2e QR code scanning arrays using WebRTC on Mobile hardware inside the `AdminScanner`.
- [ ] Expose Load-Testing benchmarks leveraging explicitly via `k6` or `artillery` targeting 500+ Concurrent Websocket interactions limit test thresholds securely.
- [ ] Establish explicit `Sentry / LogRocket` layers logging raw error stacks capturing unexpected rendering mutations inside Next.js components securely.
