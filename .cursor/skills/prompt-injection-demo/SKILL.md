---
name: prompt-injection-demo
description: >-
  Maintains the Prompt Injection Lab monorepo (FastAPI + React + PostgreSQL + OpenAI tools).
  Covers intentional vulnerabilities, fake seed data, ticket TCK-104, and demo-safe boundaries.
  Use when editing this repository, extending tools/routes/UI, or explaining how injections are implemented.
---

# Prompt Injection Lab (project skill)

## Non-negotiables

- **Fake data only.** Never add real integrations, real credentials, or production-style hardening unless the user explicitly pivots to a “secure variant.”
- **Vulnerabilities are intentional.** Do not add real RBAC, row-level security, or prompt firewalling unless asked. The educational goal is to show risk when LLMs control tools and data.
- **Preserve ticket `TCK-104`.** Its body carries the **indirect injection** payload. Changing the ticket id or removing the embedded instruction breaks the demo narrative.

## Where things live

| Concern | Location |
|--------|----------|
| API entry, CORS, startup + seed | [backend/app/main.py](backend/app/main.py) |
| Weak copilot instructions + OpenAI tool JSON | [backend/app/services/chat_service.py](backend/app/services/chat_service.py) |
| Tool implementations (no RBAC) | [backend/app/services/tool_handlers.py](backend/app/services/tool_handlers.py) |
| Persisted tool args/results | [backend/app/models/tool_log.py](backend/app/models/tool_log.py), [backend/app/repositories/tool_log.py](backend/app/repositories/tool_log.py) |
| Seed + **TCK-104** body | [backend/app/seed.py](backend/app/seed.py) |
| REST surface | [backend/app/api/routes/](backend/app/api/routes/) |
| Chat UI + role toggle | [frontend/src/features/chat/ChatPanel.tsx](frontend/src/features/chat/ChatPanel.tsx), [frontend/src/app/App.tsx](frontend/src/app/App.tsx) |
| Data explorer | [frontend/src/features/data-explorer/DataExplorerPanel.tsx](frontend/src/features/data-explorer/DataExplorerPanel.tsx) |
| Activity log | [frontend/src/features/activity-log/ActivityLogPanel.tsx](frontend/src/features/activity-log/ActivityLogPanel.tsx) |

## Scenario map

- **Direct injection:** User chat text overrides weak system guidance; model may call `list_employees`, `get_customer`, or `export_data` without server checks. See `chat_service._system_prompt` and tool descriptions (they overshare field names).
- **Indirect injection:** After `get_ticket` returns **TCK-104**, hidden text in `body` instructs the model to call tools and leak bundles. Payload is in [backend/app/seed.py](backend/app/seed.py) (`TCK_104_BODY`).
- **Weak guardrails:** UI **role** toggle only changes the `role` string sent to `POST /api/chat`; the backend does not enforce access per role.
- **Tool/API abuse:** `export_data` and broad list tools return large slices; `POST /api/export` also logs to `tool_invocations`.

## Runbook

1. `docker compose up -d` (Postgres).
2. Backend: `cd backend`, venv, `pip install -r requirements.txt`, copy `.env.example` → `.env`, set `OPENAI_API_KEY`, `uvicorn app.main:app --reload --port 8000`.
3. Frontend: `cd frontend`, `npm install`, `npm run dev` (proxies `/api` to port 8000).
4. Re-seed (optional): `cd backend && python scripts/seed.py` (no-op if customers already exist).

## Additional reference

For ERD-style notes and tool schema duplication, see [reference.md](reference.md) if present; otherwise infer from models and `chat_service._OPENAI_TOOL_DEFINITIONS`.
