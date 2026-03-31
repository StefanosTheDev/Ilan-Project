"""Auth routes -- login, register, session check, logout."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel

from services.auth_service import AuthService
from dependencies import get_auth_service

router = APIRouter(prefix="/api/auth")


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str


class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str


@router.post("/register", response_model=UserResponse)
def register(body: RegisterRequest, service: AuthService = Depends(get_auth_service)):
    try:
        user = service.register(body.email, body.password, body.name)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    return user


@router.post("/login", response_model=UserResponse)
def login(body: LoginRequest, response: Response, service: AuthService = Depends(get_auth_service)):
    try:
        user, token = service.login(body.email, body.password)
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    response.set_cookie(
        key="session_token",
        value=token,
        httponly=False,
        secure=False,
        samesite="none",
        max_age=60 * 60 * 24 * 7,
        path="/",
    )
    return user


@router.get("/me", response_model=UserResponse)
def me(request: Request, service: AuthService = Depends(get_auth_service)):
    token = request.cookies.get("session_token")
    user = service.validate_session(token)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


@router.post("/logout")
def logout(request: Request, response: Response, service: AuthService = Depends(get_auth_service)):
    token = request.cookies.get("session_token")
    if token:
        service.logout(token)
    response.delete_cookie("session_token", path="/")
    return {"status": "ok"}
