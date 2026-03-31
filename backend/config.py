"""Application settings – single source of truth, imported by main and dependencies."""

from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    openai_api_key: str = ""
    supabase_url: str = ""
    supabase_key: str = ""


@lru_cache
def get_settings() -> Settings:
    return Settings()
