import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")
    if not SQLALCHEMY_DATABASE_URI:
        raise ValueError("DATABASE_URI environment variable is required")

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    if not JWT_SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY environment variable is required")

    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", "3600"))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
