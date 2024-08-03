# Use an official Python runtime as a parent image
FROM python:3.12.0-slim-bookworm

# Environment variables to prevent .pyc files and ensure logs are flushed
ENV PYTHONUNBUFFERED=1
ENV PYTHONWRITEBYTECODE=1

# Define the working directory
ENV APP_DIR=/app
WORKDIR $APP_DIR

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt $APP_DIR/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . $APP_DIR

# Expose the port on which the app will run
EXPOSE 8000

# Ensure the entrypoint script is executable
RUN chmod +x /app/entrypoint.sh

# Define the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]

# Default command to run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "djangoproj.wsgi"]
