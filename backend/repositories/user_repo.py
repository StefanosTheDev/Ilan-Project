"""Data-access layer for users and user_sessions tables."""

from __future__ import annotations

from supabase import Client


class UserRepository:
    def __init__(self, db: Client) -> None:
        self._db = db

    def find_by_email(self, email: str) -> dict | None:
        result = (
            self._db.table("users")
            .select("*")
            .eq("email", email)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def find_by_id(self, user_id: str) -> dict | None:
        result = (
            self._db.table("users")
            .select("id, email, name, role, created_at")
            .eq("id", user_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def create_user(self, email: str, password_hash: str, name: str, role: str = "user") -> dict:
        result = (
            self._db.table("users")
            .insert({"email": email, "password_hash": password_hash, "name": name, "role": role})
            .execute()
        )
        return result.data[0]

    def create_session(self, token: str, user_id: str) -> dict:
        result = (
            self._db.table("user_sessions")
            .insert({"token": token, "user_id": user_id})
            .execute()
        )
        return result.data[0]

    def find_session_by_token(self, token: str) -> dict | None:
        result = (
            self._db.table("user_sessions")
            .select("*, users(id, email, name, role)")
            .eq("token", token)
            .limit(1)
            .execute()
        )
        if not result.data:
            return None
        session = result.data[0]
        return session

    def delete_session(self, token: str) -> None:
        self._db.table("user_sessions").delete().eq("token", token).execute()

    def email_exists(self, email: str) -> bool:
        result = (
            self._db.table("users")
            .select("id")
            .eq("email", email)
            .limit(1)
            .execute()
        )
        return len(result.data) > 0
