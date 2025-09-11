from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.scraper import fetch_stock_data

router = APIRouter()

@router.get("/stock/{ticker}")
async def get_stock_data(ticker: str):
    try:
        data = await fetch_stock_data(ticker)
        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
