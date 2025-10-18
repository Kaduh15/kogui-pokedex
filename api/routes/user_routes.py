from flask import Blueprint, jsonify, request

from services.user_service import UserService
from utils.auth_decorators import auth_required
from utils.http_status import HttpStatus
from utils.hash import hash_password

user_routes = Blueprint("user_routes", __name__)


@user_routes.route("/user/reset-password", methods=["POST"])
@auth_required
def reset_password(current_user):
    data = request.get_json()
    new_password = data.get("new_password")

    if not new_password:
        return (
            jsonify({"error": "New password is required"}),
            HttpStatus.BAD_REQUEST,
        )

    user_service = UserService()
    new_hashed_password = hash_password(new_password)
    result = user_service.reset_password(current_user.id, new_hashed_password)

    if result:
        return jsonify({"message": "Password reset successful"}), HttpStatus.OK
    else:
        return (
            jsonify({"error": "Password reset failed"}),
            HttpStatus.INTERNAL_SERVER_ERROR,
        )
