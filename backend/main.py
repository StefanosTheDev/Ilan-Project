import uuid

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from config import get_settings
from routes.chat import router as chat_router

app = FastAPI(title="Ilan Project API")

_settings = get_settings()
_origins = [o.strip() for o in _settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins or ["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InsecureSessionMiddleware(BaseHTTPMiddleware):
    """Sets an intentionally insecure session cookie for the XSS demo.
    NOT httponly -> JS can read it. NOT secure -> works over HTTP.
    samesite=none -> sent cross-site. This is the vulnerability."""

    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        if "session_token" not in request.cookies:
            token = f"mcg_sess_{uuid.uuid4().hex}"
            response.set_cookie(
                key="session_token",
                value=token,
                httponly=False,
                secure=False,
                samesite="none",
                max_age=60 * 60 * 24 * 7,
                path="/",
            )
        return response


app.add_middleware(InsecureSessionMiddleware)

app.include_router(chat_router)


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "ilan-project", "docs": "/docs"}


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
