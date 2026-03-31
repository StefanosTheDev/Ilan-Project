# Webhook Receiver & Request Inspector

Build a lightweight FastAPI application that logs all incoming HTTP requests and displays them on a live dashboard. This is a developer tool for debugging webhooks and HTTP integrations.

---

## Stack

- Python, FastAPI, single `main.py` file
- In-memory list to store entries (no database)
- `requirements.txt` with `fastapi` and `uvicorn[standard]`

## Endpoints

### `GET /log`

Accepts any query parameters. For each request, store an entry with:
- All query parameters as a dict
- Requester IP (use `X-Forwarded-For` header if present, otherwise `request.client.host`)
- `User-Agent` header value
- `Referer` header value
- UTC timestamp in ISO format

Response: return a 1x1 transparent PNG image (`Content-Type: image/png`). Use these bytes for the pixel:

```python
PIXEL = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01"
    b"\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89"
    b"\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01"
    b"\r\n\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
)
```

### `POST /log`

Accepts a JSON body. Store the same entry fields as `GET /log` plus the parsed JSON body. Return `{"status": "ok"}`.

### `GET /admin`

Render an HTML page with a table of all stored entries, newest first. Columns: Timestamp, IP, Params/Body summary, User-Agent, Referer, Raw Data (JSON). Dark theme (dark background, light text, monospace font for data). Auto-refresh the page every 5 seconds using a meta tag.

### `GET /health`

Return `{"status": "ok"}`.

## Middleware

Add CORS middleware allowing all origins:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Deployment

Railway. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## Test Commands

```bash
curl "https://YOUR_URL/log?key1=value1&key2=value2"
curl -X POST "https://YOUR_URL/log" -H "Content-Type: application/json" -d '{"key": "value"}'
open "https://YOUR_URL/admin"
```
