"""Chat route -- thin controller that delegates to ChatService."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from services.chat_service import ChatService
from dependencies import get_chat_service

router = APIRouter(prefix="/api")


class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str


@router.post("/chat", response_model=ChatResponse)
def chat(body: ChatRequest, service: ChatService = Depends(get_chat_service)):
    session_id = service.ensure_session(body.session_id)
    reply = service.reply(session_id, body.message)
    return ChatResponse(session_id=session_id, reply=reply)


@router.get("/chat/sessions/{session_id}")
def get_session(session_id: str, service: ChatService = Depends(get_chat_service)):
    messages = service.get_session_messages(session_id)
    if messages is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"session_id": session_id, "messages": messages}
