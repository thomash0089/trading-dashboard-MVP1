import asyncio
from playwright.async_api import async_playwright
import pandas as pd

async def fetch_stock_data(ticker: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        url = f"https://finance.yahoo.com/quote/{ticker}"
        await page.goto(url)

        # Beispiel: Aktuellen Kurs auslesen
        price_selector = 'fin-streamer[data-field="regularMarketPrice"]'
        price_element = await page.wait_for_selector(price_selector)
        price = await price_element.inner_text()

        await browser.close()

        # Strukturierte Rückgabe
        return {"ticker": ticker, "price": price}
