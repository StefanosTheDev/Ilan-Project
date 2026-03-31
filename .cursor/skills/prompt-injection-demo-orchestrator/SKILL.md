---
name: prompt-injection-demo-orchestrator
description: >-
  Orchestrates building or extending the Prompt Injection Lab in a safe order with checkpoints.
  Use when scaffolding features, onboarding a new contributor, or running an end-to-end implementation pass across backend and frontend.
---

# Prompt Injection Lab — orchestrator

Use the domain skill [prompt-injection-demo](../prompt-injection-demo/SKILL.md) for file maps and vulnerability rules. This skill is only **order + verification**.

## Build sequence

1. **Infra & backend skeleton** — `docker-compose.yml`, `backend/app/main.py`, config, DB session, models, `Base.metadata.create_all`, CORS.
2. **Seed + TCK-104** — [backend/app/seed.py](backend/app/seed.py): confirm `TCK_104_BODY` still contains indirect instructions referencing tools (`list_employees`, `export_data`).
3. **Repositories + read APIs** — list/get routes for customers, employees, tickets, documents; verify with `/docs` or curl.
4. **Tool handlers + logging** — implement `run_tool` registry; persist each invocation via `invocation_log`; wire `POST /export` to log as `export_data`.
5. **Chat agent loop** — `chat_service.run_chat`: system prompt stays **weak**; tools match REST capabilities; cap agent steps; surface `session_id` to clients.
6. **Frontend plumbing** — shared `api.ts`, Vite `/api` proxy, **Activity log** first (proves logging), then **Data explorer**, then **Chat** + role toggle.
7. **Polish** — empty states, demo hints in UI, README warning banner; optional fonts/theme pass.

## Verification checklist

- [ ] Chat returns assistant text after multi-step tool use (watch server logs or UI “Tool activity”).
- [ ] **Direct:** User prompt can elicit internal fields or `export_data` without role enforcement.
- [ ] **Indirect:** Asking about `TCK-104` (after tool reads the ticket body) nudges leakage; activity log shows tool args/results.
- [ ] **Activity log** lists REST `export` and chat tools with full JSON payloads.
- [ ] **Role toggle** changes only the prompt string; behavior does not reliably change (demo of weak guardrails).

## When the user asks to “secure” the app

Stop following the vulnerable defaults. Confirm scope: production-hardening is a **different product goal** and will remove or gate the demo behaviors listed above.
