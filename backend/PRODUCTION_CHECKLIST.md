# HackFlow Database & API Production Guidelines

## 1. Railway Deployment Sequence (Recommended)
1. Navigate directly to **Railway.app** -> *New Project* -> *Deploy from GitHub repo*.
2. Explicitly select the `/backend` folder. Configure Root Directory to `"backend"`.
3. Railway dynamically auto-resolves identical `node:18` architecture mapping.
4. Execute `Add Variable` for all vectors located inside `.env` configurations natively tracking against Railway's Dashboard.
5. Setup `PORT = 5000` (Railway securely executes `$PORT` injections under the hood mapping against this binding).
6. Target internal health checks towards HTTP bounds `GET /health`.

## 2. Render Deployment Sequence (Alternative Target)
1. Initialize New **Web Service** -> *Connect Repo*.
2. **Build Array Command**: `cd backend && npm ci && npm run build`
3. **Execution Execution**: `cd backend && npm start`
4. Deploy Environment keys.

## 3. Strict Production Environments Matrix
```env
FRONTEND_URL=https://hackflow-participant.vercel.app
ADMIN_URL=https://hackflow-admin.vercel.app
JUDGE_URL=https://hackflow-judge.vercel.app
NODE_ENV=production
```
*CRITICAL:* Explicitly overwrite any underlying CORS policy origins towards these strict domains across your MongoDB configurations and Razorpay specific Webhook APIs mappings.

## 4. MongoDB Atlas M0 Topology Settings
1. Boot *MongoDB Atlas Control Plane*.
2. Initialize standalone `M0 Cluster`.
3. Ensure Network IP bounds permit Railway/Render IPs (`0.0.0.0/0` strictly tracking credentials layers).
4. Inject string limit mapped strictly towards parameter `MONGODB_URI`.
