FROM mcr.microsoft.com/playwright:focal

# Arbeitsverzeichnis im Container
WORKDIR /app

# Abhängigkeiten kopieren & installieren
COPY requirements.txt ./
RUN python3 -m pip install --no-cache-dir -r requirements.txt

# Playwright Browser-Installation (wichtig)
RUN playwright install

# Applikationscode kopieren
COPY ./app ./app

# Port freigeben (optional, aber empfohlen)
EXPOSE 8000

# FastAPI Server starten
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]


