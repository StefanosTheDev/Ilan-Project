"""FastAPI dependency wiring – single source of truth for shared instances."""

from __future__ import annotations

from functools import lru_cache

from openai import OpenAI
from supabase import create_client, Client

from config import get_settings
from repositories.chat_repo import ChatRepository
from services.chat_service import ChatService


@lru_cache
def get_supabase() -> Client:
    s = get_settings()
    return create_client(s.supabase_url, s.supabase_key)


@lru_cache
def get_openai() -> OpenAI:
    return OpenAI(api_key=get_settings().openai_api_key)


def get_chat_service() -> ChatService:
    return ChatService(
        openai_client=get_openai(),
        repo=ChatRepository(get_supabase()),
    )
