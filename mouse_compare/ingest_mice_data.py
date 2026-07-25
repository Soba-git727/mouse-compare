#!/usr/bin/env python3
"""GearForge Mouse Data Ingestion Module"""
import json, os, time, logging
from pathlib import Path
from typing import Optional
import httpx
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

MICE_DIR = Path("./public/assets/mice")
MICE_DIR.mkdir(parents=True, exist_ok=True)

MOUSE_DB = [
    {"id": "razer-viper-v3-pro","name": "Viper V3 Pro","brand": "Razer",
     "dimensions": {"length_mm": 127.0,"width_mm": 63.9,"height_mm": 39.9},
     "weight_g": 54,"sensor": "Focus Pro 35K",
     "svg_path_top": "M60 20 Q100 10 140 20 L170 50 Q180 70 175 100 Q170 130 160 150 L140 175 Q100 190 60 175 L40 150 Q30 130 25 100 Q20 70 30 50 Z",
     "images": {"top_view": "/assets/mice/razer-viper-v3-pro-top.png"}},
    {"id": "logitech-gpx2","name": "G Pro X Superlight 2","brand": "Logitech",
     "dimensions": {"length_mm": 125.0,"width_mm": 63.6,"height_mm": 40.0},
     "weight_g": 60,"sensor": "HERO 2",
     "svg_path_top": "M55 25 Q100 15 145 25 L175 55 Q185 75 180 105 Q175 135 165 155 L140 178 Q100 195 60 178 L35 155 Q25 135 20 105 Q15 75 25 55 Z",
     "images": {"top_view": "/assets/mice/logitech-gpx2-top.png"}},
]

async def fetch_page(url: str) -> Optional[str]:
    headers = {"User-Agent": "GearForgeBot/1.0 (+https://gearforge.dev/bot)"}
    async with httpx.AsyncClient(timeout=15) as client:
        for attempt in range(3):
            try:
                resp = await client.get(url, headers=headers)
                if resp.status_code == 429:
                    wait = 2 ** attempt
                    logging.warning(f"Rate limited, waiting {wait}s...")
                    await asyncio.sleep(wait)
                    continue
                resp.raise_for_status()
                return resp.text
            except httpx.HTTPStatusError as e:
                logging.error(f"HTTP {e.response.status_code} for {url}")
                return None
            except Exception as e:
                logging.error(f"Error fetching {url}: {e}")
                return None

def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")

async def scrape_specs(url: str) -> Optional[dict]:
    html = await fetch_page(url)
    if not html:
        return None
    soup = BeautifulSoup(html, "html.parser")
    specs = {}
    for row in soup.select("table.specs tr, .product-specs li"):
        cells = row.find_all(["td", "th"])
        if len(cells) >= 2:
            key = cells[0].get_text(strip=True).lower()
            val = cells[1].get_text(strip=True)
            specs[key] = val
    return specs if specs else None

async def ingest_official_sources():
    logging.info("Ingesting from official data...")
    db_path = Path("mice_database.json")
    if db_path.exists():
        with open(db_path) as f:
            existing = json.load(f)
    else:
        existing = []
    existing_ids = {m["id"] for m in existing}
    new_entries = [m for m in MOUSE_DB if m["id"] not in existing_ids]
    combined = existing + new_entries
    with open(db_path, "w") as f:
        json.dump(combined, f, indent=2)
    logging.info(f"Total {len(combined)} mice in database ({len(new_entries)} new)")

async def ingest_web_sources():
    logging.info("Ingesting from web sources...")
    urls = [
        "https://www.razer.com/gaming-mice/viper-v3-pro",
        "https://www.logitechg.com/g-pro-x-superlight-2",
    ]
    for url in urls:
        specs = await scrape_specs(url)
        if specs:
            logging.info(f"Scraped {len(specs)} specs from {url}")
        await asyncio.sleep(3)

async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--source", choices=["official", "web", "all"], default="all")
    args = parser.parse_args()
    if args.dry_run:
        logging.info("DRY RUN - no data will be written")
    if args.source in ("official", "all"):
        await ingest_official_sources()
    if args.source in ("web", "all"):
        await ingest_web_sources()
    logging.info("Done")

if __name__ == "__main__":
    import asyncio, re
    asyncio.run(main())
