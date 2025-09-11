# Nutze ein schlankes aktuelles Python-Image
FROM python:3.11-slim

# Arbeitsverzeichnis im Container
WORKDIR /app

# Systemabhängigkeiten für Playwright und Chromium installieren
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gnupg \
    wget \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libgbm1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxrandr2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libcups2 \
    libx11-xcb1 \
    libxfixes3 \
    libxkbcommon0 \
    libglu1-mesa \
 && rm -rf /var/lib/apt/lists/*

# Pip auf neueste Version aktualisieren
RUN python3 -m pip install --upgrade pip

# Abhängigkeiten kopieren und installieren
COPY requirements.txt ./
RUN python3 -m pip install --no-cache-dir -r requirements.txt

# Playwright Browser und Abhängigkeiten installieren
RUN python3 -m playwright install --with-deps

# Quellcode kopieren
COPY ./app ./app

# Port freigeben
EXPOSE 8000

# Kommando zum Starten des FastAPI-Servers mit Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
