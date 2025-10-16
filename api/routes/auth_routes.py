import re
from flask import Blueprint, jsonify, request
from services.auth_service import AuthService
from utils.http_status import HttpStatus

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/register", methods=["POST"])
def register():
    body = request.get_json()

    required_fields = ["nome", "senha", "email", "login"]
    if not all(body.get(field, "").strip() for field in required_fields):
        return (
            jsonify({"message": "Missing required fields in request body"}),
            HttpStatus.BAD_REQUEST,
        )

    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, body["email"]):
        return (
            jsonify({"message": "Invalid email format"}),
            HttpStatus.BAD_REQUEST,
        )

    existing_user_login = AuthService.get_user_by_unique_field(
        "login", body["login"]
    )
    existing_user_email = AuthService.get_user_by_unique_field(
        "email", body["email"]
    )

    if existing_user_login or existing_user_email:
        return (
            jsonify({"message": "Login or email already in use"}),
            HttpStatus.CONFLICT,
        )

    user, token = AuthService.register_user(body)

    return (
        jsonify(
            {
                "message": "User registered successfully",
                "data": {
                    "user": user.to_safe_dict(),
                    "token": {"access_token": token, "token_type": "Bearer"},
                },
            }
        ),
        HttpStatus.CREATED,
    )
