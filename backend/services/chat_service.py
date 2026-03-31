"""Business logic for the AI chat – calls OpenAI and persists via the repository."""

from __future__ import annotations

from openai import OpenAI

from repositories.chat_repo import ChatRepository

SYSTEM_PROMPT = """\
You are Meridian AI, the virtual assistant for Meridian Capital Group – \
a privately held investment management firm headquartered in New York, \
founded in 2000. You help website visitors learn about the firm and its services.

Key facts you know:
- $12.4 B assets under management, 340+ institutional clients, 98% retention rate.
- Services: Wealth Management, Institutional Advisory, Global Equity Research, Alternative Investments.
- Leadership: Victoria Chen (CEO), James Harrington (CIO), Amara Osei (Head of Research), Daniel Reeves (Client Relations).
- Contact: info@meridiancap.com, +1 (212) 555-0140, New York, NY.

Guidelines:
- Be professional, warm, and concise.
- If the visitor asks to schedule a meeting, encourage them to use the contact form on the site or email info@meridiancap.com.
- Never give specific financial advice or make promises about returns.
- If you don't know something, say so honestly and suggest contacting the team.
"""

MAX_HISTORY = 20
MODEL = "gpt-4o-mini"


class ChatService:
    def __init__(self, openai_client: OpenAI, repo: ChatRepository) -> None:
        self._openai = openai_client
        self._repo = repo

    def ensure_session(self, session_id: str | None) -> str:
        if session_id and self._repo.session_exists(session_id):
            return session_id
        return self._repo.create_session()

    def _build_messages(self, session_id: str, user_message: str) -> list[dict]:
        history = self._repo.get_messages(session_id, limit=MAX_HISTORY)
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.extend(history)
        messages.append({"role": "user", "content": user_message})
        return messages

    def reply(self, session_id: str, user_message: str) -> str:
        """Get a complete assistant reply. Persists both messages."""
        self._repo.save_message(session_id, "user", user_message)
        self._repo.touch_session(session_id)

        messages = self._build_messages(session_id, user_message)

        completion = self._openai.chat.completions.create(
            model=MODEL,
            messages=messages,
        )

        reply_text = completion.choices[0].message.content or ""
        self._repo.save_message(session_id, "assistant", reply_text)
        return reply_text
