# Use Python 3.13 slim image
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN pip install uv

RUN pip install gunicorn

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync

# Copy application code
COPY . .

EXPOSE 5000

# Force Flask to bind externally when running main.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

# Start the application
CMD ["uv", "run", "main.py"]
