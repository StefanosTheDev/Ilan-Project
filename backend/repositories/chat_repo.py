"""Data-access layer for chat_sessions and chat_messages tables."""

from __future__ import annotations

from supabase import Client


class ChatRepository:
    def __init__(self, db: Client) -> None:
        self._db = db

    def create_session(self) -> str:
        row = (
            self._db.table("chat_sessions")
            .insert({})
            .execute()
        )
        return row.data[0]["id"]

    def get_messages(self, session_id: str, limit: int = 20) -> list[dict]:
        result = (
            self._db.table("chat_messages")
            .select("role, content")
            .eq("session_id", session_id)
            .order("created_at", desc=False)
            .limit(limit)
            .execute()
        )
        return result.data

    def save_message(self, session_id: str, role: str, content: str) -> None:
        self._db.table("chat_messages").insert(
            {"session_id": session_id, "role": role, "content": content}
        ).execute()

    def touch_session(self, session_id: str) -> None:
        self._db.table("chat_sessions").update(
            {"updated_at": "now()"}
        ).eq("id", session_id).execute()

    def session_exists(self, session_id: str) -> bool:
        result = (
            self._db.table("chat_sessions")
            .select("id")
            .eq("id", session_id)
            .limit(1)
            .execute()
        )
        return len(result.data) > 0
