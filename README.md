# MERN Typing Speed Checker

Features:
1. Light/Dark mode UI (persists to localStorage)
2. Start button to begin timer (60s)
3. Stop button to end timer (or on timeout)
4. Change Paragraph button to fetch a new paragraph

## Quick Start
### Server
```bash
cd server
npm install
cp .env.sample .env
# (optionally set MONGODB_URI if you want Mongo; otherwise local JSON is used)
npm run dev
```

### Client
```bash
cd client
npm install
npm run dev
```

Open the client on http://localhost:5173. The client proxies API calls to http://localhost:5000.

### Optional: Seed Mongo
```bash
cd server
npm run seed
```
