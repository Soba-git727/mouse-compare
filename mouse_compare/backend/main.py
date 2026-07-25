from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json

app = FastAPI(title="GearForge API", version="1.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

DB_PATH = "../mice_database.json"

def load_db():
    try:
        with open(DB_PATH) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

class MouseBase(BaseModel):
    id: str; name: str; brand: str; weight_g: float
    sensor: str; dimensions: dict

@app.get("/api/mice")
def list_mice(search: str = ""):
    db = load_db()
    if search:
        q = search.lower()
        db = [m for m in db if q in m["name"].lower() or q in m["brand"].lower()]
    return db

@app.get("/api/mice/{mouse_id}")
def get_mouse(mouse_id: str):
    db = load_db()
    for m in db:
        if m["id"] == mouse_id:
            return m
    raise HTTPException(404, "Mouse not found")

@app.get("/api/compare")
def compare(ids: str):
    id_list = ids.split(",")[:4]
    db = load_db()
    result = [m for m in db if m["id"] in id_list]
    return result

@app.get("/api/recommend")
def recommend(length: float = 18, width: float = 10, grip: str = "claw"):
    db = load_db()
    scored = []
    for m in db:
        score = 50
        dims = m.get("dimensions", {})
        if dims.get("length_mm", 120) > length * 10 - 20 and dims.get("length_mm", 120) < length * 10 + 20:
            score += 25
        score += max(0, 25 - abs(m.get("weight_g", 65) - 60) * 0.5)
        scored.append({"mouse": m, "match": min(100, score)})
    scored.sort(key=lambda x: -x["match"])
    return scored[:8]

@app.post("/api/contribute")
def contribute(data: dict):
    return {"status": "submitted", "message": "Thank you for contributing!"}
