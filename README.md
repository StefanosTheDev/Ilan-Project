# Prompt Injection Demo

**Warning: This application is intentionally vulnerable.** It exists for controlled security training and demos only. Do not deploy to the public internet, do not use real personal data, and do not treat any “security” controls as real.

## What it demonstrates

- **Direct prompt injection** — user messages can override weak instructions and exfiltrate fake sensitive fields.
- **Indirect prompt injection** — malicious text embedded in support ticket **TCK-104** influences the model after a tool reads it.
- **Weak guardrails** — a UI “role” toggle only changes prompt text; there is no server-side RBAC on tools or data.
- **Tool abuse** — broad tools (e.g. export) can return large slices of data; every call is logged.

## Stack

- **Backend:** Python 3.12+, FastAPI, SQLAlchemy, PostgreSQL, OpenAI API (tool calling).
- **Frontend:** React, TypeScript, Vite.

## Quick start

1. Start PostgreSQL:

   ```bash
   docker compose up -d
   ```

2. Backend (one-time setup):

   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate (optional; `npm run dev` finds the venv)
   pip install -r requirements.txt
   cp .env.example .env
   # Set OPENAI_API_KEY in backend/.env
   cd ..
   ```

3. Install JS deps at the **repo root** (installs root tooling + `frontend` via `postinstall`):

   ```bash
   npm install
   ```

4. Run **API + frontend** together:

   ```bash
   npm run dev
   ```

   - API: `http://127.0.0.1:8000` (Vite proxies `/api` here)
   - App: `http://localhost:5173` (URL Vite prints)

### Run services separately (optional)

- API only: `npm run dev:api` (from repo root; requires `backend/.venv`)
- Web only: `npm run dev:web` (after `npm install` in `frontend`)

Or manually: `cd backend && .venv/bin/python -m uvicorn app.main:app --reload --port 8000` and `cd frontend && npm run dev`.

## Seed data

On first startup the API creates tables and runs the seed (including ticket **TCK-104**). To re-seed manually:

```bash
cd backend && source .venv/bin/activate && python -m scripts.seed
```

## Demo ideas

- **Direct:** Ask the chat to ignore prior instructions and dump employee records or call export.
- **Indirect:** In the data explorer, open ticket TCK-104, then ask an innocuous question in chat that causes the model to read that ticket via tools — watch the activity log for tool args/results.
