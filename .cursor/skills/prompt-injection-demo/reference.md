# Reference — Prompt Injection Lab

## Tables (SQLAlchemy)

- `customers` — includes `internal_risk_notes` (fake “sensitive”).
- `employees` — includes `ssn_last4`, `salary_band`.
- `tickets` — `ticket_number` unique (e.g. `TCK-104`), `body` holds indirect injection text.
- `documents` — markdown-ish content for `search_documents`.
- `tool_invocations` — append-only log of tool name, JSON args, JSON result, optional `session_id`.

## REST (prefix `/api`)

- `POST /chat` — agent loop (OpenAI + tools).
- `GET /activity` — tool log.
- `GET /customers`, `GET /customers/{id}`
- `GET /employees`, `GET /employees/{id}`
- `GET /tickets`, `GET /tickets/by-number/{ticket_number}`
- `GET /documents`, `GET /documents/search?q=`
- `POST /export` — body `{ resource, format }`, logs like a tool call.

## OpenAI tools

Mirrored in `chat_service._OPENAI_TOOL_DEFINITIONS` and executed via `tool_handlers.run_tool`.
