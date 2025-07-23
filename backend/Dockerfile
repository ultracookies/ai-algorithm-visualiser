FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python3", "-m", "uvicorn", "app:app", "--host=0.0.0.0", "--port=8000", "--reload"]