from fastapi import FastAPI
from app.api import router

app = FastAPI(title="Trading Dashboard Backend")

# API-Router einbinden
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Trading Dashboard Backend Online"}
