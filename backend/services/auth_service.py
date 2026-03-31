"""Authentication business logic -- login, register, session validation."""

from __future__ import annotations

import hashlib
import uuid

from repositories.user_repo import UserRepository


def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def _generate_session_token() -> str:
    return f"mcg_sess_{uuid.uuid4().hex}"


class AuthService:
    def __init__(self, repo: UserRepository) -> None:
        self._repo = repo

    def register(self, email: str, password: str, name: str, role: str = "user") -> dict:
        if self._repo.email_exists(email):
            raise ValueError("Email already registered")
        pw_hash = _hash_password(password)
        user = self._repo.create_user(email, pw_hash, name, role)
        return {"id": user["id"], "email": user["email"], "name": user["name"], "role": user["role"]}

    def login(self, email: str, password: str) -> tuple[dict, str]:
        """Returns (user_info, session_token) or raises ValueError."""
        user = self._repo.find_by_email(email)
        if not user:
            raise ValueError("Invalid credentials")
        if user["password_hash"] != _hash_password(password):
            raise ValueError("Invalid credentials")

        token = _generate_session_token()
        self._repo.create_session(token, user["id"])
        user_info = {
            "id": user["id"],
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
        }
        return user_info, token

    def validate_session(self, token: str | None) -> dict | None:
        """Returns user info if session is valid, None otherwise."""
        if not token:
            return None
        session = self._repo.find_session_by_token(token)
        if not session:
            return None
        user_data = session.get("users")
        if not user_data:
            return None
        return {
            "id": user_data["id"],
            "email": user_data["email"],
            "name": user_data["name"],
            "role": user_data["role"],
        }

    def logout(self, token: str) -> None:
        self._repo.delete_session(token)
